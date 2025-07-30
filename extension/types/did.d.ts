import type { JwkEs256k, IonPublicKeyModel, IonDocumentModel } from '@decentralized-identity/ion-sdk'

export type Did = `did:ion:${string}`
export type Base64Url = string & { __brand: 'base64url' }

export interface DidKeys {
    id: Did
    recoveryPublicJwk: JwkEs256k
    recoveryPrivateJwk: JwkEs256k
    updatePublicJwk: JwkEs256k
    updatePrivateJwk: JwkEs256k
}

export interface DidUser {
    id: Did
    name: string
    displayName: string
    email?: string
    profile?: string
}

export interface DidPasskey {
    id: Did
    domain: Base64Url
    credentialId?: Base64Url
}

export interface DidCredentials {
    id: Did
    content: { [domain: Base64Url]: Base64Url }
}

export interface DidDocument {
    id: Did
    content: IonDocumentModel
}

export interface DidPatch {
    publicKeysToAdd?: IonPublicKeyModel[]
    idsOfPublicKeysToRemove?: string[]
}