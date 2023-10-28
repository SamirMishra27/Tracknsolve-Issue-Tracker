'use client'

import { useQuery } from '@tanstack/react-query'
import { User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { Skeleton } from '@/app/components'

const AssigneeSelect = () => {
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
        <Select.Root>
            <Select.Trigger placeholder="Assign..." />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
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
