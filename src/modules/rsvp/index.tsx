import { useState, type SVGProps } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { match } from "ts-pattern";
import ReactConfetti from "react-confetti";
import { tv } from "tailwind-variants";

import { api } from "~/utils/api";
import { useViewportSize } from "~/hooks";
import { Card } from "~/ui";
import { useRouter } from "next/router";
import { Dialog, DialogContent, DialogTrigger } from "~/ui";
import { button } from "~/ui/button";
import { useQueryClient } from "@tanstack/react-query";

const rsvpFormSchema = z.object({
  attending: z.enum(["No", "Yes"]),
  plusOne: z.enum(["No", "Yes"]),
  allergies: z.string(),
  qna: z.string(),
});

export const createRSVPSchema = rsvpFormSchema.extend({
  person: z.string().nonempty(),
});

type FormSchema = z.infer<typeof createRSVPSchema>;

const formButton = tv({
  base: ["px-2 py-1 text-xs rounded-sm border"],
  variants: {
    selected: {
      true: "border-dark text-dark",
      false: "bg-white text-muted",
    },
  },
});

type FormRSVPProps = {
  trigger?: React.ReactNode;
};
export const FormRSVP = ({
  trigger = <button className={button()}>RSVP Here</button>,
}: FormRSVPProps) => {
  const client = useQueryClient();
  const router = useRouter();
  const [confetti, setConfetti] = useState(false);
  const [open, setOpen] = useState(false);
  const methods = useForm<FormSchema>({
    resolver: zodResolver(rsvpFormSchema),
    defaultValues: {
      attending: "Yes",
      plusOne: "No",
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const createRSVPMutation = api.rsvp.createRSVP.useMutation();

  const onSubmit = handleSubmit(async (data) => {
    createRSVPMutation.mutate(
      { ...data, person: router.query?.person as string },
      {
        onSuccess: () => {
          client.invalidateQueries(["getPerson"]);
          setConfetti(true);
        },
      }
    );
  });

  const { width, height } = useViewportSize();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <FormProvider {...methods}>
          <form
            className="flex w-full max-w-md flex-col gap-8"
            onSubmit={onSubmit}
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <p className="font-karla text-brown">
                  {"Will you be attending the ceremony?"}
                </p>
                <div className="flex h-8 flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => methods.setValue("attending", "Yes")}
                    className={formButton({
                      selected: methods.watch("attending") === "Yes",
                    })}
                  >
                    {`Yes, I'll be there`}
                  </button>
                  <button
                    type="button"
                    onClick={() => methods.setValue("attending", "No")}
                    className={formButton({
                      selected: methods.watch("attending") === "No",
                    })}
                  >
                    {`No, I won't be there`}
                  </button>
                </div>
                {errors.attending && (
                  <Card type="error" message={errors.attending.message} />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-karla text-brown">
                  {`Will you be bringing a +1 to the ceremony?`}
                </p>
                <div className="flex h-8 h-full flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => methods.setValue("plusOne", "Yes")}
                    className={formButton({
                      selected: methods.watch("plusOne") === "Yes",
                    })}
                  >
                    {`Yes, I’ll be bringing a +1`}
                  </button>
                  <button
                    type="button"
                    onClick={() => methods.setValue("plusOne", "No")}
                    className={formButton({
                      selected: methods.watch("plusOne") === "No",
                    })}
                  >
                    {`No, I won’t be bringing anyone`}
                  </button>
                </div>
                {errors.attending && (
                  <Card type="error" message={errors?.plusOne?.message} />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-karla text-brown">
                  {"Allergies/Dietary Requirements"}
                </p>

                <textarea
                  {...register("allergies")}
                  className="rounded border border-muted px-2 py-1 text-sm text-dark"
                  defaultValue={""}
                />
                {errors.allergies && (
                  <Card type="error" message={errors.allergies.message} />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-karla text-brown">
                  {"Questions/Comments/Wisdom/Favourite Joke"}
                </p>
                <textarea
                  {...register("qna")}
                  className="rounded border border-muted px-2 py-1 text-sm text-dark"
                  defaultValue={""}
                />
                {errors.allergies && (
                  <Card type="error" message={errors?.qna?.message} />
                )}
              </div>
            </div>
            <button
              type="submit"
              disabled={
                createRSVPMutation.isLoading || createRSVPMutation.isSuccess
              }
              className={
                "flex h-8 items-center justify-center rounded bg-brown py-2 text-xs text-white"
              }
            >
              {match(createRSVPMutation.status)
                .with("loading", () => <Loader className="animate-spin" />)
                .with("success", () => "Done!")
                .otherwise(() => "RSVP")}
            </button>
            {createRSVPMutation.isSuccess && (
              <Card type="success" message={"🎉 Yay! You've been added"} />
            )}
            {createRSVPMutation.isError && (
              <Card type="error" message={"😭 something went wrong!"} />
            )}
          </form>
          <ReactConfetti
            className="fixed top-0 left-0"
            recycle={false}
            run={confetti}
            width={width}
            height={height}
          />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

const Loader = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    {...props}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);
