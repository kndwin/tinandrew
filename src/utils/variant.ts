import type { ComponentProps, ElementType, ReactElement, Ref } from "react";
import { createElement, forwardRef } from "react";
import { createTailwindMerge, getDefaultConfig } from "tailwind-merge";

/**
 * text-* also sets line-height so the below removes that
 * https://github.com/dcastil/tailwind-merge/issues/59#issuecomment-976400644
 *
 */
const twMerge = createTailwindMerge(getDefaultConfig, (config) => ({
  ...config,
  conflictingClassGroups: {
    ...config.conflictingClassGroups,
    "font-size":
      config.conflictingClassGroups["font-size"]?.filter(
        (id) => id !== "leading"
      ) || [],
  },
}));

/**
 * Allows classes to be both an array / string and typed safe as className
 */
export type ClassValue = ComponentProps<"div">["className"] | ClassValue[];
/**
 * Definition of the available variants and their options.
 * @example
 * {
 *   color: {
 *     white: "bg-white"
 *     green: "bg-green-500",
 *   },
 *   size: {
 *     small: "text-xs",
 *     large: "text-lg"
 *   }
 * }
 */
export type Variants = Record<string, Record<string, ClassValue>>;

/**
 * Configuration including defaults and compound variants.
 */
export interface VariantsConfig<V extends Variants> {
  variants: V;
  compoundVariants?: CompoundVariant<V>[];
  defaultVariants?: Partial<OptionsOf<V>>;
}

/**
 * Rules for class names that are applied for certain variant combinations.
 */
export type CompoundVariant<V extends Variants> = {
  className: ClassValue;
} & Partial<OptionsOfMany<V>>;

/**
 * Only the boolean variants, i.e. ones that have "true" or "false" as options.
 */
type BooleanVariants<V extends Variants> = {
  [K in keyof V as V[K] extends { true: boolean } | { false: boolean }
    ? K
    : never]: V[K];
};

/**
 * Only the variants for which a default options is set.
 */
type DefaultVariants<
  C extends VariantsConfig<V>,
  V extends Variants = C["variants"]
> = {
  [K in keyof V as K extends keyof C["defaultVariants"]
    ? K
    : never]: C["variants"][K];
};

/**
 * Names of all optional variants, i.e. booleans or ones with default options.
 */
type OptionalVariantNames<
  C extends VariantsConfig<V>,
  V extends Variants = C["variants"]
> = keyof BooleanVariants<V> | keyof DefaultVariants<C>;

/**
 * Possible options for all the optional variants.
 *
 * @example
 * {
 *   color?: "white" | "green",
 *   rounded?: boolean | undefined
 * }
 */
type OptionalOptions<
  C extends VariantsConfig<V>,
  V extends Variants = C["variants"]
> = {
  [K in keyof V as K extends OptionalVariantNames<C>
    ? K
    : never]?: OptionsOf<V>[K];
};

/**
 * Possible options for all required variants.
 *
 * @example {
 *   size: "small" | "large"
 * }
 */
type RequiredOptions<
  C extends VariantsConfig<V>,
  V extends Variants = C["variants"]
> = {
  [K in keyof V as K extends OptionalVariantNames<C>
    ? never
    : K]: OptionsOf<V>[K];
};

/**
 * Utility type to extract the possible options.
 * Converts "true" | "false" options into booleans.
 *
 * @example
 * OptionsOf<{
 *   size: { small: "text-xs"; large: "text-lg" };
 *   rounded: { true: "rounded-full" }
 * }>
 * ==>
 * {
 *   size: "small" | "large";
 *   rounded: boolean;
 * }
 */
type OptionsOf<V extends Variants> = {
  [K in keyof V]: keyof V[K] extends "true" | "false" ? boolean : keyof V[K];
};

type OptionsOfMany<V extends Variants> = {
  [K in keyof V]: keyof V[K] extends "true" | "false"
    ? boolean
    :
        | keyof V[K]
        | Array<keyof V[K]>
        | { or: keyof V[K] | Array<keyof V[K]> }
        | { not: keyof V[K] | Array<keyof V[K]> };
};

/**
 * Extracts the possible options.
 */
export type VariantOptions<
  C extends VariantsConfig<V>,
  V extends Variants = C["variants"]
> = RequiredOptions<C> & OptionalOptions<C>;

