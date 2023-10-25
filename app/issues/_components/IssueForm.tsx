'use client'

import { useState } from 'react'
import { Button, TextField, Callout } from '@radix-ui/themes'
import { Controller, useForm } from 'react-hook-form'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import 'easymde/dist/easymde.min.css'
import { useRouter } from 'next/navigation'
import SimpleMDE from 'react-simplemde-editor'

import { issueSchema } from '@/app/validationSchemas'
import { ErrorMessage, Spinner } from '@/app/components'
import { Issue } from '@prisma/client'

type IssueFormData = z.infer<typeof issueSchema>

const IssueForm = ({ issue }: { issue?: Issue }) => {
    const router = useRouter()

    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<IssueFormData>({ resolver: zodResolver(issueSchema) })
    const [error, setError] = useState('')
    const [isSubmitting, setSubmitting] = useState(false)

    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true)

            if (issue) {
                await fetch(`/api/issues/${issue.id}`, { body: JSON.stringify(data), method: 'PATCH' })
            } else {
                const response = await fetch('/api/issues', { body: JSON.stringify(data), method: 'POST' })
                if (!response.ok) throw new Error()
            }

            router.push('/issues')
            router.refresh()
        } catch (error) {
            setError('An unexpected error occurred!')
        }
        setSubmitting(false)
    })

    return (
        <div className=" max-w-xl">
            {error && (
                <Callout.Root color="red" className=" mb-5">
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            )}
            <form autoComplete="off" className=" space-y-3" onSubmit={onSubmit}>
                <TextField.Root>
                    <TextField.Input defaultValue={issue?.title} placeholder="Enter Title..." {...register('title')} />
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) => <SimpleMDE placeholder=" Description of the issue..." {...field} />}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting}>
                    {issue ? 'Update Issue' : 'Submit New Issue'} {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    )
}

export default IssueForm
