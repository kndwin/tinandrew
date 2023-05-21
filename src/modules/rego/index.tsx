import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { match } from "ts-pattern";

import { api } from "~/utils/api";
import { FormTextField } from "~/ui";
import { useRouter } from "next/router";

export const validateRegoSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

type FormSchema = z.infer<typeof validateRegoSchema>;

export const RegoForm = () => {
  const router = useRouter();
  const methods = useForm<FormSchema>({
    resolver: zodResolver(validateRegoSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const validateRegoMutation = api.rego.validateRego.useMutation({});

  const onSubmit = handleSubmit((data) => {
    validateRegoMutation.mutate(data, {
      onSuccess: (data) => {
        if (data.valid !== "invalid") {
          router.push({
            pathname: "/schedule",
            query: {
              person: data.person,
            },
          });
        }
      },
    });
  });

  return (
    <FormProvider {...methods}>
      <form
        className="flex h-[20em] w-full max-w-md flex-col gap-8"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-4">
          <FormTextField
            label="First Name"
            name="firstName"
            error={errors.firstName}
          />
          <FormTextField
            label="Last Name"
            name="lastName"
            error={errors.firstName}
          />
          <FormTextField label="Email" name="email" error={errors.email} />
          <FormTextField
            label="Password"
            name="password"
            inputProps={{
              type: "password",
            }}
            error={errors.firstName}
          />
        </div>
        {validateRegoMutation.data?.valid === "invalid" && (
          <div className="flex flex-col gap-4">
            <p className="text-red-500">Invalid</p>
          </div>
        )}
        <button
          type="submit"
          disabled={!validateRegoMutation.isIdle}
          className="mx-auto w-fit rounded bg-black px-4 py-2 text-white"
        >
          {match(validateRegoMutation.status)
            .with("loading", () => "Submitting")
            .with("success", () => "Done!")
            .otherwise(() => "RSVP")}
        </button>
      </form>
    </FormProvider>
  );
};
