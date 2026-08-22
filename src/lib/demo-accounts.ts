/** Demo hisoblar uchun umumiy (klient va server) yordamchilar. */

export const DEMO_EMAIL_DOMAIN = "demo.hashimjon.uz";

/** Barcha demo o'quvchilar uchun bir xil vaqtinchalik parol (faqat demo maqsadida). */
export const DEMO_PASSWORD = "Demo2026!";

/** "Ali Karimov" -> "ali.karimov@demo.hashimjon.uz" */
export function demoEmailFromName(fullName: string) {
  const slug = fullName
    .toLowerCase()
    .replace(/[''`ʻ’]/g, "")
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.+|\.+$/g, "");
  return `${slug || "demo"}@${DEMO_EMAIL_DOMAIN}`;
}

export type DemoAccount = {
  fullName: string;
  email: string;
  password: string;
  exists: boolean;
};
