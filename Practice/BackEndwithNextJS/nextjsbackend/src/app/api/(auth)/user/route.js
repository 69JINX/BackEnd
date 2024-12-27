import { NextResponse } from "next/server"
import './../../../../../lib/db.js';

export const GET = async () => {
    const data = await fetch('')
    return NextResponse.json(
        { message: 'Success' },
        { status: 200 }
    )
}