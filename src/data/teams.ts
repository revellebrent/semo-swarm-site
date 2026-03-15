import type { Team } from "@/types/site";

const teamData: Team[] = [
  {
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
    coaches: [
      {
        id: "coach-elena-brooks",
        name: "Elena Brooks",
        role: "Head Coach",
        specialty: "Attacking patterns and confidence in possession",
        bio:
          "Elena creates a demanding but positive environment that helps younger players build confidence on the ball while learning how to compete together.",
        license: "United Soccer Coaches Premier Diploma",
        email: "elena@semoswarmfc.com",
      },
      {
        id: "coach-lena-frost",
        name: "Lena Frost",
        role: "Assistant Coach",
        specialty: "Technical repetition and transition play",
        bio:
          "Lena supports player development with detail-focused technical work and clear matchday communication for families.",
        license: "USSF Grassroots Certified",
      },
    ],
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
    announcements: [
      {
        id: "u11-a1",
        title: "Parent information night scheduled before opening weekend",
        date: "August 12",
        category: "Team Update",
        summary:
          "Families will receive season expectations, sideline standards, and communication guidelines before the first match block.",
      },
      {
        id: "u11-a2",
        title: "Extra ball mastery session added for academy players",
        date: "August 26",
        category: "Development",
        summary:
          "Optional Friday technical sessions will focus on first touch, turning, and receiving under light pressure.",
      },
    ],
    tryoutCallout: {
      title: "Still exploring the U11 pathway?",
      description:
        "Families interested in academy placement can request an upcoming evaluation date or ask about supplemental training options.",
      href: "/tryouts",
      ctaLabel: "View Tryout Options",
    },
    homeBase: "Cape Girardeau SportsPlex",
    seasonGoals: [
      "Build confidence receiving under pressure",
      "Introduce attacking principles in wide spaces",
      "Strengthen competitive match habits",
    ],
  },
  {
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
    coaches: [
      {
        id: "coach-jordan-ellis",
        name: "Jordan Ellis",
        role: "Head Coach",
        specialty: "Pressing structure and transition play",
        bio:
          "Jordan trains players to react quickly, read cues earlier, and compete with intensity in every phase of the game.",
        license: "USSF C License",
        email: "jordan@semoswarmfc.com",
      },
      {
        id: "coach-owen-ward",
        name: "Owen Ward",
        role: "Assistant Coach",
        specialty: "Buildout patterns and midfield spacing",
        bio:
          "Owen helps connect video review, positional detail, and training design so players understand the why behind each team habit.",
        license: "United Soccer Coaches Advanced National",
      },
    ],
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
    announcements: [
      {
        id: "u13-a1",
        title: "Video review added after Sunday showcase fixtures",
        date: "September 2",
        category: "Match Analysis",
        summary:
          "Players will review pressing distances, body shape in reception, and decision speed during the next team meeting.",
      },
      {
        id: "u13-a2",
        title: "Travel details released for late-September tournament",
        date: "September 10",
        category: "Travel",
        summary:
          "Families will receive hotel blocks, arrival windows, and roster logistics for the upcoming regional event.",
      },
    ],
    tryoutCallout: {
      title: "Interested in premier-level competition?",
      description:
        "We welcome inquiries from committed players looking for a faster game model and a demanding training environment.",
      href: "/tryouts",
      ctaLabel: "Request Evaluation Info",
    },
    homeBase: "Shawnee Park Complex",
    seasonGoals: [
      "Improve buildout patterns from the back",
      "Develop coordinated team pressing triggers",
      "Raise physical readiness for tournament play",
    ],
  },
  {
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
    coaches: [
      {
        id: "coach-mason-carter",
        name: "Mason Carter",
        role: "Technical Director / Lead Coach",
        specialty: "Positional play and player development planning",
        bio:
          "Mason supports the team with tactical frameworks, individual development targets, and a club-wide lens on long-term progression.",
        license: "USSF B License",
        email: "mason@semoswarmfc.com",
      },
      {
        id: "coach-elena-brooks-u15",
        name: "Elena Brooks",
        role: "Head Coach",
        specialty: "Attacking patterns and competitive mentality",
        bio:
          "Elena drives a fast, demanding training standard and helps the group translate structure into confident matchday play.",
        license: "United Soccer Coaches Premier Diploma",
      },
    ],
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
    announcements: [
      {
        id: "u15-a1",
        title: "Leadership group selected for fall competition block",
        date: "August 18",
        category: "Team Culture",
        summary:
          "Captains and leadership representatives will help support communication, matchday focus, and training standards.",
      },
      {
        id: "u15-a2",
        title: "Attacking unit clinic scheduled ahead of conference opener",
        date: "August 30",
        category: "Performance",
        summary:
          "The staff will run an extra finishing and final-third timing session ahead of the season's opening stretch.",
      },
    ],
    tryoutCallout: {
      title: "Looking for a higher-level girls environment?",
      description:
        "Players interested in the premier track can reach out for placement guidance, training standards, and evaluation options.",
      href: "/tryouts",
      ctaLabel: "See Tryout Pathway",
    },
    homeBase: "Semo Training Grounds",
    seasonGoals: [
      "Create more chances through central overloads",
      "Refine transition defending after turnovers",
      "Develop leadership across the spine of the team",
    ],
  },
];

export function getAllTeams() {
  return teamData;
}

export function getTeamBySlug(slug: string) {
  return teamData.find((team) => team.slug === slug);
}

export function getTeamsGroupedByAgeGroup() {
  return teamData.reduce<Record<string, Team[]>>((groups, team) => {
    if (!groups[team.ageGroup]) {
      groups[team.ageGroup] = [];
    }

    groups[team.ageGroup].push(team);
    return groups;
  }, {});
}
