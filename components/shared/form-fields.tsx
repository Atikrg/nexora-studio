"use client";

import { useId, type ComponentProps, type ReactNode } from "react";
import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form";
import { Field, FieldDescription, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type BaseProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  description?: ReactNode;
  required?: boolean;
  className?: string;
  /** Classes for the input/textarea element itself (className styles the wrapper). */
  inputClassName?: string;
  /** Bumps on each failed submit to replay the shake animation on invalid fields. */
  shakeKey?: number;
};

const labelClass =
  "pointer-events-none absolute top-3.5 left-4 origin-left text-base text-muted-foreground transition-[transform,color] duration-(--duration-base) ease-out-expo " +
  "peer-focus:-translate-y-2.5 peer-focus:scale-75 peer-focus:text-signal " +
  "peer-[:not(:placeholder-shown)]:-translate-y-2.5 peer-[:not(:placeholder-shown)]:scale-75 " +
  "peer-aria-invalid:text-destructive";

/**
 * Floating-label text input wired to React Hook Form.
 * Accessible by construction: a real <label for>, the label never disappears (it shrinks above
 * the value), aria-invalid, and description + error linked with aria-describedby.
 */
export function TextField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  required,
  className,
  inputClassName,
  shakeKey,
  ...inputProps
}: BaseProps<T> & Omit<ComponentProps<typeof Input>, "name" | "defaultValue">) {
  const uid = useId();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const id = `${uid}-${name}`;
        const describedBy = [
          description ? `${id}-desc` : null,
          fieldState.error ? `${id}-error` : null,
        ]
          .filter(Boolean)
          .join(" ");
        return (
          <Field data-invalid={fieldState.invalid || undefined} className={className}>
            <div
              key={fieldState.invalid ? shakeKey : undefined}
              className={cn("relative", fieldState.invalid && "animate-shake")}
            >
              <Input
                {...inputProps}
                {...field}
                value={field.value ?? ""}
                id={id}
                placeholder=" "
                aria-invalid={fieldState.invalid || undefined}
                aria-required={required || undefined}
                aria-describedby={describedBy || undefined}
                className={cn("peer h-14 pt-5 pb-1", inputClassName)}
              />
              <label htmlFor={id} className={labelClass}>
                {label}
                {required && (
                  <span aria-hidden="true" className="text-signal">
                    {" "}
                    *
                  </span>
                )}
              </label>
            </div>
            {description && <FieldDescription id={`${id}-desc`}>{description}</FieldDescription>}
            <FieldError id={`${id}-error`} errors={[fieldState.error]} />
          </Field>
        );
      }}
    />
  );
}

/** Floating-label textarea wired to React Hook Form. */
export function TextAreaField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  required,
  className,
  inputClassName,
  shakeKey,
  ...textareaProps
}: BaseProps<T> & Omit<ComponentProps<typeof Textarea>, "name" | "defaultValue">) {
  const uid = useId();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const id = `${uid}-${name}`;
        const describedBy = [
          description ? `${id}-desc` : null,
          fieldState.error ? `${id}-error` : null,
        ]
          .filter(Boolean)
          .join(" ");
        return (
          <Field data-invalid={fieldState.invalid || undefined} className={className}>
            <div
              key={fieldState.invalid ? shakeKey : undefined}
              className={cn("relative", fieldState.invalid && "animate-shake")}
            >
              <Textarea
                {...textareaProps}
                {...field}
                value={field.value ?? ""}
                id={id}
                placeholder=" "
                aria-invalid={fieldState.invalid || undefined}
                aria-required={required || undefined}
                aria-describedby={describedBy || undefined}
                className={cn("peer pt-7", inputClassName)}
              />
              <label htmlFor={id} className={cn(labelClass, "top-4")}>
                {label}
                {required && (
                  <span aria-hidden="true" className="text-signal">
                    {" "}
                    *
                  </span>
                )}
              </label>
            </div>
            {description && <FieldDescription id={`${id}-desc`}>{description}</FieldDescription>}
            <FieldError id={`${id}-error`} errors={[fieldState.error]} />
          </Field>
        );
      }}
    />
  );
}
