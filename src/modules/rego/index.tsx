import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { match } from "ts-pattern";
import Image from "next/image";
import { AlertCircleIcon, Loader2 } from "lucide-react";

import { api } from "~/utils/api";
import { FormTextField, FormPasswordField, Text } from "~/ui";
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
    setError,
  } = methods;

  const validateRegoMutation = api.rego.validateRego.useMutation({});
  const [networkError, setNetworkError] = useState("");
  useEffect(() => {
    if (validateRegoMutation.status === "loading") {
      setNetworkError("");
    }
  }, [validateRegoMutation.status]);

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
      onError: (error) => {
        if (error?.data?.code === "UNAUTHORIZED") {
          if (error?.shape?.message === "Invalid password") {
            console.log("Setting error for invalid password");
            setError("password", {
              message: "Invalid password",
            });
          }
          if (error?.shape?.message === "Invalid person") {
            console.log("Setting error for invalid person");
            setError("firstName", {
              message: "Case sensitive, please double check your first name",
            });
            setError("lastName", {
              message: "Case sensitive, please double check your last name",
            });
            setNetworkError(
              "Couldn't find you in the system, if you're sure of the spelling, please contact Andrew or Tina for help (andrewtinaxing@gmail.com)"
            );
          }
        }
      },
    });
  });

  return (
    <FormProvider {...methods}>
      <form
        className="relative z-50 mx-4 flex w-full max-w-xl flex-col gap-8 rounded bg-white px-4 py-12 shadow-lg sm:px-16"
        onSubmit={onSubmit}
      >
        <Image
          className="absolute left-1/2 top-4 -translate-x-1/2"
          src="/hero-kittens.png"
          alt="Cat"
          height={70}
          width={175}
        />
        <div className="mt-8 mb-4 flex flex-col items-center text-center">
          <Text size="display" className="text-[60px] sm:text-[96px]">
            Andrew + tina
          </Text>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-1 flex-col gap-4 sm:flex-row">
            <FormTextField
              label="First Name"
              name="firstName"
              error={errors.firstName}
            />
            <FormTextField
              label="Last Name"
              name="lastName"
              error={errors.lastName}
            />
          </div>
          <FormPasswordField
            label="Site Password"
            name="password"
            error={errors.password}
          />
          <FormTextField label="Email" name="email" error={errors.email} />
        </div>
        {validateRegoMutation.data?.valid === "invalid" && (
          <div className="flex flex-col gap-4">
            <p className="text-red-500">Invalid</p>
          </div>
        )}
        <button
          type="submit"
          disabled={
            validateRegoMutation.isLoading || validateRegoMutation.isSuccess
          }
          className="mx-auto flex w-full items-center rounded bg-brown px-4 py-2 font-karla text-white"
        >
          {match(validateRegoMutation.status)
            .with("loading", () => <Loader2 className="animate-spin" />)
            .with("success", () => "Done! Hang tight while we redirect you")
            .otherwise(() => "Log in")}
        </button>
        {networkError.length > 0 && (
          <div className="flex justify-start gap-3 rounded bg-red-200 p-4 text-red-900">
            <AlertCircleIcon className="h-6 w-6" />
            <p className="w-full">{networkError}</p>
          </div>
        )}
      </form>
    </FormProvider>
  );
};
