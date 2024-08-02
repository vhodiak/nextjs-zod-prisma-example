import { z } from "zod";

export enum TeamMemberRole {
    Owner = 'owner',
    Admin = 'admin',
    Manager = 'manager',
    Developer = 'developer'
}

const IDAndTS = z.object({
    id: z.string().cuid2(),
    createdAt: z.date().optional().catch( (ctx) => {
        return new Date(ctx.input!)
    }),
});

export const Profile = z.object({
    name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email(),
});

type Profile = z.infer<typeof Profile>;

export const TeamDto = z.object({
    name: z.string().min(2, {
        message: "Team name must be at least 2 characters.",
    }),
});

type TeamDto = z.infer<typeof TeamDto>;

export const Team = TeamDto.merge(IDAndTS);

type Team = z.infer<typeof Team>;

export class MissingTeamError extends Error {
    constructor(message: string = 'Team is not specified') {
        super(message);
        this.name = "MissingTeamError";
    }
}

export const ClientDto = z.object({
    firstName: z.string().min(2, {
        message: "First Name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
        message: "Last Name must be at least 2 characters.",
    }),
    email: z.optional(z.string().email().nullable()),
    tel: z.optional(z.string().min(7, {
        message: "Invalid phone number.",
    }).nullable()),
});

type ClientDto = z.infer<typeof ClientDto>;
export const Client = ClientDto.merge(IDAndTS);

type Client = z.infer<typeof Client>;

export const ClientWithPagination = z.object({
    data: z.array(Client),
    total: z.number(),
});

type ClientWithPagination = z.infer<typeof ClientWithPagination>;

export const PaginationOptions = z.object({
    cur: z.number().optional(),
    page: z.number().optional(),
    ipp: z.number().optional()
});

type PaginationOptions = z.infer<typeof PaginationOptions>;

export const FilterQuery = z.object({
    q: z.optional(z.string().min(2)),
}).extend(PaginationOptions.shape);

type FilterQuery = z.infer<typeof FilterQuery>;

export interface SkipTake {
    skip: number;
    take: number;
}

export const ProjectDto = z.object({
    clientId: z.string().cuid2(),
    title: z.string().min(2),
});

type ProjectDto = z.infer<typeof ProjectDto>;
export const Project = ProjectDto.merge(IDAndTS).extend({
    client: Client.optional(),
});

type Project = z.infer<typeof Project>;

export const ProjectWithPagination = z.object({
    data: z.array(Project),
    total: z.number(),
});

type ProjectWithPagination = z.infer<typeof ProjectWithPagination>;

export const ProjectFilterQuery = z.object({
    clientId: z.string().cuid2().optional(),
}).extend(FilterQuery.shape);

type ProjectFilterQuery = z.infer<typeof ProjectFilterQuery>;