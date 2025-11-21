import {clerkClient} from "@clerk/express"


export const protectedMentor = async (req , res , next) =>{
    try {
        const {userId} = req.auth()
        const user = await clerkClient.users.getUser(userId)
        if(user.publicMetadata.role !== "mentor"){
            return res.json({message:"Access denied. Mentor role required."})
        }
        next()
    } catch (error) {
        res.json({message:"Error verifying mentor role" , error:error.message})
    }
}