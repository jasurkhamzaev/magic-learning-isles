export type LeaderboardEntry = {
  rank: number;
  name: string;
  island: string;
  xp: number;
  stars: number;
  streak: number;
  avatar: string;
};

export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Amina Karimova", island: "Kelajak", xp: 12480, stars: 342, streak: 45, avatar: "👑" },
  { rank: 2, name: "Bekzod Yusupov", island: "Kelajak", xp: 11920, stars: 318, streak: 38, avatar: "🚀" },
  { rank: 3, name: "Dilnoza Rasulova", island: "Kashfiyot", xp: 10850, stars: 295, streak: 42, avatar: "🔬" },
  { rank: 4, name: "Sardor Alimov", island: "Kashfiyot", xp: 9640, stars: 271, streak: 29, avatar: "🧪" },
  { rank: 5, name: "Malika Nazarova", island: "Quvonch", xp: 8920, stars: 258, streak: 33, avatar: "🌈" },
];
