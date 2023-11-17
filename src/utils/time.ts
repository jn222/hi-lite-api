import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"

dayjs.extend(timezone)
dayjs.extend(utc)

interface Range {
  start: string
  end: string
}
export type TimeUnit = "day" | "week" | "month" | "year"

/**
 * Returns ISO start/end of a date in relation to a given time unit, in specified timezone.
 * Uses previous unit (i.e. yesterday, last month, etc.) if no date is provided
 */
export const range = (unit: TimeUnit, timezone: string, date?: string): Range => {
  const start = dayjs(date || dayjs().subtract(1, unit).toISOString()).tz(timezone)
  return {
    start: start.startOf(unit).toISOString(),
    end: start.endOf(unit).toISOString()
  }
}
