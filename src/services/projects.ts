import {apiClient} from "@/utils/api-client";
import {Project, ProjectDto, ProjectWithPagination, ProjectFilterQuery} from '@/types'
import {z} from "zod";

const path = '/projects';


export const all = async (filter?: z.infer<typeof ProjectFilterQuery>): Promise<z.infer<typeof ProjectWithPagination>> => {
    const filteredFilter = Object.fromEntries(
        Object.entries(filter || {}).filter(([_, value]) => value !== undefined && value !== null && value !== "")
    );

    const params = new URLSearchParams(filteredFilter as Record<string, string>);
    const res = await apiClient.get(`${path}?` + params.toString());

    return ProjectWithPagination.parse({
        data: res.data.data,
        total: res.data.total,
    });
};


export const get = async (id: string): Promise<z.infer<typeof Project>> => {
    const res = await apiClient.get<z.infer<typeof Project>>(`${path}/${id}`);
    return res.data;
}
export const create = async (data: z.infer<typeof ProjectDto>): Promise<z.infer<typeof Project>> => {
    const res = await apiClient.post<z.infer<typeof Project>>(`${path}`, {data: data});
    return res.data;
}

export const update = async (id: string, data: z.infer<typeof ProjectDto>): Promise<z.infer<typeof Project>> => {
    const res = await apiClient.put<z.infer<typeof Project>>(`${path}/${id}`, {data: data});
    return res.data;
}

export const remove = async (id: string) => {
    await apiClient.delete(`${path}/${id}`);
}