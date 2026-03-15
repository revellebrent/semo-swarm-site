import {
  createTryoutAction,
  deleteTryoutAction,
  updateTryoutAction,
} from "@/app/(internal)/actions/content";
import { DashboardFormField } from "@/components/dashboard/dashboard-form-field";
import type {
  ManagedTryout,
  ManagementCoachOption,
  ManagementTeamOption,
} from "@/lib/dashboard/content-management";

type TryoutManagerProps = {
  mode: "admin" | "coach";
  tryouts: ManagedTryout[];
  teamOptions: ManagementTeamOption[];
  coachOptions?: ManagementCoachOption[];
};

export function TryoutManager({ mode, tryouts, teamOptions, coachOptions = [] }: TryoutManagerProps) {
  const isAdmin = mode === "admin";
  const canCreateTryout = isAdmin || teamOptions.length > 0;

  return (
    <section
      id={isAdmin ? "tryouts" : "team-tryouts"}
      className="scroll-mt-28 rounded-[1.9rem] border border-white/10 bg-white/5 p-6 sm:p-7"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
            {isAdmin ? "Tryouts" : "Coach-Owned Tryouts"}
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
            {isAdmin ? "Manage club tryout records." : "Manage your coach-owned evaluation programs."}
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            {isAdmin
              ? "Admins can create, update, and remove tryouts across the club, including coach-independent and club-wide evaluation paths."
              : "Coaches can create and manage only the tryouts they own, while keeping team associations scoped to their assignments."}
          </p>
        </div>

        <div className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
          {tryouts.length} active item{tryouts.length === 1 ? "" : "s"}
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        {canCreateTryout ? (
          <form action={createTryoutAction} className="rounded-[1.7rem] border border-white/10 bg-slate-950/55 p-5">
            <input type="hidden" name="mode" value={mode} />
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Create Tryout</p>
            <div className="mt-5 grid gap-4">
              <DashboardFormField
                id={`tryout-title-${mode}`}
                name="title"
                label="Title"
                placeholder="Enter tryout or evaluation title"
                required
              />
              <DashboardFormField
                id={`tryout-slug-${mode}`}
                name="slug"
                label="Slug"
                placeholder="auto-generated-if-left-blank"
                helperText="If left blank, a slug is generated from the title."
              />
              <div className="grid gap-4 md:grid-cols-2">
                <DashboardFormField
                  id={`tryout-age-group-${mode}`}
                  name="ageGroup"
                  label="Age Group"
                  placeholder="U13-U15"
                  required
                />
                <DashboardFormField
                  id={`tryout-status-${mode}`}
                  name="status"
                  label="Status"
                  fieldType="select"
                  defaultValue="draft"
                  options={[
                    { label: "Draft", value: "draft" },
                    { label: "Open", value: "open" },
                    { label: "Closed", value: "closed" },
                  ]}
                  required
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <DashboardFormField
                  id={`tryout-format-${mode}`}
                  name="format"
                  label="Format"
                  fieldType="select"
                  defaultValue={isAdmin ? "club_wide" : "coach_independent"}
                  options={
                    isAdmin
                      ? [
                          { label: "Club Wide", value: "club_wide" },
                          { label: "Coach Independent", value: "coach_independent" },
                        ]
                      : [{ label: "Coach Independent", value: "coach_independent" }]
                  }
                  required
                />
                <DashboardFormField
                  id={`tryout-team-${mode}`}
                  name="teamId"
                  label="Team"
                  fieldType="select"
                  placeholder="Optional team association"
                  options={teamOptions}
                />
              </div>
              {isAdmin ? (
                <DashboardFormField
                  id={`tryout-owner-${mode}`}
                  name="ownerCoachId"
                  label="Owner Coach"
                  fieldType="select"
                  placeholder="Optional coach owner"
                  options={coachOptions}
                />
              ) : null}
              <div className="grid gap-4 md:grid-cols-2">
                <DashboardFormField
                  id={`tryout-location-${mode}`}
                  name="location"
                  label="Location"
                  placeholder="Semo Training Grounds"
                />
                <DashboardFormField
                  id={`tryout-season-${mode}`}
                  name="season"
                  label="Season"
                  placeholder="2026-2027 Club Year"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <DashboardFormField
                  id={`tryout-start-${mode}`}
                  name="startDate"
                  label="Start Date"
                  type="date"
                />
                <DashboardFormField
                  id={`tryout-end-${mode}`}
                  name="endDate"
                  label="End Date"
                  type="date"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <DashboardFormField
                  id={`tryout-registration-label-${mode}`}
                  name="registrationLabel"
                  label="Registration Label"
                  placeholder="Request Evaluation"
                />
                <DashboardFormField
                  id={`tryout-registration-href-${mode}`}
                  name="registrationHref"
                  label="Registration Link"
                  placeholder="/contact"
                />
              </div>
              <DashboardFormField
                id={`tryout-description-${mode}`}
                name="description"
                label="Description"
                fieldType="textarea"
                rows={5}
                placeholder="Describe the purpose, training standard, and player fit."
              />
              <DashboardFormField
                id={`tryout-public-${mode}`}
                name="isPublic"
                label="Public Visibility"
                fieldType="select"
                defaultValue="true"
                options={[
                  { label: "Visible On Public Site", value: "true" },
                  { label: "Internal Only", value: "false" },
                ]}
                required
              />
            </div>
            <button
              type="submit"
              className="mt-5 inline-flex items-center justify-center rounded-full border border-amber-300/40 bg-amber-300 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_12px_30px_rgba(245,158,11,0.2)] transition hover:bg-amber-200"
            >
              Create Tryout
            </button>
          </form>
        ) : (
          <div className="rounded-[1.7rem] border border-dashed border-white/15 bg-slate-950/55 p-6 text-sm leading-7 text-slate-300">
            This coach account does not have any assigned teams yet, so coach-owned tryouts are temporarily locked.
            Once a team assignment is in place, this form will become available automatically.
          </div>
        )}

        <div className="grid gap-4">
          {tryouts.length > 0 ? (
            tryouts.map((tryout) => (
              <article key={tryout.id} className="rounded-[1.7rem] border border-white/10 bg-slate-950/55 p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {tryout.ageGroup} | {tryout.format.replace("_", " ")}
                      {tryout.teamLabel ? ` | ${tryout.teamLabel}` : ""}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-white">{tryout.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{tryout.description || "No description provided yet."}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-200">
                      {tryout.status}
                    </span>
                    <span
                      className={[
                        "rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]",
                        tryout.isPublic
                          ? "border border-emerald-400/25 bg-emerald-400/10 text-emerald-200"
                          : "border border-white/10 bg-slate-950/60 text-slate-400",
                      ].join(" ")}
                    >
                      {tryout.isPublic ? "Public" : "Internal"}
                    </span>
                  </div>
                </div>

                <details className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <summary className="cursor-pointer list-none text-sm font-semibold text-white">Edit Tryout</summary>
                  <form action={updateTryoutAction} className="mt-4 grid gap-4">
                    <input type="hidden" name="tryoutId" value={tryout.id} />
                    <input type="hidden" name="mode" value={mode} />
                    <DashboardFormField
                      id={`tryout-title-edit-${tryout.id}`}
                      name="title"
                      label="Title"
                      defaultValue={tryout.title}
                      required
                    />
                    <DashboardFormField
                      id={`tryout-slug-edit-${tryout.id}`}
                      name="slug"
                      label="Slug"
                      defaultValue={tryout.slug}
                    />
                    <div className="grid gap-4 md:grid-cols-2">
                      <DashboardFormField
                        id={`tryout-age-group-edit-${tryout.id}`}
                        name="ageGroup"
                        label="Age Group"
                        defaultValue={tryout.ageGroup}
                        required
                      />
                      <DashboardFormField
                        id={`tryout-status-edit-${tryout.id}`}
                        name="status"
                        label="Status"
                        fieldType="select"
                        defaultValue={tryout.status}
                        options={[
                          { label: "Draft", value: "draft" },
                          { label: "Open", value: "open" },
                          { label: "Closed", value: "closed" },
                        ]}
                        required
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <DashboardFormField
                        id={`tryout-format-edit-${tryout.id}`}
                        name="format"
                        label="Format"
                        fieldType="select"
                        defaultValue={tryout.format}
                        options={
                          isAdmin
                            ? [
                                { label: "Club Wide", value: "club_wide" },
                                { label: "Coach Independent", value: "coach_independent" },
                              ]
                            : [{ label: "Coach Independent", value: "coach_independent" }]
                        }
                        required
                      />
                      <DashboardFormField
                        id={`tryout-team-edit-${tryout.id}`}
                        name="teamId"
                        label="Team"
                        fieldType="select"
                        defaultValue={tryout.teamId ?? ""}
                        options={teamOptions}
                      />
                    </div>
                    {isAdmin ? (
                      <DashboardFormField
                        id={`tryout-owner-edit-${tryout.id}`}
                        name="ownerCoachId"
                        label="Owner Coach"
                        fieldType="select"
                        defaultValue={tryout.ownerCoachId ?? ""}
                        options={coachOptions}
                      />
                    ) : null}
                    <div className="grid gap-4 md:grid-cols-2">
                      <DashboardFormField
                        id={`tryout-location-edit-${tryout.id}`}
                        name="location"
                        label="Location"
                        defaultValue={tryout.location}
                      />
                      <DashboardFormField
                        id={`tryout-season-edit-${tryout.id}`}
                        name="season"
                        label="Season"
                        defaultValue={tryout.season}
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <DashboardFormField
                        id={`tryout-start-edit-${tryout.id}`}
                        name="startDate"
                        label="Start Date"
                        type="date"
                        defaultValue={tryout.startDate}
                      />
                      <DashboardFormField
                        id={`tryout-end-edit-${tryout.id}`}
                        name="endDate"
                        label="End Date"
                        type="date"
                        defaultValue={tryout.endDate}
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <DashboardFormField
                        id={`tryout-registration-label-edit-${tryout.id}`}
                        name="registrationLabel"
                        label="Registration Label"
                        defaultValue={tryout.registrationLabel}
                      />
                      <DashboardFormField
                        id={`tryout-registration-href-edit-${tryout.id}`}
                        name="registrationHref"
                        label="Registration Link"
                        defaultValue={tryout.registrationHref}
                      />
                    </div>
                    <DashboardFormField
                      id={`tryout-description-edit-${tryout.id}`}
                      name="description"
                      label="Description"
                      fieldType="textarea"
                      rows={5}
                      defaultValue={tryout.description}
                    />
                    <DashboardFormField
                      id={`tryout-public-edit-${tryout.id}`}
                      name="isPublic"
                      label="Public Visibility"
                      fieldType="select"
                      defaultValue={tryout.isPublic ? "true" : "false"}
                      options={[
                        { label: "Visible On Public Site", value: "true" },
                        { label: "Internal Only", value: "false" },
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

                <form action={deleteTryoutAction} className="mt-4">
                  <input type="hidden" name="tryoutId" value={tryout.id} />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full border border-rose-400/25 bg-rose-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-rose-200 transition hover:bg-rose-400/15"
                  >
                    Delete Tryout
                  </button>
                </form>
              </article>
            ))
          ) : (
            <div className="rounded-[1.7rem] border border-dashed border-white/15 bg-white/5 p-8 text-sm leading-7 text-slate-400">
              No tryouts have been created in this workspace yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
