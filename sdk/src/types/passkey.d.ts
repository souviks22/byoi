export type Base64Url = string & { __brand: 'base64url' }

export interface AuthChallenge {
    payload: Base64Url
    timestamp: number
}
