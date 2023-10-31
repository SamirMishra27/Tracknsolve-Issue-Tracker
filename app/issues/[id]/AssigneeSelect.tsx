'use client'

import { useQuery } from '@tanstack/react-query'
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { Skeleton } from '@/app/components'

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
    const {
        data: users,
        error,
        isLoading
    } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () =>
            fetch('/api/users')
                .then((resp) => resp.json())
                .then((data) => data),
        staleTime: 60 * 1000
    })

    if (isLoading) return <Skeleton />

    if (error) return null

    return (
        <Select.Root
            defaultValue={issue.assignedToUserId || 'unassigned'}
            onValueChange={(value) => {
                const userId = value !== 'unassigned' ? value : null

                fetch(`/api/issues/${issue.id}`, {
                    body: JSON.stringify({ assignedToUserId: userId }),
                    method: 'PATCH'
                })
            }}>
            <Select.Trigger placeholder="Assign..." />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    <Select.Item value="unassigned">Unassigned</Select.Item>
                    {users?.map((user) => (
                        <Select.Item value={user.id} key={user.id}>
                            {user.name}
                        </Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}

export default AssigneeSelect
