import { PrismaClient } from "@prisma/client";
import { ISODateString } from "next-auth"
// import { Session } from "next-auth";

export interface GraphQLContext {
    session: Session | null;
    prisma: PrismaClient 
    // pubsub
}

export interface Session {
    user: User,
    expires: ISODateString
}
export interface User {
    id: string,
    email: string,
    name: string,
    emailVerified: boolean,
    username: string,
    image: string
}

export interface createUsernameResponse {
    success?: boolean,
    error?: string,
}