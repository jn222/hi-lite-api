import { NextFunction, Response } from "express"
import { Container } from "typedi"
import { GetHighlightQuery, Highlight, HighlightType } from "@/interfaces/highlights.interface"
import { HighlightService } from "@/services/highlights.service"
import { RequestWithUser } from "@/interfaces/auth.interface"

export class HighlightController {
  public highlight = Container.get(HighlightService)

  public getHighlights = async (req: RequestWithUser<{}, {}, {}, GetHighlightQuery>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user.id
      const { designations, start, end } = req.query
      // TODO Find a better way to parse this out
      const highlights: Highlight[] = await this.highlight.getHighlights(userId, designations?.split(",") as HighlightType[] | undefined, start, end)

      res.status(200).json(highlights)
    } catch (error) {
      next(error)
    }
  }

  public create = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const highlightData: Highlight = req.body
      highlightData.userid = req.user.id
      const createHighlightData: Highlight = await this.highlight.create(highlightData)

      res.status(201).json(createHighlightData)
    } catch (error) {
      next(error)
    }
  }

  public updateDesignation = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Number(req.params.id)
      const designation: HighlightType = req.body.designation
      await this.highlight.designate(id, designation)

      res.status(200).json({ message: "updated" })
    } catch (error) {
      next(error)
    }
  }

  public getPendingHighlights = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user.id
      const highlights: { highlights: Highlight[]; designation?: HighlightType } = await this.highlight.getPendingHighlights(userId)
      res.status(200).json(highlights)
    } catch (error) {
      next(error)
    }
  }
}
