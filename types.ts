
interface LoginEntry {
  id: string,
  hash: string,
  email: string
}


interface User {
  id: string,
  name: string,
  email: string,
  password: string,
  entries: number,
  joined: Date
}

export type {
  LoginEntry,
  User
}
