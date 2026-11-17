import assert from "node:assert/strict";
import { test } from "node:test";
import { formatSessionTime, formatWorkshopDay, getUpcomingWorkshopDays, workshop } from "./workshops";

test("offers the upcoming Saturday and Sunday across a year boundary", () => {
  assert.deepEqual(getUpcomingWorkshopDays(new Date("2026-12-31T12:00:00Z")), ["2027-01-02", "2027-01-03"]);
  assert.equal(formatWorkshopDay("2027-01-02"), "Saturday, 2 January 2027");
});

test("rolls the current day forward when the first workshop starts in Karachi", () => {
  assert.deepEqual(getUpcomingWorkshopDays(new Date("2026-11-21T08:59:59Z")), ["2026-11-21", "2026-11-22"]);
  assert.deepEqual(getUpcomingWorkshopDays(new Date("2026-11-21T09:00:00Z")), ["2026-11-22", "2026-11-28"]);
  assert.deepEqual(getUpcomingWorkshopDays(new Date("2026-11-22T09:00:00Z")), ["2026-11-28", "2026-11-29"]);
  assert.equal(formatSessionTime(workshop.sessions[0]), "2:00 pm – 3:00 pm");
});
