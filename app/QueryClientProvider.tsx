'use client'

import { QueryClient, QueryClientProvider as Provider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'

const queryClient = new QueryClient()

const QueryClientProvider = ({ children }: PropsWithChildren) => {
    return <Provider client={queryClient}>{children}</Provider>
}

export default QueryClientProvider
