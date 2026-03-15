import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { LoginForm } from "@/components/auth/login-form";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { buildPageMetadata } from "@/lib/metadata";
import { getInternalAuthContext } from "@/lib/auth/server";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
    next?: string;
  }>;
};

export const metadata: Metadata = buildPageMetadata({
  title: "Internal Login",
  description:
    "Secure internal login for Semo Swarm admins and coaches.",
  path: "/login",
});

function getErrorMessage(errorCode?: string) {
  switch (errorCode) {
    case "inactive":
      return "This internal account is inactive. Contact a super admin for help.";
    case "unauthorized":
      return "This account is authenticated but does not have access to the internal portal.";
    default:
      return null;
  }
}

function getSafeNextPath(nextPath?: string) {
  if (!nextPath || !nextPath.startsWith("/") || nextPath.startsWith("//")) {
    return "/dashboard";
  }

  return nextPath;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const [{ error, next }, authContext] = await Promise.all([searchParams, getInternalAuthContext()]);
  const nextPath = getSafeNextPath(next);

  if (authContext && authContext.roleKeys.length > 0 && (!authContext.profile || authContext.profile.is_active)) {
    redirect(nextPath);
  }

  const errorMessage = getErrorMessage(error);

  return (
    <SectionWrapper>
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
        <section className="rounded-[2rem] border border-amber-300/20 bg-[linear-gradient(135deg,_rgba(245,158,11,0.16),_rgba(255,255,255,0.04))] p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-200">Internal Access</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
            Admin and coach sign in for the Semo Swarm platform.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-slate-200">
            This login is reserved for approved internal staff accounts. Public families and sponsors should continue using the main site pages and contact forms.
          </p>

          <div className="mt-8 grid gap-4">
            {[
              "Supabase Auth session foundation for future dashboards",
              "No public sign-up flow exposed on the website",
              "Role-based access for super admins, club admins, and coaches",
            ].map((item, index) => (
              <div key={item} className="flex gap-4 rounded-2xl border border-white/10 bg-slate-950/55 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-slate-950">
                  0{index + 1}
                </div>
                <p className="text-sm leading-7 text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">Sign In</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
            Access the internal portal.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Use the credentials provisioned for your coach or admin account. Public registration and sponsor inquiry flows stay separate.
          </p>

          {errorMessage ? (
            <div className="mt-6 rounded-[1.4rem] border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
              {errorMessage}
            </div>
          ) : null}

          <div className="mt-8">
            <LoginForm nextPath={nextPath} />
          </div>

          <div className="mt-8 border-t border-white/10 pt-6 text-sm text-slate-400">
            Need help accessing the internal area?{" "}
            <Link href="/contact" className="text-amber-300 transition hover:text-amber-200">
              Contact the club
            </Link>
            .
          </div>
        </section>
      </div>
    </SectionWrapper>
  );
}