/**
 * Without this conversion step, defaultVariants and compoundVariants will
 * allow extra keys, i.e. non-existent variants.
 * See https://github.com/sindresorhus/type-fest/blob/main/source/simplify.d.ts
 */
export type Simplify<T> = {
  [K in keyof T]: T[K];
};

export function variants<
  C extends VariantsConfig<V>,
  V extends Variants = C["variants"]
>(base: ClassValue, config: Simplify<C>) {
  if (!config?.variants) {
    return () => twMerge(base);
  }

  const { variants, compoundVariants, defaultVariants } = config;

  const isBooleanVariant = (name: keyof V) => {
    const v = variants?.[name];
    // @ts-expect-error: allow it
    return v && ("false" in v || "true" in v);
  };

  return (props: VariantOptions<C>) => {
    const result = [twMerge(base)];

    const getSelected = (variant: keyof V) => {
      const selectedFromProp = props?.[variant] as string;
      const selectedFromDefault = defaultVariants?.[variant] as string;
      const selectedFromBoolean = isBooleanVariant(variant) ? false : undefined;
      return selectedFromProp ?? selectedFromDefault ?? selectedFromBoolean;
    };

    for (const variant in variants) {
      const selectedVariant = getSelected(variant);
      if (selectedVariant) {
        const selectedVariantClass = variants[variant]?.[selectedVariant];
        result.push(twMerge(selectedVariantClass));
      }
    }

    for (const { className, ...variants } of compoundVariants ?? []) {
      const isSelected = (variant: string) => {
        const value = variants[variant];
        if (Array.isArray(value)) {
          return value.includes(getSelected(variant));
        } else if (typeof value === "object") {
          if (value?.["or"]) {
            // @ts-expect-error: allow it
            return value.or.includes(getSelected(variant));
          } else if (value?.["not"]) {
            // @ts-expect-error: allow it
            return !value.not.includes(getSelected(variant));
          }
        } else if (Boolean(value)) {
          return getSelected(variant) === variants[variant];
        }
      };

      if (Object.keys(variants).every(isSelected)) {
        result.push(twMerge(className));
      }
    }
    const resultString = result.filter(Boolean).join(" ");
    return twMerge(resultString);
  };
}

/**
 * Utility type to infer the first argument of a variantProps function.
 */
export type VariantPropsOf<T> = T extends (props: infer P) => unknown
  ? P
  : never;

/**
 * Type for the variantProps() argument – consists of the VariantOptions and an optional className for chaining.
 */
type VariantProps<
  C extends VariantsConfig<V>,
  V extends Variants = C["variants"]
> = VariantOptions<C> & { className?: ClassValue };

export function variantProps<
  T extends ElementType,
  C extends VariantsConfig<V>,
  V extends Variants = C["variants"]
>(base: ClassValue, config: Simplify<C>) {
  const variantClassName = variants<C>(base, config);

  return <P extends VariantProps<C>>(props: P) => {
    const result: Record<string, unknown> = {};

    // Pass-through all unrelated props
    for (const prop in props) {
      result[prop] = props[prop];
    }

    // Add the optionally passed className prop for chaining
    result.className = twMerge(variantClassName(props), props.className);

    return result as { className: ClassValue } & Omit<P, keyof C["variants"]>;
  };
}

type VariantsOf<T, V> = T extends VariantsConfig<any>
  ? V
  : Record<string, never>;

type AsProps<T extends ElementType = ElementType> = {
  as?: T;
};

type PolymorphicComponentProps<T extends ElementType> = AsProps<T> &
  Omit<ComponentProps<T>, "as">;

export function styled<
  T extends ElementType,
  C extends VariantsConfig<V>,
  V extends Variants = VariantsOf<C, C["variants"]>
>(type: T, base: ClassValue, config?: Simplify<C>) {
  const styledProps =
    typeof config === undefined
      ? variantProps(base, { variants: {} })
      : variantProps(base, config as Simplify<C>);

  const Component: <As extends ElementType = T>(
    props: PolymorphicComponentProps<As> & VariantOptions<C>
  ) => ReactElement | null = forwardRef(function Element(
    { as, ...props }: AsProps,
    ref: Ref<Element>
  ) {
    return createElement(as ?? type, { ...styledProps(props), ref });
  });

  return Component;
}
