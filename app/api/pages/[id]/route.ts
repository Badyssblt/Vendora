import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(_: Request, { params }: { params: { id: string } }) {
    const page = await prisma.page.findUnique({ where: { id: params.id } })
    if (!page) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(page)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const data = await req.json()
    const updated = await prisma.page.update({
        where: { id: params.id },
        data: {
            ...data,
            updatedAt: new Date(),
        },
    })
    return NextResponse.json(updated)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    await prisma.page.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
}
