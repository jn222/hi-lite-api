import { Service } from "typedi"
import { CreateHighlightDto } from "@/dtos/highlights.dto"
import { Highlight, HighlightType } from "@/interfaces/highlights.interface"
import { range } from "@/utils/time"
import prisma from "@/db"

@Service()
export class HighlightService {
  public async getHighlights(userid: number, designations?: HighlightType[], start?: string, end?: string): Promise<Highlight[]> {
    const highlights = await prisma.highlight.findMany({
      where: {
        userid,
        created_at: {
          gte: start,
          lte: end
        },
        designation: {
          some: {
            type: {
              in: designations
            }
          }
        }
      },
      include: {
        designation: {
          select: {
            type: true
          }
        }
      }
      // take: itemsPerPage,
      // skip: offset,
    })
    // TODO reducer and proper typing
    return highlights.map(highlight => ({
      ...highlight,
      designation: highlight.designation.map(designation => designation.type)
    }))
  }

  public async create(highlight: CreateHighlightDto): Promise<Highlight> {
    const createUserData: Highlight = await prisma.highlight.create({ data: highlight })
    return createUserData
  }

  public async designate(id: number, type: HighlightType): Promise<void> {
    await prisma.designation.create({ data: { id, type } })
  }

  //   TODO put autoassignments in cron job
  public async getPendingHighlights(userid: number): Promise<{ highlights: Highlight[]; designation?: HighlightType }> {
    const checkPendingRange = async (timeRange: HighlightType) => {
      const { start, end } = range(timeRange)
      const highlights = await this.getHighlights(userid, undefined, start, end)
      if (highlights.length && !highlights.filter(highlight => highlight.designation.includes(timeRange)).length) {
        if (highlights.length === 1) {
          await prisma.designation.create({ data: { id: highlights[0].id, type: timeRange } })
        } else {
          return highlights
        }
      }
      return undefined
    }
    const types: HighlightType[] = ["day", "week", "month", "year"]
    let highlights
    for (let i = 0; i < types.length; i++) {
      const designation = types[i]
      highlights = await checkPendingRange(designation)
      if (highlights) return { highlights, designation }
    }
    return { highlights: [] }
  }
}
