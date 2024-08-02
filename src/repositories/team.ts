import prisma from "@/lib/db";
import {Team, TeamDto, TeamMemberRole} from "@/types";
import {z} from "zod";

export const create = async (userId: string, data: z.infer<typeof TeamDto>): Promise<z.infer<typeof Team>> => {
    const iv = {
        name: data.name,
        teamMembers: {
            create: {
                memberId: userId,
                role: TeamMemberRole.Owner
            },
        }
    }
    return await prisma.team.create({data: iv})
}
export const find = async (id: string): Promise<z.infer<typeof Team>> => {
    const team = await prisma.team.findUnique({
        where: {
            id: id,
        },
    })

    return Team.parse(team)
}
export const myFirst = async (memberId: string): Promise<z.infer<typeof Team>> => {
    return await prisma.team.findFirstOrThrow({
        where: {
            teamMembers: {
                some: {
                    memberId: memberId,
                    role: TeamMemberRole.Owner
                },
            },
        },
        orderBy: {
            createdAt: 'asc'
        }
    });
}

export const remove = async (id: string): Promise<void> => {
    await prisma.team.delete({
        where: {
            id: id,
        }
    })
}