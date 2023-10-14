import { RequestWithUser } from "@/interfaces/auth.interface"
import { User } from "@/interfaces/users.interface"
import { NextFunction, Response } from "express"

const id = 1
const email = "user@test.com"
const password = "password"
const name = "User"
export const defaultUser = {
  id,
  email,
  password,
  name
}
export const mockUser = (user?: Partial<User>) => ({
  email: user?.email || email,
  password: user?.password || password,
  name: user?.name || name,
  id: user?.id || id
})

export const mockRequest = (req?: Partial<RequestWithUser>): RequestWithUser => {
  const { body, user, params, cookies, header } = req || {}
  return {
    body,
    user,
    params,
    cookies: cookies || {},
    header: header || jest.fn()
  } as unknown as RequestWithUser
}

export const mockResponse = (): Response =>
  ({
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    setHeader: jest.fn()
  } as unknown as Response)

export const mockNext = (): NextFunction => jest.fn()
