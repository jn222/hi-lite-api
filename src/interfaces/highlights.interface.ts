export const HighlightType: {
  day: "day"
  week: "week"
  month: "month"
  year: "year"
} = {
  day: "day",
  week: "week",
  month: "month",
  year: "year"
}

export type HighlightType = (typeof HighlightType)[keyof typeof HighlightType] | null

export interface Highlight {
  id?: number
  userid?: number
  createdAt?: string
  content: string
  designation?: HighlightType[]
}

export interface GetHighlightQuery {
  designations?: string
  start?: string
  end?: string
}

export interface GetPendingHighlightsQuery {
  timezone: string
}
