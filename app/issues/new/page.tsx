'use client'

import { useState } from 'react'
import { Button, TextField, Callout } from '@radix-ui/themes'
import SimpleMDE from 'react-simplemde-editor'
import { Controller, useForm } from 'react-hook-form'
import 'easymde/dist/easymde.min.css'
import { useRouter } from 'next/navigation'

interface IssueForm {
    title: string
    description: string
}

const NewIssuePage = () => {
    const router = useRouter()

    const { register, control, handleSubmit } = useForm<IssueForm>()
    const [error, setError] = useState('')

    return (
        <div className=" max-w-xl">
            {error && (
                <Callout.Root color="red" className=" mb-5">
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            )}
            <form
                autoComplete="off"
                className=" space-y-3"
                onSubmit={handleSubmit(async (data) => {
                    try {
                        const response = await fetch('/api/issues', { body: JSON.stringify(data), method: 'POST' })
                        if (!response.ok) throw new Error()
                        router.push('/issues')
                    } catch (error) {
                        setError('An unexpected error occurred!')
                    }
                })}>
                <TextField.Root>
                    <TextField.Input placeholder="Enter Title..." {...register('title')} />
                </TextField.Root>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder=" Description of the issue..." {...field} />}
                />
                <Button>Submit New Issue</Button>
            </form>
        </div>
    )
}

export default NewIssuePage
