export const WORKSHOP_PATH = "/workshops";
export const WORKSHOP_EMAIL = "info@pakish.org";
export const WORKSHOP_PHONE = "0300-8222456";
export const WORKSHOP_WHATSAPP = `https://wa.me/92${WORKSHOP_PHONE.replace(/\D/g, "").slice(1)}`;

export const workshop = {
  id: "gulshan-free-workshops",
  title: "Free Weekend Workshops",
  venue: "Gulshan-e-Iqbal Campus",
  address: "Main University Road, Karachi",
  timeZone: "Asia/Karachi",
  weekdays: [6, 0],
  sessions: [
    { id: "ai", title: "AI & Smart Tools for Everyday Life, Study and Work", start: "14:00", end: "15:00" },
    { id: "english", title: "English Speaking & Communication", start: "15:15", end: "16:15" },
    { id: "nlp", title: "NLP Foundations & Communication Skills", start: "16:30", end: "17:30" },
  ],
};

export const participantCategories = [
  "Student",
  "Employee / Company Representative",
  "Homemaker / Not currently employed",
] as const;

export const aiExperienceLevels = ["First time", "Beginner", "Basic", "Regular user"] as const;
export const devices = ["Smartphone", "Laptop", "Both", "Neither"] as const;

export const workshopConsent =
  "I agree that Pakish Institute may contact me about this workshop and related learning opportunities. I understand that registration is free and seats are subject to confirmation.";

const calendar = new Intl.DateTimeFormat("en-CA", {
  timeZone: workshop.timeZone,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

const dayLabel = new Intl.DateTimeFormat("en-GB", {
  timeZone: "UTC",
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const timeLabel = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

export function formatWorkshopDay(date: string) {
  return dayLabel.format(new Date(date));
}

export function formatSessionTime(session: (typeof workshop.sessions)[number]) {
  const format = (time: string) => timeLabel.format(new Date(`2000-01-01T${time}:00Z`)).toLowerCase();
  return `${format(session.start)} – ${format(session.end)}`;
}

export function getUpcomingWorkshopDays(now = new Date()) {
  const local = Object.fromEntries(calendar.formatToParts(now).map(({ type, value }) => [type, value]));
  const today = new Date(Date.UTC(Number(local.year), Number(local.month) - 1, Number(local.day)));
  const firstSession = workshop.sessions.map(({ start }) => start).sort()[0];
  const todayHasStarted = `${local.hour}:${local.minute}` >= firstSession;

  return workshop.weekdays.map((weekday) => {
    let offset = (weekday - today.getUTCDay() + 7) % 7;
    if (offset === 0 && todayHasStarted) offset = 7;
    const date = new Date(today);
    date.setUTCDate(date.getUTCDate() + offset);
    return date.toISOString().slice(0, 10);
  }).sort();
}
