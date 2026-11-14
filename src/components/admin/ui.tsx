import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Shared admin styles: same tokens as the public site, plainer layout.
export const field =
  "mt-2 w-full border-2 border-hairline-strong bg-paper px-3 py-2.5 text-[14px] text-ink outline-none transition-colors duration-150 placeholder:text-ink/50 focus:border-signal [&>option]:bg-paper";
export const label = "font-pixel block text-[10px] uppercase text-ink/70";

export function Field({
  name,
  title,
  hint,
  className,
  ...props
}: {
  name: string;
  title: string;
  hint?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={cn("block", className)}>
      <span className={label}>{title}</span>
      <input name={name} className={field} {...props} />
      {hint && <span className="mt-1.5 block text-[12px] text-ink/70">{hint}</span>}
    </label>
  );
}

export function TextArea({
  name,
  title,
  hint,
  className,
  ...props
}: {
  name: string;
  title: string;
  hint?: string;
  className?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className={cn("block", className)}>
      <span className={label}>{title}</span>
      <textarea name={name} className={field} {...props} />
      {hint && <span className="mt-1.5 block text-[12px] text-ink/70">{hint}</span>}
    </label>
  );
}

export function Button({
  children,
  tone = "primary",
  className,
  ...props
}: {
  children: ReactNode;
  tone?: "primary" | "quiet" | "danger";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const tones = {
    primary: "bg-signal text-snow hover:bg-ink",
    quiet: "border-2 border-hairline-strong text-ink/80 hover:border-signal hover:text-ink",
    danger: "border-2 border-destructive/50 text-ink/80 hover:bg-destructive/20",
  };
  return (
    <button
      className={cn(
        "font-pixel inline-flex items-center justify-center rounded-[var(--round-inner)] px-4 py-2.5 text-[11px] uppercase transition-colors duration-150 disabled:opacity-50",
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Panel({ title, children, actions }: { title?: string; children: ReactNode; actions?: ReactNode }) {
  return (
    <section className="border-2 border-hairline bg-paper-deep/50 p-5 sm:p-7">
      {(title || actions) && (
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          {title && <h2 className="font-display text-2xl text-ink">{title}</h2>}
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}

/** "Saved" or an error, from the ?saved / ?error the actions redirect with. */
export function Notice({
  saved,
  error,
  message = "Saved. The live site is updated.",
}: {
  saved?: string;
  error?: string;
  message?: string;
}) {
  if (error) {
    return (
      <p role="alert" className="border-2 border-destructive/60 bg-destructive/10 px-4 py-3 text-[14px] text-ink">
        {error}
      </p>
    );
  }
  if (saved) {
    return (
      <p role="status" className="border-2 border-signal/50 bg-signal/10 px-4 py-3 text-[14px] text-ink">
        {message}
      </p>
    );
  }
  return null;
}

export type AdminSearchParams = Promise<{ saved?: string; error?: string; status?: string }>;
