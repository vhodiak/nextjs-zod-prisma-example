import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
import {z} from "zod";
import {MissingTeamError, Team} from "@/types";

const getUserSessionTeam = async (): Promise<z.infer<typeof Team>> => {
    const session = await getServerSession(authOptions)
    const team = session?.user.team
    if (!team) {
        throw new MissingTeamError()
    }

    return team
}

export {getUserSessionTeam}