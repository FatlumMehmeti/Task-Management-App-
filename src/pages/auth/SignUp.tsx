import type { JSX } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolverLocal } from "../../lib/yupResolver";
import { Link, useRouter } from "@tanstack/react-router";
import FormInput from "../../components/Form/Input";
import Button from "../../components/Button";
import "./Auth.css";
import { toast } from "sonner";

type SignUpFormValues = {
  name: string;
  email: string;
  password: string;
};

// using a small local resolver util to avoid extra dependency

export default function SignUp(): JSX.Element {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<SignUpFormValues>({
    defaultValues: { name: "", email: "", password: "" },
    resolver: yupResolverLocal(
      yup.object({
        name: yup.string().required("Name is required"),
        email: yup
          .string()
          .email("Invalid email address")
          .required("Email is required"),
        password: yup
          .string()
          .min(6, "Min 6 characters")
          .required("Password is required"),
      })
    ),
  });

  const onSubmit = async (values: SignUpFormValues) => {
    try {
      localStorage.setItem(
        "auth",
        JSON.stringify({ email: values.email, name: values.name })
      );
      toast.success("Account created");
      router.navigate({ to: "/dashboard" });
    } catch {
      toast.error("Failed to create account");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-visual" />
      <div className="auth-panel">
        <div className="auth-card">
          <h1 className="auth-title">Create account</h1>
          <p className="auth-subtitle">Join us to start managing your tasks.</p>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              id="name"
              label="Name"
              type="text"
              required
              placeholder="Jane Doe"
              control={control}
              name="name"
            />
            <FormInput
              id="email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              required
              control={control}
              name="email"
            />
            <FormInput
              id="password"
              label="Password"
              type="password"
              placeholder="Create a password"
              required
              control={control}
              name="password"
            />
            <div style={{ marginTop: 40, width: "100%" }}>
              <Button
                className="auth-cta"
                type="submit"
                text="Create account"
                disabled={isSubmitting}
              />
            </div>
          </form>
          <div className="auth-footer">
            Already have an account?{" "}
            <Link to="/auth/login" className="auth-link">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
