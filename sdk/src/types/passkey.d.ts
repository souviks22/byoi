export type Base64Url = string & { __brand: 'base64url' }
export type Did = `did:ion:${string}` | '<all_users>'

export interface AuthChallenge {
    payload: Base64Url
    timestamp: number
}

export interface DidUser {
    id: Did
    name: string
    displayName: string
    email?: string
    profile?: string
}
