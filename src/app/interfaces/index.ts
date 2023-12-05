export interface ISignUp {
    name: string
    email: string
    password: string
}

export interface ILogin {
    email: string
    password: string
}

export interface IMessage {
    id: string
    about: string
    user: {
        name: string
        email: string
        id: number
    }
}