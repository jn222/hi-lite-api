/* eslint-disable @typescript-eslint/ban-ts-comment */
import { UserService } from "./users.service"
import { prismaMock } from "../test/singleton"
import { mockUser } from "@/test/mocks"
const user = mockUser()
let userService: UserService
describe("UserService", () => {
  beforeAll(() => (userService = new UserService()))
  test("findAllUser", async () => {
    // Workaround for circular reference error
    //@ts-ignore
    prismaMock.user.findMany.mockResolvedValue([user])
    await expect(userService.findAllUser()).resolves.toEqual([user])
  })
  describe("findUserById", () => {
    it("should return user which matches provided id", async () => {
      //@ts-ignore
      prismaMock.user.findUnique.mockResolvedValue(user)
      await expect(userService.findUserById(1)).resolves.toEqual(user)
    })
    it("should throw 409 error if no user is found", async () => {
      //@ts-ignore
      prismaMock.user.findUnique.mockResolvedValue(undefined)
      await expect(userService.findUserById(1)).rejects.toThrowError()
    })
  })
  describe("creatUser", () => {
    it("should create a new user", async () => {
      //@ts-ignore
      prismaMock.user.findUnique.mockResolvedValue(undefined)
      //@ts-ignore
      prismaMock.user.create.mockResolvedValue(user)
      await expect(userService.createUser(user)).resolves.toEqual(user)
    })
    it("should throw 409 error if user exists with same email", async () => {
      //@ts-ignore
      prismaMock.user.findUnique.mockResolvedValue(user)
      await expect(userService.createUser(user)).rejects.toThrowError()
    })
  })
  describe("updateUser", () => {
    it("should update a user", async () => {
      //@ts-ignore
      prismaMock.user.findUnique.mockResolvedValue(user)
      //@ts-ignore
      prismaMock.user.update.mockResolvedValue(user)
      await expect(userService.updateUser(1, user)).resolves.toEqual(user)
    })
    it("should throw an error if no matching user is found", async () => {
      //@ts-ignore
      prismaMock.user.findUnique.mockResolvedValue(undefined)
      await expect(userService.updateUser(1, user)).rejects.toThrowError()
    })
  })
  describe("deleteUser", () => {
    it("should delete a user", async () => {
      //@ts-ignore
      prismaMock.user.findUnique.mockResolvedValue(user)
      //@ts-ignore
      prismaMock.user.delete.mockResolvedValue(user)
      await expect(userService.deleteUser(1)).resolves.toEqual(user)
    })
    it("should throw an error if no matching user is found", async () => {
      //@ts-ignore
      prismaMock.user.findUnique.mockResolvedValue(undefined)
      await expect(userService.deleteUser(1)).rejects.toThrowError()
    })
  })
})
