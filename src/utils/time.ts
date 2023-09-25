import dayjs from "dayjs"

// TODO Move to types file?
interface Range {
  start: string
  end: string
}
export type TimeUnit = "day" | "week" | "month" | "year"

/**
 * Returns ISO start/end of a date in relation to a given time unit.
 * Uses previous unit (i.e. yesterday, last month, etc.) if no date is provided
 */
export const range = (unit: TimeUnit, date?: string): Range => {
  const start = dayjs(date || dayjs().subtract(1, unit).toISOString())
  return {
    start: start.startOf(unit).toISOString(),
    end: start.endOf(unit).toISOString()
  }
}
