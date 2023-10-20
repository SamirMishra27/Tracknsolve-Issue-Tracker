'use client'

import { Button, TextArea, TextField } from '@radix-ui/themes'

const NewIssuePage = () => {
    return (
        <div className=" max-w-xl space-y-3">
            <TextField.Root>
                <TextField.Input placeholder="Enter Title..." />
            </TextField.Root>
            <TextArea placeholder=" Description of the issue..." />
            <Button>Submit New Issue</Button>
        </div>
    )
}

export default NewIssuePage
