export type PopupState = 'did-overview' | 'did-creation' | 'did-info'

export interface User {
    name?: string
    displayName?: string
    email?: string
    profile?: string
}

export interface UserError {
    name: boolean
    displayName: boolean
    email: boolean
    profile: boolean
}