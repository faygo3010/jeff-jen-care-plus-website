"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/app/admin/actions";
import { Button, field, label } from "@/components/admin/ui";

export default function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(
    login,
    {},
  );

  return (
    <form action={action} className="mt-7 grid gap-5">
      <label className="block">
        <span className={label}>Password</span>
        <input
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          className={field}
        />
      </label>
      {state.error && (
        <p role="alert" className="text-[13px] text-ink/80">
          {state.error}
        </p>
      )}
      <Button type="submit" disabled={pending}>
        {pending ? "Checking..." : "Log in"}
      </Button>
    </form>
  );
}
