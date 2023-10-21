'use client'

import { Button, TextField } from '@radix-ui/themes'
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

    return (
        <form
            autoComplete="off"
            className=" max-w-xl space-y-3"
            onSubmit={handleSubmit(async (data) => {
                await fetch('/api/issues', { body: JSON.stringify(data), method: 'POST' })
                router.push('/issues')
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
    )
}

export default NewIssuePage
