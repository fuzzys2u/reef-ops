// ---------------------------------------------------------------------------
// Bilingual dictionary (English / Japanese).
// Components read `dict[lang]` for static UI strings, and the *Label maps
// for domain values (services, statuses, roles, dates).
// To add a string: add the key to BOTH `en` and `ja`.
// ---------------------------------------------------------------------------

export type Lang = "en" | "ja";

const en = {
  // sidebar / nav
  workspace: "Workspace",
  nav_dashboard: "Dashboard",
  nav_bookings: "Bookings",
  nav_roster: "Roster",
  nav_billing: "Billing",
  nav_payroll: "Payroll",
  xero_connected: "Connected",
  xero_meta: "Invoices & payroll sync to your XERO org · last sync 8 min ago",
  role_admin: "Operations Admin",

  // topbar
  sw_all: "All businesses",
  sw_pdc: "BIZ_A · Tours",
  sw_jqc: "Cleaning",
  search_ph: "Search bookings, clients, staff…",
  new_booking: "New booking",

  // shared
  export: "Export",
  th_ref: "Ref",
  th_client: "Client",
  th_service: "Service",
  th_date: "Date",
  th_staff: "Staff",
  th_amount: "Amount",
  th_status: "Status",
  pax: "pax",
  units: "unit(s)",
  unassigned: "Unassigned",

  // dashboard
  greeting: "Good morning, Taro",
  demo_flag: "Live demo · sample data",
  date_line: "Saturday, 31 May · QLD",
  kpi_jobs_today: "Jobs today",
  kpi_staff_on_duty: "Staff on duty",
  kpi_outstanding: "Outstanding invoices",
  kpi_revenue_month: "Revenue this month",
  since_yesterday: "vs yesterday",
  since_covered: "fully covered",
  since_chase: "needs chase",
  since_apr: "vs Apr",
  tv_overdue: "2 overdue",
  rev_title: "Revenue — last 6 months",
  rev_hint: "AUD · invoiced",
  legend_pdc: "BIZ_A · Tours & Transfers",
  legend_jqc: "Cleaning Services",
  today_schedule: "Today's schedule",
  full_roster: "Full roster →",
  recent_bookings: "Recent bookings",
  view_all: "View all →",

  // bookings
  bk_title: "Bookings",
  bk_sub: "One intake for travel agents, hotels and cleaning clients — replaces the separate Excel & Access sheets.",
  new_job_booking: "New job booking",
  new_job_desc: "Add a job in seconds. It flows straight into the roster and billing.",
  f_business: "Business",
  f_client: "Client",
  f_service: "Service",
  f_date: "Date",
  f_time: "Time",
  f_location: "Location / route",
  f_loc_ph: "e.g. City Airport → Grand Harbour Hotel",
  f_pax: "Pax / units",
  f_amount: "Amount (AUD)",
  f_assign: "Assign staff",
  create_booking: "Create booking",
  chip_all: "All",
  chip_confirmed: "Confirmed",
  chip_pending: "Pending",
  chip_completed: "Completed",
  no_match: "No bookings match this filter.",
  conflict_title: "Staff double-booking",
  conflict_body: "This staff member already has {service} ({client}) at {time}. Continue anyway?",
  conflict_confirm: "Create anyway",
  conflict_cancel: "Cancel",
  err_location: "Enter a location or route.",
  err_pax: "Pax / units must be at least 1.",
  err_amount: "Amount must be greater than 0.",
  err_date: "Pick a date.",

  // roster
  ro_title: "Roster",
  ro_sub: "Week of 1–7 June 2026 · who's on which job at a glance. Conflicts flagged automatically.",
  prev_week: "Prev week",
  next_week: "Next week",
  assign: "+ assign",

  // billing
  bi_title: "Billing",
  bi_sub: "Confirm what each travel agent, hotel and cleaning client owes — then push to XERO in one click.",
  sync_all: "Sync all to XERO",
  sum_total: "Total invoiced",
  sum_paid: "Paid",
  sum_outstanding: "Outstanding",
  sum_overdue: "Overdue",
  invoices: "Invoices",
  grouped_by: "Grouped by client · this month",
  th_invoice: "Invoice",
  th_issued: "Issued",
  th_due: "Due",
  th_xero: "XERO",
  queued: "queued",

  // payroll
  pa_title: "Payroll",
  pa_sub: "Hours roll up straight from completed roster jobs — ready to run through XERO Payroll.",
  export_timesheet: "Export timesheet",
  note_title: "Calculated from completed jobs — no double entry",
  note_body: "Each finished roster job adds its hours here automatically. Pay-run lines export to XERO Payroll for STP-compliant lodgement.",
  payrun_title: "Pay run · 26 May – 1 Jun 2026",
  gross_aud: "Gross, AUD",
  th_business: "Business",
  th_jobs_done: "Jobs done",
  th_hours: "Hours",
  th_rate: "Rate",
  th_gross: "Gross pay",
  total_gross: "Total gross pay run",
};

