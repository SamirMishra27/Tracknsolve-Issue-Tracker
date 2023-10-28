'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

import classNames from 'classnames'
import { VscDebugAlt } from 'react-icons/vsc'
import { Box, Container, Flex } from '@radix-ui/themes'

const NavBar = () => {
    const currentPath = usePathname()
    const { status, data: session } = useSession()

    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues/list' }
    ]

    return (
        <nav className=" border-b mb-5 px-5 py-5">
            <Container>
                <Flex justify="between">
                    <Flex align="center" gap="3">
                        <Link href="/">
                            <VscDebugAlt />
                        </Link>
                        <ul className=" flex space-x-6">
                            {links.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        className={classNames({
                                            ' text-zinc-900': link.href === currentPath,
                                            'text-zinc-500': link.href !== currentPath,
                                            'hover:text-zinc-800 transition-colors': true
                                        })}
                                        href={link.href}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Flex>
                    <Flex>
                        <Box>
                            {status === 'authenticated' && <Link href="/api/auth/signin">Log out</Link>}
                            {status === 'unauthenticated' && <Link href="/api/auth/signout">Login</Link>}
                        </Box>
                    </Flex>
                </Flex>
            </Container>
        </nav>
    )
}

export default NavBar
