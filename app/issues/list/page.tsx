import { Metadata } from 'next'
import { Flex } from '@radix-ui/themes'
import { Status } from '@prisma/client'
import prisma from '@/prisma/client'
import { Pagination } from '@/app/components'
import IssueTable, { IssueQuery, columnNames } from './IssueTable'
import IssueActions from './IssueActions'

interface Props {
    searchParams: IssueQuery
}

const IssuesPage = async ({ searchParams }: Props) => {
    const validIssueStatus = Object.values(Status)
    const status = validIssueStatus.includes(searchParams.status) ? searchParams.status : undefined

    const where = { status: status }
    const orderBy = columnNames.includes(searchParams.orderBy) ? { [searchParams.orderBy]: 'asc' } : undefined

    const currentPage = parseInt(searchParams.page) || 1
    const pageSize = 10

    const issues = await prisma.issue.findMany({ where, orderBy, skip: (currentPage - 1) * pageSize, take: pageSize })
    const issueCount = await prisma.issue.count({ where })

    return (
        <Flex direction="column" gap="3">
            <IssueActions />
            <IssueTable searchParams={searchParams} issues={issues} />
            <Pagination itemCount={issueCount} pageSize={pageSize} currentPage={currentPage} />
        </Flex>
    )
}

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Issue Tracker - List',
    description: 'View all project issues'
}

export default IssuesPage