const ja: typeof en = {
  // sidebar / nav
  workspace: "ワークスペース",
  nav_dashboard: "ダッシュボード",
  nav_bookings: "予約",
  nav_roster: "ロスター",
  nav_billing: "請求",
  nav_payroll: "給与",
  xero_connected: "接続済み",
  xero_meta: "請求・給与を御社のQLD XERO に同期 · 最終同期 8分前",
  role_admin: "オペレーション管理者",

  // topbar
  sw_all: "全事業",
  sw_pdc: "BIZ_A・ツアー",
  sw_jqc: "クリーニング",
  search_ph: "予約・クライアント・スタッフを検索…",
  new_booking: "新規予約",

  // shared
  export: "エクスポート",
  th_ref: "番号",
  th_client: "クライアント",
  th_service: "サービス",
  th_date: "日付",
  th_staff: "担当",
  th_amount: "金額",
  th_status: "状態",
  pax: "名",
  units: "件",
  unassigned: "未割当",

  // dashboard
  greeting: "おはようございます、太郎さん",
  demo_flag: "デモ · サンプルデータ",
  date_line: "5月31日(土) · QLD",
  kpi_jobs_today: "本日の業務",
  kpi_staff_on_duty: "稼働スタッフ",
  kpi_outstanding: "未収請求",
  kpi_revenue_month: "今月の売上",
  since_yesterday: "前日比",
  since_covered: "全員カバー",
  since_chase: "要督促",
  since_apr: "4月比",
  tv_overdue: "2件 期限超過",
  rev_title: "売上 — 直近6ヶ月",
  rev_hint: "AUD · 請求ベース",
  legend_pdc: "BIZ_A · 送迎・ツアー",
  legend_jqc: "Cleaning Services",
  today_schedule: "本日のスケジュール",
  full_roster: "ロスター全体 →",
  recent_bookings: "最近の予約",
  view_all: "すべて表示 →",

  // bookings
  bk_title: "予約",
  bk_sub: "旅行会社・ホテル・清掃クライアントを同じ入口で登録。分かれていた Excel と Access を1つに集約します。",
  new_job_booking: "新規ジョブ予約",
  new_job_desc: "数秒で登録。そのままロスターと請求に反映されます。",
  f_business: "事業",
  f_client: "クライアント",
  f_service: "サービス",
  f_date: "日付",
  f_time: "時刻",
  f_location: "場所 / ルート",
  f_loc_ph: "例：市内空港 → Grand Harbour Hotel",
  f_pax: "人数 / 件数",
  f_amount: "金額 (AUD)",
  f_assign: "担当スタッフ",
  create_booking: "予約を作成",
  chip_all: "すべて",
  chip_confirmed: "確定",
  chip_pending: "保留",
  chip_completed: "完了",
  no_match: "条件に一致する予約はありません。",
  conflict_title: "スタッフの重複割当",
  conflict_body: "このスタッフは {time} に {service}（{client}）と重複します。続行しますか？",
  conflict_confirm: "続行して作成",
  conflict_cancel: "キャンセル",
  err_location: "場所 / ルートを入力してください。",
  err_pax: "人数 / 件数は1以上にしてください。",
  err_amount: "金額は0より大きくしてください。",
  err_date: "日付を選択してください。",

  // roster
  ro_title: "ロスター",
  ro_sub: "2026年6月1〜7日の週 · 誰がどのジョブかを一覧。重複は自動で警告します。",
  prev_week: "前の週",
  next_week: "次の週",
  assign: "+ 割当",

  // billing
  bi_title: "請求",
  bi_sub: "旅行会社・ホテル・清掃クライアントごとの請求額を確認し、ワンクリックで XERO へ。",
  sync_all: "すべて XERO に同期",
  sum_total: "請求合計",
  sum_paid: "入金済",
  sum_outstanding: "未収",
  sum_overdue: "期限超過",
  invoices: "請求書",
  grouped_by: "クライアント別 · 今月",
  th_invoice: "請求番号",
  th_issued: "発行日",
  th_due: "期日",
  th_xero: "XERO",
  queued: "待機中",

  // payroll
  pa_title: "給与",
  pa_sub: "完了したロスターのジョブから労働時間を自動集計。XERO Payroll でそのまま処理できます。",
  export_timesheet: "勤怠をエクスポート",
  note_title: "完了ジョブから自動計算 — 二重入力なし",
  note_body: "完了したロスターのジョブの時間がここに自動加算されます。給与明細は STP 準拠で XERO Payroll に連携します。",
  payrun_title: "給与計算 · 2026年5月26日〜6月1日",
  gross_aud: "総支給, AUD",
  th_business: "事業",
  th_jobs_done: "完了ジョブ",
  th_hours: "時間",
  th_rate: "時給",
  th_gross: "総支給額",
  total_gross: "総支給合計",
};

