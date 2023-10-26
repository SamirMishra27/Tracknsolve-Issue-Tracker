'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import { Spinner } from '@/app/components'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
    const router = useRouter()
    const [error, setError] = useState(false)
    const [isDeleting, setDeleting] = useState(false)

    const deleteIssue = async () => {
        try {
            setDeleting(true)
            const response = await fetch(`/api/issues/${issueId}`, { method: 'DELETE' })
            if (!response.ok) throw new Error()

            router.push('/issues/list')
            router.refresh()
        } catch (error) {
            setDeleting(false)
            setError(true)
        }
    }

    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color="red" disabled={isDeleting}>
                        Delete Issue
                        {isDeleting && <Spinner />}
                    </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                    <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                    <AlertDialog.Description>
                        Are you sure you want to delete this issue? This action cannot be undone.
                    </AlertDialog.Description>
                    <Flex mt="4" gap="3">
                        <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button color="red" onClick={deleteIssue}>
                                Delete Issue
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>Error!</AlertDialog.Title>
                    <AlertDialog.Description>This issue could not be deleted.</AlertDialog.Description>
                    <Button color="gray" variant="soft" mt="2" onClick={() => setError(false)}>
                        OK
                    </Button>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}

export default DeleteIssueButton
