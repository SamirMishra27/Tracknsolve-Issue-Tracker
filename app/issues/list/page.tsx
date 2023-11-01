import { Table } from '@radix-ui/themes'
import prisma from '@/prisma/client'
import NextLink from 'next/link'

import { IssueStatusBadge, Link } from '@/app/components'
import IssueActions from './IssueActions'
import { Issue, Status } from '@prisma/client'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import Pagination from '@/app/components/Pagination'

interface Props {
    searchParams: { status: Status; orderBy: keyof Issue; page: string }
}

const IssuesPage = async ({ searchParams }: Props) => {
    const columns: { label: string; value: keyof Issue; className: string }[] = [
        { label: 'Issue', value: 'title', className: '' },
        { label: 'Status', value: 'status', className: ' hidden md:table-cell' },
        { label: 'Created', value: 'createdAt', className: ' hidden md:table-cell' }
    ]

    const orderBy = columns.map((column) => column.value).includes(searchParams.orderBy)
        ? { [searchParams.orderBy]: 'asc' }
        : undefined

    const validIssueStatus = Object.values(Status)
    const status = validIssueStatus.includes(searchParams.status) ? searchParams.status : undefined
    const where = { status: status }

    const currentPage = parseInt(searchParams.page) || 1
    const pageSize = 10

    const issues = await prisma.issue.findMany({ where, orderBy, skip: (currentPage - 1) * pageSize, take: pageSize })
    const issueCount = await prisma.issue.count({ where })

    return (
        <div>
            <IssueActions />
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        {columns.map((column) => (
                            <Table.ColumnHeaderCell className={column.className} key={column.value}>
                                <NextLink
                                    href={{
                                        query: { ...searchParams, orderBy: column.value }
                                    }}>
                                    {column.label}
                                    {column.value === searchParams.orderBy && <ArrowUpIcon className=" inline" />}
                                </NextLink>
                            </Table.ColumnHeaderCell>
                        ))}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map((issue) => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                                <div className=" block md:hidden">
                                    <IssueStatusBadge status={issue.status} />
                                </div>
                            </Table.Cell>
                            <Table.Cell className=" hidden md:table-cell">
                                <IssueStatusBadge status={issue.status} />
                            </Table.Cell>
                            <Table.Cell className=" hidden md:table-cell">{issue.createdAt.toDateString()}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
            <Pagination itemCount={issueCount} pageSize={pageSize} currentPage={currentPage} />
        </div>
    )
}

export const dynamic = 'force-dynamic'

export default IssuesPage
