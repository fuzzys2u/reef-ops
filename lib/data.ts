// ---------------------------------------------------------------------------
// Mock data layer. In production these become API calls / DB reads.
// Everything here is sample data for the demo.
// ---------------------------------------------------------------------------

export type Biz = "BIZ_A" | "BIZ_B";
export type BizFilter = "ALL" | Biz;

export type BookingStatus = "confirmed" | "pending" | "completed" | "cancelled";
export type InvoiceStatus = "paid" | "sent" | "draft" | "overdue";
export type XeroState = "synced" | "queued";

export interface Staff {
  id: string;
  name: string;
  role: string;
  biz: Biz;
  rate: number; // AUD / hour
}

export interface Booking {
  ref: string;
  biz: Biz;
  client: string;
  service: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  staff: string; // Staff.id
  pax: number;
  amt: number; // AUD
  status: BookingStatus;
}

export interface Invoice {
  no: string;
  biz: Biz;
  client: string;
  issue: string;
  due: string;
  amt: number;
  status: InvoiceStatus;
  xero: XeroState;
}

export interface PayLine {
  id: string; // Staff.id
  hours: number;
  jobs: number;
}

export interface RevenueMonth {
  m: string;
  BIZ_A: number; // AUD thousands
  BIZ_B: number;
}

export const PALETTE: Record<Biz, [string, string]> = {
  BIZ_A: ["#178a7c", "#0f5e56"],
  BIZ_B: ["#f1623e", "#d94d2b"],
};

export const STAFF: Staff[] = [
  { id: "s1", name: "Hiro Tanaka", role: "Driver / Guide", biz: "BIZ_A", rate: 38 },
  { id: "s2", name: "Sam Whitlock", role: "Driver", biz: "BIZ_A", rate: 34 },
  { id: "s3", name: "Aiko Mori", role: "Guide (JP/EN)", biz: "BIZ_A", rate: 36 },
  { id: "s4", name: "Dave Connor", role: "Driver", biz: "BIZ_A", rate: 34 },
  { id: "s5", name: "Yuki Sato", role: "Cleaner", biz: "BIZ_B", rate: 32 },
  { id: "s6", name: "Mia Roberts", role: "Cleaner", biz: "BIZ_B", rate: 32 },
  { id: "s7", name: "Ken Yamada", role: "Cleaner / Garden", biz: "BIZ_B", rate: 33 },
];

export const STAFF_BY_ID: Record<string, Staff> = Object.fromEntries(
  STAFF.map((s) => [s.id, s]),
);

export const CLIENTS: Record<Biz, string[]> = {
  BIZ_A: ["Coastline Travel", "Summit Tours AU", "Harbour Excursions", "Grand Harbour Hotel", "Riverside Resort", "Direct guest"],
  BIZ_B: ["Bayside Property Mgmt", "Coastal Stays (Airbnb)", "Downtown City Apartments", "Sunset Beach Villas", "Direct client"],
};

export const SERVICES: Record<Biz, string[]> = {
  BIZ_A: ["Airport Transfer", "Charter Tour", "Golf Tour", "Dolphin Cruise Transfer", "Reef Day-Trip Transfer"],
  BIZ_B: ["General Clean", "Bond Clean", "Garden Maintenance", "Airbnb Turnover"],
};

