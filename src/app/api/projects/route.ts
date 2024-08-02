import {NextRequest, NextResponse} from "next/server";
import {count, create, findMany} from "@/repositories/project";
import {getUserSessionTeam} from "@/services/user";
import {MissingTeamError, ProjectFilterQuery} from "@/types";
import {makeSkipTake} from "@/services/pagination";


export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const team = await getUserSessionTeam()
        const searchParams = req.nextUrl.searchParams

        const filter = ProjectFilterQuery.parse({
            q: searchParams.get('q') || undefined,
            clientId: searchParams.get('clientId') || undefined,
        })

        const {skip, take} = makeSkipTake(req)

        const items = await findMany(team.id, filter, skip, take)
        const total = await count(team.id, filter)
        return NextResponse.json({
            data: items,
            total: total
        });
    } catch (e) {
        if (e instanceof MissingTeamError) {
            return NextResponse.json({error: e.message}, {status: 400})
        }
        return NextResponse.json({error: e}, {status: 500});
    }
}


export async function POST(req: NextRequest) {
    try {
        const team = await getUserSessionTeam()
        const body = await req.json();
        await create(team.id, body.data);
        return NextResponse.json(null, {status: 201});
    } catch (e) {
        if (e instanceof MissingTeamError) {
            return NextResponse.json({error: e.message}, {status: 400})
        }
        return NextResponse.json({error: e}, {status: 500});
    }
}