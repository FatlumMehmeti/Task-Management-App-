import type { JSX } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useRouter } from "@tanstack/react-router";
import * as yup from "yup";
import "./Auth.css";
import FormInput from "../../components/Form/Input";
import Button from "../../components/Button";
import { toast } from "sonner";

type LoginFormValues = {
  email: string;
  password: string;
  remember: boolean;
};

// Local yup resolver (no @hookform/resolvers dependency)
const yupResolverLocal =
  (schema: yup.ObjectSchema<any>) => async (values: unknown) => {
    try {
      const data = await schema.validate(values, { abortEarly: false });
      return { values: data, errors: {} } as any;
    } catch (err) {
      const vErr = err as yup.ValidationError;
      const fieldErrors: Record<string, { type: string; message: string }> = {};
      if (Array.isArray(vErr.inner) && vErr.inner.length) {
        for (const ie of vErr.inner) {
          if (ie.path && !fieldErrors[ie.path]) {
            fieldErrors[ie.path] = {
              type: ie.type || "validation",
              message: ie.message,
            };
          }
        }
      } else if (vErr.path) {
        fieldErrors[vErr.path] = {
          type: vErr.type || "validation",
          message: vErr.message,
        };
      }
      return { values: {}, errors: fieldErrors } as any;
    }
  };

export default function Login(): JSX.Element {
  const router = useRouter();
  const schema = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    remember: yup.boolean().optional(),
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: { email: "", password: "", remember: false },
    mode: "onTouched",
    resolver: yupResolverLocal(schema),
  });

  const onSubmit = async (value: LoginFormValues) => {
    try {
      localStorage.setItem(
        "auth",
        JSON.stringify({ email: value.email, remember: value.remember })
      );
      toast.success("Login successful");
      router.navigate({ to: "/dashboard" });
    } catch {
      toast.error("Failed to persist session");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-visual" />
      <div className="auth-panel">
        <div className="auth-card">
          <h1 className="auth-title">Login</h1>
          <p className="auth-subtitle">
            Welcome back! Please login to your account.
          </p>
          <button className="auth-button" type="button">
            <span role="img" aria-label="google">
              🟦
            </span>{" "}
            Sign in with Google
          </button>
          <div className="auth-sep">OR</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              id="email"
              label="Email"
              type="email"
              placeholder="an@gmail.com"
              control={control}
              name="email"
            />
            <FormInput
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              control={control}
              name="password"
            />
            <div className="auth-row">
              <label className="auth-remember">
                <Controller
                  name="remember"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      checked={Boolean(field.value)}
                      onChange={(e) => field.onChange(e.target.checked)}
                      onBlur={field.onBlur}
                      ref={field.ref}
                    />
                  )}
                />{" "}
                Remember Me
              </label>
              <Link to="/auth/login" className="auth-link">
                Forgot Password?
              </Link>
            </div>
            <Button className="auth-cta" type="submit" disabled={isSubmitting}>
              Login
            </Button>
          </form>
          <div className="auth-footer">
            Don't have an account?{" "}
            <Link to="/auth/signup" className="auth-link">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
