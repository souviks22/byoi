import type { JwkEs256k, IonPublicKeyModel, IonDocumentModel } from '@decentralized-identity/ion-sdk'

export type Did = `did:ion:${string}`

export interface DidPatch {
    publicKeysToAdd?: IonPublicKeyModel[]
    idsOfPublicKeysToRemove?: string[]
}

export interface DidKeys {
    id: Did
    recoveryPublicJwk: JwkEs256k
    recoveryPrivateJwk: JwkEs256k
    updatePublicJwk: JwkEs256k
    updatePrivateJwk: JwkEs256k
}

export interface DidUser {
    id: Did
    name: string,
    displayName: string,
    email?: string
}

export interface DidDocument {
    id: Did,
    content: IonDocumentModel
}