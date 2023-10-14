/* eslint-disable @typescript-eslint/ban-ts-comment */
import { mockNext, mockRequest, mockResponse, mockUser } from "@/test/mocks"
import { AuthMiddleware } from "./auth.middleware"
import { HttpException } from "@/exceptions/HttpException"
import { prismaMock } from "@/test/singleton"
// TODO export default instead of export const

let res, next
const user = mockUser()

describe("AuthMiddleware", () => {
  beforeAll(() => {
    res = mockResponse()
    next = mockNext()
    jest.mock("jsonwebtoken", () => ({
      __esModule: true,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      default: (_auth: string, _secretKey: string) => ({ id: "userId" })
    }))
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  it("returns 404 error if authentication token is missing", async () => {
    await AuthMiddleware(mockRequest(), res, next)
    expect(next).toBeCalledWith(new HttpException(404, "Authentication token missing"))
  })
  it("returns 401 error if authentication token is incorrect", async () => {
    //@ts-ignore
    prismaMock.user.findUnique.mockResolvedValue(undefined)
    await AuthMiddleware(mockRequest({ cookies: { Authorization: "abcd" } }), res, next)
    expect(next).toBeCalledWith(new HttpException(401, "Wrong authentication token"))
  })
  it("fills in user field for request if user is present", async () => {
    const req = mockRequest({ cookies: { Authorization: "abcd" } })
    //@ts-ignore
    prismaMock.user.findUnique.mockResolvedValue(user)
    await AuthMiddleware(req, res, next)
    expect(req.user).toEqual(user)
  })
})
