import { NextFunction, Response } from "express"
import { verify } from "jsonwebtoken"
import { SECRET_KEY } from "@config"
import { HttpException } from "@exceptions/HttpException"
import { DataStoredInToken, RequestWithUser } from "@interfaces/auth.interface"
import prisma from "@/db"

const getAuthorization = (req: RequestWithUser) => {
  const cookie = req.cookies["Authorization"]
  if (cookie) return cookie

  const header = req.header("Authorization")
  if (header) return header.split("Bearer ")[1]

  return null
}

export const AuthMiddleware = async (req: RequestWithUser, _res: Response, next: NextFunction) => {
  try {
    const Authorization = getAuthorization(req)

    if (Authorization) {
      const { id } = verify(Authorization, SECRET_KEY) as DataStoredInToken
      const user = prisma.user
      const findUser = await user.findUnique({ where: { id: Number(id) } })

      if (findUser) {
        req.user = findUser
        next()
      } else {
        next(new HttpException(401, "Wrong authentication token"))
      }
    } else {
      next(new HttpException(404, "Authentication token missing"))
    }
  } catch (error) {
    next(new HttpException(401, "Wrong authentication token"))
  }
}
