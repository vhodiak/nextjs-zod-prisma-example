import prisma from "@/lib/db";
import {Project, ProjectDto, ProjectFilterQuery} from "@/types";
import {z} from "zod";

export const create = async (teamId: string, data: z.infer<typeof ProjectDto>): Promise<void> => {
    await prisma.project.create({
        data: {
            ...data,
            teamId: teamId,
        }
    })
}

export const findOne = async (teamId: string, id: string): Promise<z.infer<typeof Project>> => {
    const item = await prisma.project.findUnique({
        where: {
            teamId: teamId,
            id: id,
        },
    })

    return item!
}

export const findMany = async (teamId: string, filter: z.infer<typeof ProjectFilterQuery>, skip: number = 0, take: number = 25): Promise<z.infer<typeof Project>[]> => {
    let query = {}

    if (filter.q != null && filter.q.length >= 2) {
        query = {
            title: {contains: filter.q, mode: 'insensitive'}
        }
    }

    if (filter.clientId != null ) {
        query = {
            ...query,
            clientId: filter.clientId
        }
    }

    const items = await prisma.project.findMany({
        where: {
            teamId: teamId,
            ...query
        },
        include: {
            client: true,
        },
        orderBy: {
            title: 'asc',
        },
        skip: skip,
        take: take
    })

    return items
}
export const count = async (teamId: string, filter: z.infer<typeof ProjectFilterQuery>): Promise<number> => {
    let query = {}

    if (filter.q != null && filter.q.length > 2) {
        query = {
            title: {contains: filter.q, mode: 'insensitive'}
        }
    }

    if (filter.clientId != null ) {
        query = {
            ...query,
            clientId: filter.clientId
        }
    }

    return await prisma.project.count({
        where: {
            teamId: teamId,
            ...query
        },
    })

}

export const update = async (teamId: string, id: string, data: z.infer<typeof ProjectDto>): Promise<void> => {
    await prisma.project.update({
        where: {
            teamId: teamId,
            id: id
        },
        data: data
    })
}


export const remove = async (teamId: string, id: string): Promise<void> => {
    await prisma.project.delete({
        where: {
            teamId: teamId,
            id: id,
        }
    })
}
