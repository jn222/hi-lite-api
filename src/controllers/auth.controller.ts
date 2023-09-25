import { NextFunction, Request, Response } from "express"
import { Container } from "typedi"
import { RequestWithUser } from "@interfaces/auth.interface"
import { User } from "@interfaces/users.interface"
import { AuthService } from "@services/auth.service"

export class AuthController {
  public auth = Container.get(AuthService)

  public authenticate = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).json({ ...req.user })
    } catch (error) {
      next(error)
    }
  }

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.body
      // TODO verify that it's ok with conventions to deliver cookie on signup call
      const { cookie, id, name, email } = await this.auth.signup(userData)

      res.setHeader("Set-Cookie", [cookie])
      res.status(201).json({ id, name, email })
    } catch (error) {
      next(error)
    }
  }

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.body
      const { cookie, id, name, email } = await this.auth.login(userData)

      res.setHeader("Set-Cookie", [cookie])
      res.status(200).json({ id, name, email })
    } catch (error) {
      next(error)
    }
  }

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.user
      await this.auth.logout(userData)

      res.setHeader("Set-Cookie", ["Authorization=; Max-age=0"])
      res.status(200).json({ message: "logout" })
    } catch (error) {
      next(error)
    }
  }
}
