import { createUsernameResponse, GraphQLContext } from "../../utils/types"

const resolvers = {
    Query: {
        searchUsers: () => {},
    },
    Mutation: {
        createUsername: async (_:any, args: { username: string }, context: GraphQLContext): Promise<createUsernameResponse> => {
            const { username } = args
            const {session, prisma} = context
            if (!session?.user) {
                return {
                    error: 'Not Authorized'
                }
            }
            const {id: userId} = session.user

            try {
                // username not taken
                const existingUser = await prisma.user.findUnique({
                    where : {
                        username
                    }
                })

                if (existingUser) {
                    return {
                        error: "Username already taken. Try another"
                    }
                }
                // update user
                await prisma.user.update({
                    where: {
                        id: userId
                    },
                    data: {
                        username
                    }
                })
                return {success: true}
                
            } catch (error: any) {
                console.log("CreateUsername Error", error)

                return {
                    error: error.message
                }
            }

        
        },
    },
}

export default resolvers