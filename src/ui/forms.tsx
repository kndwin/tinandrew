import { type HTMLProps } from "react";
import { type FieldError, useFormContext } from "react-hook-form";
import { styled } from "~/utils/variant";

type FormFieldProps = {
  label: string;
  name: string;
  error?: FieldError;
  inputProps?: HTMLProps<HTMLInputElement>;
};

export const FormTextField = ({
  label,
  name,
  error,
  inputProps,
}: FormFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <StyledInput id={name} {...inputProps} />
      {error && <Card type="error" message={error.message} />}
    </div>
  );
};

type CardProps = {
  message?: string;
  type: "success" | "error";
};

export const Card = ({ message, type }: CardProps) => {
  return (
    <StyledCardContainer color={type}>
      <StyledCardText color={type}>{message}</StyledCardText>
    </StyledCardContainer>
  );
};

const StyledCardContainer = styled("div", "rounded p-4", {
  variants: {
    color: {
      success: "bg-green-200",
      error: "bg-red-200",
    },
  },
  defaultVariants: {
    color: "success",
  },
});
const StyledCardText = styled("p", "text-sm", {
  variants: {
    color: {
      success: "text-green-900",
      error: "text-red-900",
    },
  },
  defaultVariants: {
    color: "success",
  },
});

export const StyledLabel = styled("label", "text-sm font-bold");

export const StyledInput = ({
  id,
  ...props
}: HTMLProps<HTMLInputElement> & { id: string }) => {
  const { register } = useFormContext();
  return (
    <input
      {...register(id)}
      {...props}
      className="rounded border border-gray-300 py-1 px-2"
    />
  );
};
