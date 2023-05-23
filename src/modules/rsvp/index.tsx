import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { match } from "ts-pattern";
import ReactConfetti from "react-confetti";

import { api } from "~/utils/api";
import { useViewportSize } from "~/hooks";
import { StyledLabel, Card } from "~/ui";
import { useRouter } from "next/router";

const rsvpFormSchema = z.object({
  attending: z.enum(["Maybe", "No", "Yes"]),
  plusOne: z.enum(["No", "Yes"]),
  allergies: z.string(),
  qna: z.string(),
});

export const createRSVPSchema = rsvpFormSchema.extend({
  person: z.string().nonempty(),
});

type FormSchema = z.infer<typeof createRSVPSchema>;

export const FormRSVP = () => {
  const router = useRouter();
  const [confetti, setConfetti] = useState(false);
  const methods = useForm<FormSchema>({
    resolver: zodResolver(rsvpFormSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const createRSVPMutation = api.rsvp.createRSVP.useMutation();

  const onSubmit = handleSubmit((data) => {
    createRSVPMutation.mutate(
      { ...data, person: router.query?.person as string },
      {
        onSuccess: () => {
          setConfetti(true);
        },
      }
    );
  });

  const { width, height } = useViewportSize();

  return (
    <FormProvider {...methods}>
      <form className="flex w-full max-w-md flex-col gap-8" onSubmit={onSubmit}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <StyledLabel>Attending the ceremony</StyledLabel>
            <select
              {...register("attending")}
              defaultValue={"Yes"}
              className="w-fit appearance-none rounded border border-gray-300 px-2 py-1"
            >
              <option value="Yes">{`Yes, I'll be there`}</option>
              <option value="No">No</option>
            </select>
            {errors.attending && (
              <Card type="error" message={errors.attending.message} />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <StyledLabel>Bring a +1</StyledLabel>
            <select
              {...register("plusOne")}
              defaultValue={"Yes"}
              className="w-fit appearance-none rounded border border-gray-300 px-2 py-1"
            >
              <option value="Yes">{`I'll be bringing one`}</option>
              <option value="No">No</option>
            </select>
            {errors.attending && (
              <Card type="error" message={errors?.plusOne?.message} />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <StyledLabel>Allergies/Dietary Requirements</StyledLabel>
            <textarea
              {...register("allergies")}
              className="rounded border border-gray-300 px-2 py-1"
              defaultValue={"N/A"}
            />
            {errors.allergies && (
              <Card type="error" message={errors.allergies.message} />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <StyledLabel>Questions/Comments</StyledLabel>
            <textarea
              {...register("qna")}
              className="rounded border border-gray-300 px-2 py-1"
              defaultValue={"N/A"}
            />
            {errors.allergies && (
              <Card type="error" message={errors?.qna?.message} />
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={!createRSVPMutation.isIdle}
          className="mx-auto w-fit rounded bg-black px-4 py-2 text-white"
        >
          {match(createRSVPMutation.status)
            .with("loading", () => "Submitting")
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
        recycle={false}
        run={confetti}
        width={width}
        height={height}
      />
    </FormProvider>
  );
};
