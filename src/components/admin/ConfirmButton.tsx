"use client";

import { Button } from "@/components/admin/ui";

/** A submit button that asks first. For deletes. */
export default function ConfirmButton({
  children,
  question,
}: {
  children: React.ReactNode;
  question: string;
}) {
  return (
    <Button
      type="submit"
      tone="danger"
      onClick={(e) => {
        if (!window.confirm(question)) e.preventDefault();
      }}
    >
      {children}
    </Button>
  );
}
