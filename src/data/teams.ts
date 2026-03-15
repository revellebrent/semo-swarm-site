import { coaches } from "@/data/club-management";
import type { Announcement, Team } from "@/types/site";
import type { TeamModel } from "@/types/models";

const teamAnnouncements: Announcement[] = [
  {
    id: "announcement-u11-parent-night",
    createdAt: "2026-08-10",
    updatedAt: "2026-08-10",
    title: "Parent information night scheduled before opening weekend",
    date: "August 12",
    category: "Team Update",
    summary:
      "Families will receive season expectations, sideline standards, and communication guidelines before the first match block.",
    href: "/teams/u11-girls-academy",
    scope: "team",
    authorUserId: "user-elena-brooks",
    teamId: "team-u11-girls-academy",
    published: true,
  },
  {
    id: "announcement-u11-ball-mastery",
    createdAt: "2026-08-24",
    updatedAt: "2026-08-24",
    title: "Extra ball mastery session added for academy players",
    date: "August 26",
    category: "Development",
    summary:
      "Optional Friday technical sessions will focus on first touch, turning, and receiving under light pressure.",
    href: "/teams/u11-girls-academy",
    scope: "team",
    authorUserId: "user-elena-brooks",
    teamId: "team-u11-girls-academy",
    published: true,
  },
  {
    id: "announcement-u13-video-review",
    createdAt: "2026-09-01",
    updatedAt: "2026-09-01",
    title: "Video review added after Sunday showcase fixtures",
    date: "September 2",
    category: "Match Analysis",
    summary:
      "Players will review pressing distances, body shape in reception, and decision speed during the next team meeting.",
    href: "/teams/u13-boys-premier",
    scope: "team",
    authorUserId: "user-jordan-ellis",
    teamId: "team-u13-boys-premier",
    published: true,
  },
  {
    id: "announcement-u13-travel",
    createdAt: "2026-09-09",
    updatedAt: "2026-09-09",
    title: "Travel details released for late-September tournament",
    date: "September 10",
    category: "Travel",
    summary:
      "Families will receive hotel blocks, arrival windows, and roster logistics for the upcoming regional event.",
    href: "/teams/u13-boys-premier",
    scope: "team",
    authorUserId: "user-jordan-ellis",
    teamId: "team-u13-boys-premier",
    published: true,
  },
  {
    id: "announcement-u15-leadership",
    createdAt: "2026-08-16",
    updatedAt: "2026-08-16",
    title: "Leadership group selected for fall competition block",
    date: "August 18",
    category: "Team Culture",
    summary:
      "Captains and leadership representatives will help support communication, matchday focus, and training standards.",
    href: "/teams/u15-girls-premier",
    scope: "team",
    authorUserId: "user-mason-carter",
    teamId: "team-u15-girls-premier",
    published: true,
  },
  {
    id: "announcement-u15-attacking-clinic",
    createdAt: "2026-08-28",
    updatedAt: "2026-08-28",
    title: "Attacking unit clinic scheduled ahead of conference opener",
    date: "August 30",
    category: "Performance",
    summary:
      "The staff will run an extra finishing and final-third timing session ahead of the season's opening stretch.",
    href: "/teams/u15-girls-premier",
    scope: "team",
    authorUserId: "user-elena-brooks",
    teamId: "team-u15-girls-premier",
    published: true,
  },
];

