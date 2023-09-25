import { Router } from "express"
import { HighlightController } from "@/controllers/highlights.controller"
import { CreateHighlightDto, DesignateHighlightDto, QueryHighlightDto } from "@/dtos/highlights.dto"
import { Routes } from "@interfaces/routes.interface"
import { ValidationMiddleware } from "@middlewares/validation.middleware"
import { AuthMiddleware } from "@/middlewares/auth.middleware"

export class HighlightRoute implements Routes {
  public path = "/highlights"
  public router = Router()
  public highlight = new HighlightController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, [ValidationMiddleware(QueryHighlightDto, true), AuthMiddleware], this.highlight.getHighlights)
    this.router.post(`${this.path}`, [ValidationMiddleware(CreateHighlightDto), AuthMiddleware], this.highlight.create)
    this.router.post(
      `${this.path}/:id(\\d+)`,
      [ValidationMiddleware(DesignateHighlightDto, false, true, true), AuthMiddleware],
      this.highlight.updateDesignation
    )
    this.router.get(`${this.path}/pending`, AuthMiddleware, this.highlight.getPendingHighlights)
  }
}
