'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

import classNames from 'classnames'
import { VscDebugAlt } from 'react-icons/vsc'
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes'

const NavLinks = () => {
    const currentPath = usePathname()

    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues/list' }
    ]

    return (
        <ul className=" flex space-x-6">
            {links.map((link) => (
                <li key={link.href}>
                    <Link
                        className={classNames({
                            '!text-zinc-900': link.href === currentPath,
                            'nav-links': true
                        })}
                        href={link.href}>
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

const AuthStatus = () => {
    const { status, data: session } = useSession()

    if (status === 'loading') return null

    if (status === 'unauthenticated') return <Link href="/api/auth/signin">Login</Link>

    return (
        <Flex>
            <Box>
                {status === 'authenticated' && (
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <Avatar
                                src={session.user!.image!}
                                fallback="?"
                                radius="full"
                                className=" cursor-pointer"
                                data-side="right"
                                referrerPolicy="no-referrer"
                            />
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content>
                            <DropdownMenu.Label>
                                <Text size="2">{session.user!.email}</Text>
                            </DropdownMenu.Label>
                            <DropdownMenu.Item>
                                <Link href="/api/auth/signout">Log out</Link>
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                )}
            </Box>
        </Flex>
    )
}

const NavBar = () => {
    return (
        <nav className=" border-b mb-5 px-5 py-5">
            <Container>
                <Flex justify="between">
                    <Flex align="center" gap="3">
                        <Link href="/">
                            <VscDebugAlt />
                        </Link>
                        <NavLinks />
                    </Flex>
                    <AuthStatus />
                </Flex>
            </Container>
        </nav>
    )
}

export default NavBar
