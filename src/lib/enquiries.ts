import { hashDel, hashGet, hashGetAll, hashSet } from "@/lib/store";

export const ENQUIRY_STATUSES = ["new", "contacted", "won", "lost"] as const;
export type EnquiryStatus = (typeof ENQUIRY_STATUSES)[number];

export type Enquiry = {
  id: string;
  createdAt: string; // ISO
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: EnquiryStatus;
  notes: string;
};

const KEY = "enquiries";

export async function listEnquiries() {
  const all = await hashGetAll<Enquiry>(KEY);
  return all.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function addEnquiry(
  data: Omit<Enquiry, "id" | "createdAt" | "status" | "notes">,
) {
  const enquiry: Enquiry = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "new",
    notes: "",
  };
  await hashSet(KEY, enquiry.id, enquiry);
  return enquiry;
}

export async function updateEnquiry(id: string, patch: Pick<Enquiry, "status" | "notes">) {
  const current = await hashGet<Enquiry>(KEY, id);
  if (!current) return;
  await hashSet(KEY, id, { ...current, ...patch });
}

export async function deleteEnquiry(id: string) {
  await hashDel(KEY, id);
}
