import Container from "typedi"
import AuthController from "./auth.controller"
import { mockUser, mockNext, mockRequest, mockResponse } from "@/test/mocks"
import { AuthService } from "@/services/auth.service"

let controller: AuthController
const user = mockUser()
let res, next
const authService = new AuthService()

describe("AuthController", () => {
  beforeAll(() => {
    Container.set(AuthService, authService)
    controller = new AuthController()
    res = mockResponse()
    next = mockNext()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  describe("authenticate", () => {
    it("returns 200 and authenticated user", async () => {
      await controller.authenticate(mockRequest({ user }), res, next)
      expect(res.status).toBeCalledWith(200)
      expect(res.json).toBeCalledWith(user)
    })
  })
  describe("signUp", () => {
    it("returns 201 and user details", async () => {
      const { email, name, password, id } = user
      jest.spyOn(authService, "signup").mockResolvedValue({ cookie: "cookie", email, name, id })
      await controller.signUp(mockRequest({ body: { email, name, password } }), res, next)
      expect(res.setHeader).toBeCalledWith("Set-Cookie", ["cookie"])
      expect(res.status).toBeCalledWith(201)
      expect(res.json).toBeCalledWith({ id, name, email })
    })
  })
})
