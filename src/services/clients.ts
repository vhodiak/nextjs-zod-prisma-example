import {apiClient} from "@/utils/api-client";
import {Client, ClientDto, ClientWithPagination, FilterQuery} from '@/types'
import {z} from "zod";

const path = '/clients';

export const all = async (filter?: z.infer<typeof FilterQuery>): Promise<z.infer<typeof ClientWithPagination>> => {
    const filteredFilter = Object.fromEntries(
        Object.entries(filter || {}).filter(([_, value]) => value !== undefined && value !== null && value !== "")
    );

    const params = new URLSearchParams(filteredFilter as Record<string, string>);
    const res = await apiClient.get(`${path}?` + params.toString());

    return ClientWithPagination.parse({
        data: res.data.data,
        total: res.data.total,
    });
};

export const get = async (id: string): Promise<z.infer<typeof Client>> => {
    const res = await apiClient.get<z.infer<typeof Client>>(`${path}/${id}`);
    return res.data;
}
export const create = async (data: z.infer<typeof ClientDto>): Promise<z.infer<typeof Client>> => {
    const res = await apiClient.post<z.infer<typeof Client>>(`${path}`, {data: data});
    return res.data;
}

export const update = async (id: string, data: z.infer<typeof ClientDto>): Promise<z.infer<typeof Client>> => {
    const res = await apiClient.put<z.infer<typeof Client>>(`${path}/${id}`, {data: data});
    return res.data;
}

export const remove = async (id: string) => {
    await apiClient.delete(`${path}/${id}`);
}