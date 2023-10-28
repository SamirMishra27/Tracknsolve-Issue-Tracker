export { default } from 'next-auth/middleware'

export const config: { matcher: string[] } = { matcher: ['/issues/new', '/issues/edit/:id+'] }
