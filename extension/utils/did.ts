import type { Did, DidDocument, DidKeys, DidUser } from '@/types/did'
import type { RuntimeMessage, RuntimeResponse } from '@/types/messaging'
import type IonCreateRequestModel from '@decentralized-identity/ion-sdk/dist/lib/models/IonCreateRequestModel'
import type IonUpdateRequestModel from '@decentralized-identity/ion-sdk/dist/lib/models/IonUpdateRequestModel'
import type IonAddPublicKeysActionModel from '@decentralized-identity/ion-sdk/dist/lib/models/IonAddPublicKeysActionModel'
import type IonRemovePublicKeysActionModel from '@decentralized-identity/ion-sdk/dist/lib/models/IonRemovePublicKeysActionModel'

export const saveDidUser = async (user: DidUser) => {
    const message: RuntimeMessage = {
        source: 'popup',
        type: 'save-user',
        params: { user }
    }
    const { success } = await browser.runtime.sendMessage(message) as RuntimeResponse
    if (!success) throw new Error('Failed to create DID User')
}

export const saveDidJwk = async (keys: DidKeys) => {
    const message: RuntimeMessage = {
        source: 'popup',
        type: 'save-keys',
        params: { keys }
    }
    const { success } = await browser.runtime.sendMessage(message) as RuntimeResponse
    if (!success) throw new Error('Failed to save Private Keys')
}

export const getDidJwk = async (did: Did) => {
    const message: RuntimeMessage = {
        source: 'popup',
        type: 'get-keys',
        params: { did }
    }
    const { success, data } = await browser.runtime.sendMessage(message) as RuntimeResponse
    if (!success) throw new Error('Failed to fetch Private Keys')
    return data as DidKeys
}

export const anchorCreation = async (request: IonCreateRequestModel) => {
    const did: Did = `did:ion:${request.suffixData.deltaHash}`
    const message: RuntimeMessage = {
        source: 'popup',
        type: 'save-did',
        params: {
            document: {
                id: did,
                content: request.delta.patches[0].document
            }
        }
    }
    const { success } = await browser.runtime.sendMessage(message) as RuntimeResponse
    if (!success) throw new Error('Failed to create DID')
    return did
}

export const anchorUpdate = async (request: IonUpdateRequestModel) => {
    const did: Did = `did:ion:${request.didSuffix}`
    const addPublicKeys = request.delta.patches.filter((patch): patch is IonAddPublicKeysActionModel => patch.action === 'add-public-keys')
    const removePublicKeys = request.delta.patches.filter((patch): patch is IonRemovePublicKeysActionModel => patch.action === 'remove-public-keys')
    const message: RuntimeMessage = {
        source: 'popup',
        type: 'update-did',
        params: {
            did,
            patch: {
                publicKeysToAdd: addPublicKeys.length ? addPublicKeys[0].publicKeys : undefined,
                idsOfPublicKeysToRemove: removePublicKeys.length ? removePublicKeys[0].ids : undefined
            }
        }
    }
    const { success } = await browser.runtime.sendMessage(message) as RuntimeResponse
    if (!success) throw new Error('Failed to update DID')
}

export const resolve = async (did: Did) => {
    const message: RuntimeMessage = {
        source: 'popup',
        type: 'get-did',
        params: { did }
    }
    const { success, data } = await browser.runtime.sendMessage(message) as RuntimeResponse
    if (!success) throw new Error('Failed to resolve DID')
    return data as DidDocument
}

// const anchor = async (request: IonCreateRequestModel | IonUpdateRequestModel) => {
//     const res = await fetch('https://ion.tbd.network/operations', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(request),
//     })
//     return await res.json()
// }