export const SEED_BOOKINGS: Booking[] = [
  { ref: "BIZ_A-1042", biz: "BIZ_A", client: "Coastline Travel", service: "Airport Transfer", date: "2026-06-01", time: "07:15", staff: "s1", pax: 6, amt: 240, status: "confirmed" },
  { ref: "BIZ_B-0231", biz: "BIZ_B", client: "Coastal Stays (Airbnb)", service: "Airbnb Turnover", date: "2026-06-01", time: "10:00", staff: "s5", pax: 2, amt: 160, status: "confirmed" },
  { ref: "BIZ_A-1043", biz: "BIZ_A", client: "Riverside Resort", service: "Charter Tour", date: "2026-06-01", time: "09:00", staff: "s3", pax: 4, amt: 680, status: "completed" },
  { ref: "BIZ_A-1044", biz: "BIZ_A", client: "Summit Tours AU", service: "Reef Day-Trip Transfer", date: "2026-06-02", time: "06:45", staff: "s2", pax: 12, amt: 420, status: "confirmed" },
  { ref: "BIZ_B-0232", biz: "BIZ_B", client: "Bayside Property Mgmt", service: "Bond Clean", date: "2026-06-02", time: "08:30", staff: "s6", pax: 1, amt: 390, status: "pending" },
  { ref: "BIZ_A-1045", biz: "BIZ_A", client: "Grand Harbour Hotel", service: "Golf Tour", date: "2026-06-02", time: "07:30", staff: "s4", pax: 3, amt: 540, status: "confirmed" },
  { ref: "BIZ_B-0233", biz: "BIZ_B", client: "Downtown City Apartments", service: "General Clean", date: "2026-06-03", time: "11:00", staff: "s7", pax: 1, amt: 210, status: "pending" },
  { ref: "BIZ_A-1046", biz: "BIZ_A", client: "Harbour Excursions", service: "Dolphin Cruise Transfer", date: "2026-06-03", time: "08:00", staff: "s1", pax: 8, amt: 300, status: "confirmed" },
  { ref: "BIZ_B-0234", biz: "BIZ_B", client: "Sunset Beach Villas", service: "Garden Maintenance", date: "2026-06-04", time: "09:30", staff: "s7", pax: 1, amt: 180, status: "confirmed" },
  { ref: "BIZ_A-1047", biz: "BIZ_A", client: "Direct guest", service: "Airport Transfer", date: "2026-06-04", time: "14:20", staff: "s2", pax: 2, amt: 120, status: "completed" },
  { ref: "BIZ_B-0235", biz: "BIZ_B", client: "Coastal Stays (Airbnb)", service: "Airbnb Turnover", date: "2026-06-05", time: "10:30", staff: "s5", pax: 3, amt: 240, status: "confirmed" },
  // Ken Yamada (BIZ_B cleaner) helping BIZ_A on a busy day — used to demo cross-business staff conflicts
  { ref: "BIZ_A-1049", biz: "BIZ_A", client: "Direct guest", service: "Airport Transfer", date: "2026-06-02", time: "10:00", staff: "s7", pax: 3, amt: 150, status: "confirmed" },
  { ref: "BIZ_A-1048", biz: "BIZ_A", client: "Coastline Travel", service: "Charter Tour", date: "2026-06-05", time: "08:15", staff: "s3", pax: 5, amt: 720, status: "pending" },
  { ref: "BIZ_A-1041", biz: "BIZ_A", client: "Summit Tours AU", service: "Golf Tour", date: "2026-05-29", time: "07:00", staff: "s4", pax: 4, amt: 560, status: "completed" },
  { ref: "BIZ_B-0230", biz: "BIZ_B", client: "Bayside Property Mgmt", service: "Bond Clean", date: "2026-05-30", time: "09:00", staff: "s6", pax: 1, amt: 410, status: "completed" },
];

