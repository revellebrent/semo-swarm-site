import {
  createAnnouncementAction,
  deleteAnnouncementAction,
  updateAnnouncementAction,
} from "@/app/(internal)/actions/content";
import { DashboardFormField } from "@/components/dashboard/dashboard-form-field";
import type { ManagedAnnouncement, ManagementTeamOption } from "@/lib/dashboard/content-management";

type AnnouncementManagerProps = {
  mode: "admin" | "coach";
  announcements: ManagedAnnouncement[];
  teamOptions: ManagementTeamOption[];
};

export function AnnouncementManager({ mode, announcements, teamOptions }: AnnouncementManagerProps) {
  const isAdmin = mode === "admin";
  const canCreateAnnouncement = isAdmin || teamOptions.length > 0;

  return (
    <section
      id={isAdmin ? "announcements" : "team-announcements"}
      className="scroll-mt-28 rounded-[1.9rem] border border-amber-300/20 bg-[linear-gradient(180deg,_rgba(245,158,11,0.12),_rgba(255,255,255,0.04))] p-6 sm:p-7"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
            {isAdmin ? "Club Announcements" : "Team Announcements"}
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
            {isAdmin ? "Manage club-wide announcements." : "Manage announcements for your assigned teams."}
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            {isAdmin
              ? "Admins can publish, update, and remove club announcements that appear in the public site structure."
              : "Coaches can create and edit only team announcements tied to their assigned groups."}
          </p>
        </div>

        <div className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
          {announcements.length} active item{announcements.length === 1 ? "" : "s"}
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        {canCreateAnnouncement ? (
          <form action={createAnnouncementAction} className="rounded-[1.7rem] border border-white/10 bg-slate-950/55 p-5">
            <input type="hidden" name="mode" value={mode} />
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Create Announcement</p>
            <div className="mt-5 grid gap-4">
              <DashboardFormField
                id={`announcement-title-${mode}`}
                name="title"
                label="Title"
                placeholder="Enter announcement headline"
                required
              />
              <DashboardFormField
                id={`announcement-category-${mode}`}
                name="category"
                label="Category"
                placeholder="Club News, Events, Player Development"
              />
              {!isAdmin ? (
                <DashboardFormField
                  id={`announcement-team-${mode}`}
                  name="teamId"
                  label="Team"
                  fieldType="select"
                  placeholder="Select one of your teams"
                  options={teamOptions}
                  required
                />
              ) : null}
              <DashboardFormField
                id={`announcement-summary-${mode}`}
                name="summary"
                label="Summary"
                fieldType="textarea"
                rows={4}
                placeholder="Write the public summary that families will see first."
                required
              />
              <DashboardFormField
                id={`announcement-body-${mode}`}
                name="body"
                label="Body"
                fieldType="textarea"
                rows={5}
                placeholder="Optional expanded announcement details."
              />
              <DashboardFormField
                id={`announcement-publish-${mode}`}
                name="publishState"
                label="Publish State"
                fieldType="select"
                defaultValue="published"
                options={[
                  { label: "Published", value: "published" },
                  { label: "Draft", value: "draft" },
                ]}
                required
              />
            </div>
            <button
              type="submit"
              className="mt-5 inline-flex items-center justify-center rounded-full border border-amber-300/40 bg-amber-300 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_12px_30px_rgba(245,158,11,0.2)] transition hover:bg-amber-200"
            >
              Create Announcement
            </button>
          </form>
        ) : (
          <div className="rounded-[1.7rem] border border-dashed border-white/15 bg-slate-950/55 p-6 text-sm leading-7 text-slate-300">
            This coach account does not have any team assignments yet, so announcement creation is temporarily unavailable.
            Once a team is assigned in Supabase, this section will unlock automatically.
          </div>
        )}

        <div className="grid gap-4">
          {announcements.length > 0 ? (
            announcements.map((announcement) => (
              <article key={announcement.id} className="rounded-[1.7rem] border border-white/10 bg-white/5 p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {announcement.category} {announcement.teamLabel ? `| ${announcement.teamLabel}` : ""}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-white">{announcement.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{announcement.summary}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span
                      className={[
                        "rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]",
                        announcement.isPublished
                          ? "border border-emerald-400/25 bg-emerald-400/10 text-emerald-200"
                          : "border border-white/10 bg-slate-950/60 text-slate-400",
                      ].join(" ")}
                    >
                      {announcement.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>

                <details className="mt-5 rounded-2xl border border-white/10 bg-slate-950/55 p-4">
                  <summary className="cursor-pointer list-none text-sm font-semibold text-white">Edit Announcement</summary>
                  <form action={updateAnnouncementAction} className="mt-4 grid gap-4">
                    <input type="hidden" name="announcementId" value={announcement.id} />
                    <input type="hidden" name="mode" value={mode} />
                    <DashboardFormField
                      id={`announcement-title-edit-${announcement.id}`}
                      name="title"
                      label="Title"
                      defaultValue={announcement.title}
                      required
                    />
                    <DashboardFormField
                      id={`announcement-category-edit-${announcement.id}`}
                      name="category"
                      label="Category"
                      defaultValue={announcement.category}
                    />
                    {!isAdmin ? (
                      <DashboardFormField
                        id={`announcement-team-edit-${announcement.id}`}
                        name="teamId"
                        label="Team"
                        fieldType="select"
                        defaultValue={announcement.teamId ?? ""}
                        options={teamOptions}
                        required
                      />
                    ) : null}
                    <DashboardFormField
                      id={`announcement-summary-edit-${announcement.id}`}
                      name="summary"
                      label="Summary"
                      fieldType="textarea"
                      rows={4}
                      defaultValue={announcement.summary}
                      required
                    />
                    <DashboardFormField
                      id={`announcement-body-edit-${announcement.id}`}
                      name="body"
                      label="Body"
                      fieldType="textarea"
                      rows={5}
                      defaultValue={announcement.body}
                    />
                    <DashboardFormField
                      id={`announcement-publish-edit-${announcement.id}`}
                      name="publishState"
                      label="Publish State"
                      fieldType="select"
                      defaultValue={announcement.isPublished ? "published" : "draft"}
                      options={[
                        { label: "Published", value: "published" },
                        { label: "Draft", value: "draft" },
                      ]}
                      required
                    />
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </details>

                <form action={deleteAnnouncementAction} className="mt-4">
                  <input type="hidden" name="announcementId" value={announcement.id} />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full border border-rose-400/25 bg-rose-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-rose-200 transition hover:bg-rose-400/15"
                  >
                    Delete Announcement
                  </button>
                </form>
              </article>
            ))
          ) : (
            <div className="rounded-[1.7rem] border border-dashed border-white/15 bg-white/5 p-8 text-sm leading-7 text-slate-400">
              No announcements have been created in this workspace yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
