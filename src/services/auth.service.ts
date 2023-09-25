import { compare, hash } from "bcrypt"
import { sign } from "jsonwebtoken"
import { Service } from "typedi"
import { SECRET_KEY } from "@config"
import { CreateUserDto, LoginUserDto } from "@dtos/users.dto"
import { HttpException } from "@exceptions/HttpException"
import { DataStoredInToken, TokenData } from "@interfaces/auth.interface"
import { User } from "@interfaces/users.interface"
import prisma from "@/db"

@Service()
export class AuthService {
  public user = prisma.user
  public async signup(userData: CreateUserDto): Promise<{ cookie: string; id: number; name: string; email: string }> {
    const findUser: User = await this.user.findUnique({ where: { email: userData.email } })
    if (findUser) throw new HttpException(409, `The email ${userData.email} already exists`)
    const hashedPassword = await hash(userData.password, 10)

    const createUserData: User = await this.user.create({ data: { ...userData, password: hashedPassword } })

    const tokenData = this.createToken(createUserData)
    const cookie = this.createCookie(tokenData)
    const { id, name, email } = createUserData

    return { cookie, id, name, email }
  }

  public async login(userData: LoginUserDto): Promise<{ cookie: string; id: number; name: string; email: string }> {
    const findUser: User = await this.user.findUnique({ where: { email: userData.email } })
    if (!findUser) throw new HttpException(409, `The email ${userData.email} was not found`)

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password)
    if (!isPasswordMatching) throw new HttpException(409, "Password does not match")

    const tokenData = this.createToken(findUser)
    const cookie = this.createCookie(tokenData)
    const { id, name, email } = findUser

    return { cookie, id, name, email }
  }

  public async logout(userData: User): Promise<void> {
    const findUser: User = await this.user.findFirst({ where: { email: userData.email, password: userData.password } })
    if (!findUser) throw new HttpException(409, "User doesn't exist")
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id }
    const secretKey: string = SECRET_KEY
    const expiresIn: number = 60 * 60 * 1000

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) }
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`
  }
}