const teamModels: TeamModel[] = [
  {
    id: "team-u11-girls-academy",
    createdAt: "2026-01-15",
    updatedAt: "2026-03-14",
    slug: "u11-girls-academy",
    name: "Swarm U11 Girls Academy",
    ageGroup: "U11 Girls",
    level: "Academy",
    gender: "Girls",
    focus: "Ball mastery and confidence in possession",
    summary:
      "A foundation-focused squad for developing players ready to sharpen technique and embrace a fast, team-first playing style.",
    overview:
      "The U11 Girls Academy group is built around touches, bravery, and comfort on the ball. Players are introduced to Swarm standards through high-repetition technical work, small-sided decision-making, and match habits that reinforce confidence.",
    playerProfile:
      "Best for players who are eager to train consistently, enjoy learning in a competitive environment, and want to build strong technical habits early.",
    homeBase: "Cape Girardeau SportsPlex",
    practice: {
      days: ["Monday", "Thursday"],
      time: "5:30 PM - 7:00 PM",
      location: "Cape Girardeau SportsPlex",
      season: "Fall and Spring",
      notes:
        "Players should arrive 15 minutes early with both training jersey colors, ball, shin guards, and water.",
    },
    schedule: [
      {
        id: "u11-1",
        opponent: "River City SC",
        date: "Saturday, September 13",
        location: "Cape Girardeau SportsPlex",
        type: "League Fixture",
      },
      {
        id: "u11-2",
        opponent: "Bootheel United",
        date: "Sunday, September 21",
        location: "Bootheel Soccer Complex",
        type: "Festival Matchday",
      },
    ],
    seasonGoals: [
      "Build confidence receiving under pressure",
      "Introduce attacking principles in wide spaces",
      "Strengthen competitive match habits",
    ],
    coachIds: ["coach-elena-brooks", "coach-lena-frost"],
    announcementIds: ["announcement-u11-parent-night", "announcement-u11-ball-mastery"],
    tryoutIds: ["tryout-u10-u12-academy"],
    tryoutCallout: {
      title: "Still exploring the U11 pathway?",
      description:
        "Families interested in academy placement can request an upcoming evaluation date or ask about supplemental training options.",
      href: "/tryouts",
      ctaLabel: "View Tryout Options",
    },
  },
  {
    id: "team-u13-boys-premier",
    createdAt: "2026-01-15",
    updatedAt: "2026-03-14",
    slug: "u13-boys-premier",
    name: "Swarm U13 Boys Premier",
    ageGroup: "U13 Boys",
    level: "Premier",
    gender: "Boys",
    focus: "Press-resistant buildup and game tempo",
    summary:
      "An advanced environment for committed players who want faster decisions, cleaner combination play, and disciplined pressing.",
    overview:
      "The U13 Boys Premier team emphasizes tempo control, coordinated pressing, and cleaner execution in buildup moments. Sessions are built to stretch players tactically while keeping technical standards high under pressure.",
    playerProfile:
      "Ideal for players who want a demanding training standard, regional competition, and coaching that connects small details to the bigger game model.",
    homeBase: "Shawnee Park Complex",
    practice: {
      days: ["Tuesday", "Friday"],
      time: "6:00 PM - 7:45 PM",
      location: "Shawnee Park Complex",
      season: "Year-round competitive calendar",
      notes:
        "One recovery and mobility block is assigned weekly outside full team sessions to support tournament demands.",
    },
    schedule: [
      {
        id: "u13-1",
        opponent: "St. Louis Select",
        date: "Saturday, September 6",
        location: "Shawnee Park Complex",
        type: "Regional League",
      },
      {
        id: "u13-2",
        opponent: "Jackson Titans",
        date: "Sunday, September 14",
        location: "Jackson Sports Campus",
        type: "Showcase Friendly",
      },
      {
        id: "u13-3",
        opponent: "Paducah Elite",
        date: "Saturday, September 27",
        location: "Paducah Athletic Grounds",
        type: "Tournament Group Match",
      },
    ],
    seasonGoals: [
      "Improve buildout patterns from the back",
      "Develop coordinated team pressing triggers",
      "Raise physical readiness for tournament play",
    ],
    coachIds: ["coach-jordan-ellis", "coach-owen-ward"],
    announcementIds: ["announcement-u13-video-review", "announcement-u13-travel"],
    tryoutIds: ["tryout-u13-u15-premier", "tryout-boys-midfield-profile"],
    tryoutCallout: {
      title: "Interested in premier-level competition?",
      description:
        "We welcome inquiries from committed players looking for a faster game model and a demanding training environment.",
      href: "/tryouts",
      ctaLabel: "Request Evaluation Info",
    },
  },
  {
    id: "team-u15-girls-premier",
    createdAt: "2026-01-15",
    updatedAt: "2026-03-14",
    slug: "u15-girls-premier",
    name: "Swarm U15 Girls Premier",
    ageGroup: "U15 Girls",
    level: "Premier",
    gender: "Girls",
    focus: "Tactical maturity and attacking variety",
    summary:
      "A high-expectation group preparing for top regional competition with a focus on speed of play and mentality.",
    overview:
      "The U15 Girls Premier group trains with a strong emphasis on game understanding, attacking flexibility, and leadership across the field. Players are challenged to solve problems quickly while maintaining the club's identity.",
    playerProfile:
      "Built for motivated players preparing for advanced competition who want tactical coaching, competitive accountability, and a connected team culture.",
    homeBase: "Semo Training Grounds",
    practice: {
      days: ["Monday", "Wednesday", "Sunday"],
      time: "6:15 PM - 8:00 PM",
      location: "Semo Training Grounds",
      season: "Fall, Winter training block, and Spring",
      notes:
        "Sunday sessions alternate between full-team tactical work and strength-speed development depending on match load.",
    },
    schedule: [
      {
        id: "u15-1",
        opponent: "Metro East FC",
        date: "Saturday, September 7",
        location: "Semo Training Grounds",
        type: "Conference Match",
      },
      {
        id: "u15-2",
        opponent: "Southern Illinois Rush",
        date: "Saturday, September 20",
        location: "Southern Illinois Sports Park",
        type: "Regional Fixture",
      },
    ],
    seasonGoals: [
      "Create more chances through central overloads",
      "Refine transition defending after turnovers",
      "Develop leadership across the spine of the team",
    ],
    coachIds: ["coach-mason-carter", "coach-elena-brooks"],
    announcementIds: ["announcement-u15-leadership", "announcement-u15-attacking-clinic"],
    tryoutIds: ["tryout-u13-u15-premier", "tryout-girls-attacking-eval"],
    tryoutCallout: {
      title: "Looking for a higher-level girls environment?",
      description:
        "Players interested in the premier track can reach out for placement guidance, training standards, and evaluation options.",
      href: "/tryouts",
      ctaLabel: "See Tryout Pathway",
    },
  },
];

function resolveTeam(team: TeamModel): Team {
  return {
    ...team,
    coaches: coaches.filter((coach) => team.coachIds.includes(coach.id)),
    announcements: teamAnnouncements.filter((announcement) => team.announcementIds.includes(announcement.id)),
  };
}

export function getAllTeams() {
  return teamModels.map(resolveTeam);
}

export function getTeamBySlug(slug: string) {
  const team = teamModels.find((entry) => entry.slug === slug);
  return team ? resolveTeam(team) : undefined;
}

export function getTeamsGroupedByAgeGroup() {
  return getAllTeams().reduce<Record<string, Team[]>>((groups, team) => {
    if (!groups[team.ageGroup]) {
      groups[team.ageGroup] = [];
    }

    groups[team.ageGroup].push(team);
    return groups;
  }, {});
}

export function getTeamAnnouncements(teamId: string) {
  return teamAnnouncements.filter((announcement) => announcement.teamId === teamId);
}
