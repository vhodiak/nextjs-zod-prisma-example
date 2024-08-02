'use client';
import {Eraser, PlusCircle, Search} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import React, {useCallback, useEffect, useState} from "react";
import useSWR from "swr";
import {all} from "@/services/projects";
import moment from "moment/moment";
import TablePagination from "@/components/table-pagination";
import {z} from "zod";
import {Project, ProjectFilterQuery} from "@/types";
import Drawer from "@/components/drawer";
import {ButtonLink} from "@/components/ui/forms/buttons";
import ProjectForm from "@/app/dashboard/projects/project-form";
import ProjectRemove from "@/app/dashboard/projects/project-remove";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import ClientSelect from "@/components/client-select";


export default function Page() {

    const [drawerState, setDrawerState] = useState<{
        open: boolean,
        title?: string,
        description?: string,
        children?: React.ReactNode
    }>({
        open: false,
    });

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams();
    const [filter, setFilter] = useState<z.infer<typeof ProjectFilterQuery>>(searchParams as z.infer<typeof ProjectFilterQuery>);


    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
            if (name === 'ipp') {
                params.set('page', '1')
            }

            return params.toString()
        },
        [searchParams]
    )
    const updateFilter = (k: string, v: any) => {
        router.push(pathname + '?' + createQueryString(k, v.toString()))
    }

    const resetFilter = () => {
        setFilter({});
        router.push(pathname)
    }


    useEffect(() => {
        const params = Object.fromEntries(searchParams.entries());
        setFilter(params)
    }, [router,pathname,searchParams]);

    const swrKey = `/projects?${JSON.stringify(filter)}`
    const {data, isLoading, error} = useSWR(swrKey, () => all(filter));

    const openAddProject = () => {
        setDrawerState({
            open: true,
            title: 'Create Project',
            description: 'Create project',
            children: <ProjectForm swrKey={swrKey} onSuccess={closeDrawer}/>
        });
    };

    const openEditProject = (project: z.infer<typeof Project>) => {
        setDrawerState({
            open: true,
            title: 'Modify Project',
            description: `Modify ${project.title} information.`,
            children: <ProjectForm swrKey={swrKey} onSuccess={closeDrawer} project={project}/>
        });
    };

    const closeDrawer = () => {
        setDrawerState({open: false});
    };

    return (
        <>
            <div className="px-1">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
                </div>
                <div className="mb-6 flex flex-row ">
                    <div className="basis-1/4">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                        <Input
                            type="search"
                            placeholder="Search..."
                            onChange={(e) => updateFilter('q', e.target.value)}
                            value={filter.q || ''}
                            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                        />
                    </div>
                    <div className="basis-1/4 flex flex-row justify-start">
                        <ClientSelect onChange={(v) => updateFilter('clientId', v)} value={filter.clientId || ''}/>
                        <Button className={'ml-4'} size="sm" variant='outline' onClick={resetFilter}>
                            <Eraser className="h-3.5 w-3.5 mr-2" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Clear</span>
                        </Button>
                    </div>
                    <div className="basis-1/2 grid justify-items-end">
                        <Button size="sm" className="h-8 gap-1" onClick={openAddProject}>
                            <PlusCircle className="h-3.5 w-3.5"/>
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Project</span>
                        </Button>
                    </div>
                </div>
            </div>
            <Table className="table-auto border-collapse border">
                <TableHeader className="bg-muted">
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data && data.data.map((e) => (

                        <TableRow key={e.id}>
                            <TableCell className="font-medium">
                                <ButtonLink onClick={() => openEditProject(e)}>{e.id}</ButtonLink>
                            </TableCell>
                            <TableCell className="font-medium">{e.title}</TableCell>
                            <TableCell className="font-medium">{e.client?.firstName} {e.client?.lastName}</TableCell>
                            <TableCell>{moment(e.createdAt).fromNow()}</TableCell>
                            <TableCell><ProjectRemove project={e} swrKey={swrKey}/></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination total={data?.total || 0}/>
            <Drawer
                title={drawerState.title}
                description={drawerState.description}
                isOpen={drawerState.open}
                onClose={closeDrawer}

            >{drawerState.children}</Drawer>
        </>
    );
}