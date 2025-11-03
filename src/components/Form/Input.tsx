import type { JSX } from "react";
import { Controller } from "react-hook-form";
import type {
  Control,
  FieldValues,
  UseFormRegisterReturn,
} from "react-hook-form";

type MinimalField<TValue extends string = string> = {
  state: { value: TValue; meta: { errors?: (string | undefined)[] } };
  handleChange: (updater: string) => void;
  handleBlur: () => void;
};

type FormInputProps<
  TValue extends string = string,
  TFieldValues extends FieldValues = FieldValues,
> = {
  field?: MinimalField<TValue>;
  register?: UseFormRegisterReturn;
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  control?: Control<TFieldValues>;
  name?: string;
};

export default function FormInput<
  TValue extends string = string,
  TFieldValues extends FieldValues = FieldValues,
>({
  field,
  register,
  id,
  label,
  type = "text",
  placeholder,
  className,
  required,
  control,
  name,
}: FormInputProps<TValue, TFieldValues>): JSX.Element {
  const state = field?.state;
  const handleChange = field?.handleChange;
  const handleBlur = field?.handleBlur;

  return (
    <div
      className={className ?? "auth-field"}
      style={{ display: "block", width: "100%", marginBottom: 16 }}
    >
      <label
        className="auth-label"
        htmlFor={id}
        style={{ display: "block", marginBottom: 6, fontWeight: 500 }}
      >
        {label}
        {required ? (
          <span aria-hidden="true" style={{ color: "#ef4444" }}>
            {" "}
            *
          </span>
        ) : null}
      </label>
      {control && name ? (
        <Controller
          name={name as any}
          control={control as any}
          render={({ field: rhfField, fieldState }) => (
            <>
              <input
                id={id}
                type={type}
                placeholder={placeholder}
                aria-invalid={fieldState.invalid || undefined}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #e5e7eb",
                  borderRadius: 6,
                  outline: "none",
                  transition: "box-shadow .15s, border-color .15s",
                  borderColor: fieldState.invalid ? "#ef4444" : undefined,
                  boxShadow: fieldState.invalid
                    ? "0 0 0 2px rgba(239,68,68,0.1)"
                    : undefined,
                }}
                {...rhfField}
              />
              {fieldState.error?.message ? (
                <div
                  style={{
                    display: "block",
                    color: "#ef4444",
                    marginTop: 6,
                    fontSize: 12,
                    lineHeight: 1.2,
                  }}
                >
                  {fieldState.error.message}
                </div>
              ) : null}
            </>
          )}
        />
      ) : (
        <>
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            aria-invalid={state?.meta.errors?.length ? true : undefined}
            style={{
              display: "block",
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #e5e7eb",
              borderRadius: 6,
              outline: "none",
              transition: "box-shadow .15s, border-color .15s",
              borderColor: state?.meta.errors?.length ? "#ef4444" : undefined,
              boxShadow: state?.meta.errors?.length
                ? "0 0 0 2px rgba(239,68,68,0.1)"
                : undefined,
            }}
            {...(register
              ? { ...register }
              : {
                  value: state?.value as string,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange && handleChange(e.target.value),
                  onBlur: handleBlur,
                })}
          />
        </>
      )}
      {!control && !name && state?.meta.errors?.length ? (
        <div
          style={{
            display: "block",
            color: "#ef4444",
            marginTop: 6,
            fontSize: 12,
            lineHeight: 1.2,
          }}
        >
          {state.meta.errors[0]}
        </div>
      ) : null}
    </div>
  );
}

<style> </style>;