export const SEED_INVOICES: Invoice[] = [
  { no: "INV-2041", biz: "BIZ_A", client: "Coastline Travel", issue: "2026-05-28", due: "2026-06-11", amt: 1480, status: "sent", xero: "synced" },
  { no: "INV-2042", biz: "BIZ_A", client: "Summit Tours AU", issue: "2026-05-26", due: "2026-06-09", amt: 980, status: "paid", xero: "synced" },
  { no: "INV-2043", biz: "BIZ_B", client: "Bayside Property Mgmt", issue: "2026-05-20", due: "2026-05-27", amt: 1210, status: "overdue", xero: "synced" },
  { no: "INV-2044", biz: "BIZ_A", client: "Riverside Resort", issue: "2026-05-29", due: "2026-06-12", amt: 2040, status: "sent", xero: "queued" },
  { no: "INV-2045", biz: "BIZ_B", client: "Coastal Stays (Airbnb)", issue: "2026-05-30", due: "2026-06-13", amt: 640, status: "draft", xero: "queued" },
  { no: "INV-2046", biz: "BIZ_A", client: "Harbour Excursions", issue: "2026-05-24", due: "2026-06-07", amt: 900, status: "paid", xero: "synced" },
  { no: "INV-2047", biz: "BIZ_B", client: "Downtown City Apartments", issue: "2026-05-30", due: "2026-06-14", amt: 530, status: "sent", xero: "queued" },
  { no: "INV-2048", biz: "BIZ_B", client: "Sunset Beach Villas", issue: "2026-05-22", due: "2026-05-29", amt: 360, status: "overdue", xero: "synced" },
];

export const PAYROLL: PayLine[] = [
  { id: "s1", hours: 38, jobs: 9 },
  { id: "s2", hours: 32, jobs: 7 },
  { id: "s3", hours: 30, jobs: 6 },
  { id: "s4", hours: 34, jobs: 8 },
  { id: "s5", hours: 36, jobs: 11 },
  { id: "s6", hours: 28, jobs: 6 },
  { id: "s7", hours: 31, jobs: 8 },
];

export const REVENUE: RevenueMonth[] = [
  { m: "Dec", BIZ_A: 42, BIZ_B: 28 },
  { m: "Jan", BIZ_A: 38, BIZ_B: 31 },
  { m: "Feb", BIZ_A: 46, BIZ_B: 33 },
  { m: "Mar", BIZ_A: 51, BIZ_B: 36 },
  { m: "Apr", BIZ_A: 55, BIZ_B: 38 },
  { m: "May", BIZ_A: 58, BIZ_B: 41 },
];

export const WEEK = [
  { dow: "Sun", d: 1 },
  { dow: "Mon", d: 2 },
  { dow: "Tue", d: 3 },
  { dow: "Wed", d: 4 },
  { dow: "Thu", d: 5 },
  { dow: "Fri", d: 6 },
  { dow: "Sat", d: 7 },
];

// service → duration in minutes. BIZ_A jobs run ~2h, BIZ_B cleans ~1.5h.
// Anything not listed falls back to 90 minutes.
export const SERVICE_DURATIONS: Record<string, number> = {
  "Airport Transfer": 120,
  "Charter Tour": 120,
  "Golf Tour": 120,
  "Dolphin Cruise Transfer": 120,
  "Reef Day-Trip Transfer": 120,
  "General Clean": 90,
  "Bond Clean": 90,
  "Garden Maintenance": 90,
  "Airbnb Turnover": 90,
};

export const durationMinutes = (service: string) => SERVICE_DURATIONS[service] ?? 90;

// minutes since midnight for an "HH:mm" string
const toMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

// Returns the first existing booking that clashes with `candidate` — same staff,
// same date, and overlapping time window (start … start + duration). Cancelled
// bookings are ignored. Returns null when there is no conflict.
export const hasStaffConflict = (
  bookings: Booking[],
  candidate: Pick<Booking, "staff" | "date" | "time" | "service">,
): Booking | null => {
  const cStart = toMinutes(candidate.time);
  const cEnd = cStart + durationMinutes(candidate.service);
  for (const b of bookings) {
    if (b.status === "cancelled") continue;
    if (b.staff !== candidate.staff || b.date !== candidate.date) continue;
    const bStart = toMinutes(b.time);
    const bEnd = bStart + durationMinutes(b.service);
    if (cStart < bEnd && bStart < cEnd) return b;
  }
  return null;
};

// ---- helpers ----
export const fmt = (n: number) => "$" + n.toLocaleString("en-AU");
export const initials = (name: string) =>
  name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
export const inBiz = (item: { biz: Biz }, filter: BizFilter) =>
  filter === "ALL" || item.biz === filter;
