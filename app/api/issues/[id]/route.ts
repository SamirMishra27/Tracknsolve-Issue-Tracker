import { issueSchema } from '@/app/validationSchemas'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const body = await request.json()
    const validation = issueSchema.safeParse(body)

    if (!validation.success) return NextResponse.json(validation.error.errors, { status: 400 })

    const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } })
    if (!issue) return NextResponse.json({ error: 'Invalid issue' }, { status: 404 })

    const updatedIssue = await prisma.issue.update({
        where: { id: issue.id },
        data: validation.data
    })

    return NextResponse.json(updatedIssue)
}
