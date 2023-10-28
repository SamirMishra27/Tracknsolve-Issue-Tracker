'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

import classNames from 'classnames'
import { VscDebugAlt } from 'react-icons/vsc'
import { Box } from '@radix-ui/themes'

const NavBar = () => {
    const currentPath = usePathname()
    const { status, data: session } = useSession()

    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues/list' }
    ]

    return (
        <nav className=" flex space-x-6 border-b mb-5 px-5 h-14 items-center">
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
            <Box>
                {status === 'authenticated' && <Link href="/api/auth/signin">Log out</Link>}
                {status === 'unauthenticated' && <Link href="/api/auth/signout">Login</Link>}
            </Box>
        </nav>
    )
}

export default NavBar
