import type { RoleKey } from "@/types/models";

export const INTERNAL_ROLE_KEYS: RoleKey[] = ["super_admin", "club_admin", "coach"];

export function isRoleKey(value: string): value is RoleKey {
  return INTERNAL_ROLE_KEYS.includes(value as RoleKey);
}
