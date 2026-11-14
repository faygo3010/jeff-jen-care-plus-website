/* eslint-disable @next/next/no-img-element -- admin thumbnails, any source */
import { readStoredContent } from "@/lib/content";
import { work as defaultWork, type CaseStudy } from "@/lib/site-config";
import { MAX_UPLOAD_MB } from "@/lib/uploads";
import { moveWork, removeWork, saveWork } from "@/app/admin/actions";
import ConfirmButton from "@/components/admin/ConfirmButton";
import { Button, Field, Notice, Panel, TextArea, type AdminSearchParams } from "@/components/admin/ui";

function WorkForm({ study }: { study?: CaseStudy }) {
  return (
    <form action={saveWork} className="grid gap-5">
      <input type="hidden" name="originalSlug" value={study?.slug ?? ""} />
      <input type="hidden" name="existingImage" value={study?.image ?? ""} />
      <div className="grid gap-5 sm:grid-cols-3">
        <Field name="client" title="Title" defaultValue={study?.client} required />
        <Field name="sector" title="Label" defaultValue={study?.sector} placeholder="Team, News or Training" />
        <Field name="location" title="Location" defaultValue={study?.location} placeholder="Oxford" />
      </div>
      <TextArea
        name="summary"
        title="Short description"
        rows={4}
        defaultValue={study?.summary}
        placeholder="A sentence or two. Only share photos of people with their written permission."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextArea
          name="delivered"
          title="Extra points (optional, one per line)"
          rows={5}
          defaultValue={study?.delivered.join("\n")}
        />
        <div className="grid content-start gap-5">
          <Field name="url" title="Link (optional)" type="url" defaultValue={study?.url} placeholder="https://" />
          <Field
            name="image"
            title={study?.image ? "Replace photo" : "Photo"}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            hint={`JPG, PNG or WebP, under ${MAX_UPLOAD_MB}MB. A landscape photo works best.`}
          />
        </div>
      </div>
      <div>
        <Button type="submit">{study ? "Save changes" : "Add to Team & news"}</Button>
      </div>
    </form>
  );
}

export default async function WorkAdminPage({ searchParams }: { searchParams: AdminSearchParams }) {
  const { saved, error } = await searchParams;
  const stored = await readStoredContent();
  const list = stored.work ?? defaultWork;

  return (
    <>
      <h1 className="font-display text-4xl text-ink">Team &amp; news</h1>
      <Notice saved={saved} error={error} />

      <Panel title="Add a photo or news item">
        <WorkForm />
      </Panel>

      {list.map((study, i) => (
        <Panel
          key={study.slug}
          title={study.client}
          actions={
            <div className="flex flex-wrap gap-2">
              {i > 0 && (
                <form action={moveWork}>
                  <input type="hidden" name="slug" value={study.slug} />
                  <input type="hidden" name="dir" value="up" />
                  <Button tone="quiet" type="submit">Move up</Button>
                </form>
              )}
              {i < list.length - 1 && (
                <form action={moveWork}>
                  <input type="hidden" name="slug" value={study.slug} />
                  <input type="hidden" name="dir" value="down" />
                  <Button tone="quiet" type="submit">Move down</Button>
                </form>
              )}
              <form action={removeWork}>
                <input type="hidden" name="slug" value={study.slug} />
                <ConfirmButton question={`Remove ${study.client} from Team & news?`}>Remove</ConfirmButton>
              </form>
            </div>
          }
        >
          {study.image && (
            <img
              src={study.image}
              alt=""
              className="mb-5 aspect-[16/10] w-full max-w-xs border-2 border-hairline object-cover object-top"
            />
          )}
          <details>
            <summary className="font-pixel cursor-pointer text-[10px] uppercase text-signal">Edit</summary>
            <div className="mt-5">
              <WorkForm study={study} />
            </div>
          </details>
        </Panel>
      ))}
    </>
  );
}
