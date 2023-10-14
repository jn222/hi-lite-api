// TODO use prisma client objects instead and separate request objs?
export interface User {
  id?: number
  name: string
  email: string
  password: string
}
