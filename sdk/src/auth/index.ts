import type { DidUser } from '../types/passkey'
import { authenticate, BYOI_SESSION_KEY } from './signin'

export const signin = async () => {
    return await authenticate()
}

export const signout = async () => {
    try {
        localStorage.removeItem(BYOI_SESSION_KEY)
        return { success: true }
    } catch {
        return { success: false }
    }
}

export const signinIfPersists = async () => {
    const session = localStorage.getItem(BYOI_SESSION_KEY)
    const userIfPersists = session ? JSON.parse(session) as DidUser : null
    return await authenticate(userIfPersists)
}