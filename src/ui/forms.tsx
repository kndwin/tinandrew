import { type HTMLProps, useState } from "react";
import { type FieldError, useFormContext } from "react-hook-form";
import { styled } from "~/utils/variant";
import { Text } from "./text";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export type FormFieldProps = {
  label: string;
  name: string;
  error?: FieldError;
  inputProps?: HTMLProps<HTMLInputElement>;
};

export const FormTextField = (props: FormFieldProps) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <StyledLabel htmlFor={props.name}>{props.label}</StyledLabel>
      <StyledInput id={props.name} {...props.inputProps} />
      {props?.error && <Card type="error" message={props?.error?.message} />}
    </div>
  );
};

export const FormPasswordField = (props: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  return (
    <div className="flex w-full flex-col gap-2">
      <StyledLabel htmlFor={props.name}>{props.label}</StyledLabel>
      <div className="flex w-full gap-2">
        <StyledInput
          className="flex-1"
          type={showPassword ? "text" : "password"}
          id={props.name}
          {...props.inputProps}
        />
        <button type="button" onClick={handleShowPassword}>
          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
      {props?.error && <Card type="error" message={props?.error?.message} />}
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

export const StyledLabel = styled(Text, "text-brown");

export const StyledInput = ({
  id,
  ...props
}: HTMLProps<HTMLInputElement> & { id: string }) => {
  const { register } = useFormContext();
  return (
    <input
      {...register(id)}
      {...props}
      className="w-full rounded border border-brown py-1 px-2"
    />
  );
};