export const dict: Record<Lang, typeof en> = { en, ja };

// ---- domain value maps ----
export const serviceLabel: Record<Lang, Record<string, string>> = {
  en: {},
  ja: {
    "Airport Transfer": "空港送迎",
    "Charter Tour": "チャーターツアー",
    "Golf Tour": "ゴルフツアー",
    "Dolphin Cruise Transfer": "ドルフィンクルーズ送迎",
    "Reef Day-Trip Transfer": "リーフ日帰り送迎",
    "General Clean": "通常清掃",
    "Bond Clean": "ボンドクリーニング",
    "Garden Maintenance": "庭メンテナンス",
    "Airbnb Turnover": "Airbnb 清掃",
  },
};

export const statusLabel: Record<Lang, Record<string, string>> = {
  en: {
    confirmed: "Confirmed", pending: "Pending", completed: "Completed", cancelled: "Cancelled",
    paid: "Paid", sent: "Sent", draft: "Draft", overdue: "Overdue",
  },
  ja: {
    confirmed: "確定", pending: "保留", completed: "完了", cancelled: "キャンセル",
    paid: "入金済", sent: "送付済", draft: "下書き", overdue: "期限超過",
  },
};

export const roleLabel: Record<Lang, Record<string, string>> = {
  en: {},
  ja: {
    "Driver / Guide": "ドライバー / ガイド",
    "Driver": "ドライバー",
    "Guide (JP/EN)": "ガイド(日英)",
    "Cleaner": "クリーナー",
    "Cleaner / Garden": "クリーナー / 庭",
  },
};

export const dowLabel: Record<Lang, Record<string, string>> = {
  en: {},
  ja: { Sun: "日", Mon: "月", Tue: "火", Wed: "水", Thu: "木", Fri: "金", Sat: "土" },
};

export const monthLabel: Record<Lang, Record<string, string>> = {
  en: {},
  ja: { Dec: "12月", Jan: "1月", Feb: "2月", Mar: "3月", Apr: "4月", May: "5月", Jun: "6月" },
};

// translate helpers: fall back to the raw value when no mapping exists
export const tService = (lang: Lang, v: string) => serviceLabel[lang][v] ?? v;
export const tStatus = (lang: Lang, v: string) => statusLabel[lang][v] ?? v;
export const tRole = (lang: Lang, v: string) => roleLabel[lang][v] ?? v;
export const tDow = (lang: Lang, v: string) => dowLabel[lang][v] ?? v;
export const tMonth = (lang: Lang, v: string) => monthLabel[lang][v] ?? v;
