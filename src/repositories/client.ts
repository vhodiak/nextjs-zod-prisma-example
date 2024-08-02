import prisma from "@/lib/db";
import {Client, ClientDto} from "@/types";
import {z} from "zod";

export const create = async (teamId: string, data: z.infer<typeof ClientDto>): Promise<void> => {
    await prisma.client.create({
        data: {
            ...data,
            teamId: teamId,
        }
    })
}

export const findOne = async (teamId: string, id: string): Promise<z.infer<typeof Client>> => {
    return await prisma.client.findFirstOrThrow({
        where: {
            teamId: teamId,
            id: id,
        },
    })
}

export const findMany = async (teamId: string, q: string = '', skip: number = 0, take: number = 25): Promise<z.infer<typeof Client>[]> => {
    let query = {}

    if (q.length >= 2) {
        query = {
            OR: [
                {firstName: {contains: q, mode: 'insensitive'}},
                {lastName: {contains: q, mode: 'insensitive'}},
                {email: {contains: q, mode: 'insensitive'}},
                {tel: {contains: q, mode: 'insensitive'}},
            ],
        }
    }

    return await prisma.client.findMany({
        where: {
            teamId: teamId,
            ...query
        },
        orderBy: {
            firstName: 'asc',
        },
        skip: skip,
        take: take
    })
}
export const count = async (teamId: string, q: string = ''): Promise<number> => {
    let query = {}

    if (q.length > 2) {
        query = {
            OR: [
                {firstName: {contains: q, mode: 'insensitive'}},
                {lastName: {contains: q, mode: 'insensitive'}},
                {email: {contains: q, mode: 'insensitive'}},
                {tel: {contains: q, mode: 'insensitive'}},
            ],
        }
    }

    return await prisma.client.count({
        where: {
            teamId: teamId,
            ...query
        },
    })

}

export const update = async (teamId: string, id: string, data: z.infer<typeof ClientDto>): Promise<void> => {
    await prisma.client.update({
        where: {
            teamId: teamId,
            id: id
        },
        data: data
    })
}


export const remove = async (teamId: string, id: string): Promise<void> => {
    await prisma.client.delete({
        where: {
            teamId: teamId,
            id: id,
        }
    })
}
