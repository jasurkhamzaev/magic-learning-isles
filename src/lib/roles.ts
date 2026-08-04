export type AppRole = "superadmin" | "manager" | "teacher" | "parent" | "student";

export const ALL_ROLES: AppRole[] = ["superadmin", "manager", "teacher", "parent", "student"];

/** Rollar foydalanuvchi o'zi tanlab olishi mumkin bo'lganlari (ro'yxatdan o'tishda). */
export const SIGNUP_ROLES: AppRole[] = ["student", "teacher", "parent"];

export const ROLE_LABEL: Record<AppRole, string> = {
  superadmin: "Superadmin",
  manager: "Manager",
  teacher: "Ustoz",
  parent: "Ota-ona",
  student: "O'quvchi",
};

export const ROLE_EMOJI: Record<AppRole, string> = {
  superadmin: "👑",
  manager: "🛡️",
  teacher: "🎓",
  parent: "👨‍👩‍👧",
  student: "🧑‍🚀",
};

export const ROLE_DESC: Record<AppRole, string> = {
  superadmin: "Platformaning to'liq boshqaruvi, rollarni tayinlash",
  manager: "O'quvchilar, kontent va statistikani boshqarish",
  teacher: "Darslar, testlar va o'quvchilar natijalari",
  parent: "Farzand natijalarini kuzatish",
  student: "Orollar bo'ylab o'qish, XP va mukofotlar",
};

export const STAFF_ROLES: AppRole[] = ["superadmin", "manager"];

export function isStaff(roles: AppRole[]) {
  return roles.some((r) => STAFF_ROLES.includes(r));
}

export function primaryRole(roles: AppRole[]): AppRole {
  for (const r of ALL_ROLES) if (roles.includes(r)) return r;
  return "student";
}
