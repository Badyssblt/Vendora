import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
    const pages = await prisma.page.findMany()
    return NextResponse.json(pages)
}

export async function POST(req: Request) {
    const data = await req.json()
    const page = await prisma.page.create({
        data: {
            title: data.title,
            slug: data.slug,
            content: data.content,
            status: data.status ?? 'draft',
            parentId: data.parentId ?? null,
            order: data.order ?? 0,
        },
    })
    return NextResponse.json(page)
}
