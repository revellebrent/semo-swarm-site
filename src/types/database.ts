export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      announcements: {
        Row: {
          id: string;
          title: string;
          slug: string | null;
          category: string | null;
          summary: string;
          body: string | null;
          scope: "club" | "team";
          team_id: string | null;
          author_profile_id: string | null;
          is_published: boolean;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      coach_team_assignments: {
        Row: {
          id: string;
          coach_id: string;
          team_id: string;
          assignment_role: string;
          is_primary: boolean;
          created_at: string;
        };
      };
      coaches: {
        Row: {
          id: string;
          profile_id: string;
          role_title: string;
          specialty: string | null;
          bio: string | null;
          license: string | null;
          email: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
      };
      sponsors: {
        Row: {
          id: string;
          name: string;
          slug: string | null;
          category: string | null;
          tier: string | null;
          description: string | null;
          website_url: string | null;
          contact_name: string | null;
          contact_email: string | null;
          contact_phone: string | null;
          logo_url: string | null;
          is_active: boolean;
          is_public: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
      };
      teams: {
        Row: {
          id: string;
          slug: string;
          name: string;
          age_group: string;
          level: string;
          gender: "Girls" | "Boys" | "Coed";
          focus: string | null;
          summary: string | null;
          overview: string | null;
          player_profile: string | null;
          home_base: string | null;
          season: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
      };
      tryouts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          age_group: string;
          format: "club_wide" | "coach_independent";
          description: string | null;
          season: string | null;
          location: string | null;
          start_date: string | null;
          end_date: string | null;
          registration_label: string | null;
          registration_href: string | null;
          status: "draft" | "open" | "closed";
          team_id: string | null;
          owner_coach_id: string | null;
          owner_profile_id: string | null;
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
