import {NextRequest, NextResponse} from "next/server";
import {count, create, findMany} from "@/repositories/client";
import {getUserSessionTeam} from "@/services/user";
import {MissingTeamError} from "@/types";
import {makeSkipTake} from "@/services/pagination";


export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const team = await getUserSessionTeam()
        const searchParams = req.nextUrl.searchParams
        const q = searchParams.get('q') || ""

        const {skip, take} = makeSkipTake(req)

        const items = await findMany(team.id, q, skip, take)
        const total = await count(team.id, q)
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