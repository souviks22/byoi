import type { Base64Url, Did, DidPatch, DidUser } from '@/types/did'
import type { RuntimeMessage, RuntimeResponse, WindowMessage } from '@/types/messaging'
import type { AuthChallenge } from '@/types/passkey'
import { IonPublicKeyPurpose } from '@decentralized-identity/ion-sdk'
import * as uint8arrays from 'uint8arrays'

export const signin = async ({ id, name, displayName }: DidUser, challenge: AuthChallenge) => {
    try {
        const credential = await getCredentialFromIDB(id)
        if (!credential) {
            const { response, credentialId } = await createPasskey({
                challenge,
                user: {
                    name, displayName,
                    id: uint8arrays.fromString(id)
                }
            })
            const { patch, publicJwk } = await getPublicKeyAdditionData(response.getPublicKey()!)
            await updateIonDid({ did: id, patch })
            await saveCredentialToIDB(id, credentialId)
            const message: WindowMessage = {
                source: 'byoi-extension',
                type: 'signin-response',
                challenge,
                auth: {
                    trigger: 'signup',
                    publicKey: publicJwk,
                    signup: {
                        clientDataJSON: bytesToB64url(response.clientDataJSON),
                        attestationObject: bytesToB64url(response.attestationObject)
                    }
                }
            }
            window.postMessage(message, window.location.origin)
        } else {
            const { response } = await getPasskey({
                challenge,
                credentialId: b64urlToBytes(credential)
            })
            const { content: document } = await resolveIonDid(id)
            const { publicKeyJwk } = document.publicKeys?.filter(pk => pk.id === utfToB64url(window.location.hostname))[0]!
            const message: WindowMessage = {
                source: 'byoi-extension',
                type: 'signin-response',
                challenge,
                auth: {
                    trigger: 'signin',
                    publicKey: publicKeyJwk,
                    signin: {
                        clientDataJSON: bytesToB64url(response.clientDataJSON),
                        authenticatorData: bytesToB64url(response.authenticatorData),
                        signature: bytesToB64url(response.signature)
                    }
                }
            }
            window.postMessage(message, window.location.origin)
        }
    } catch {
        const message: WindowMessage = {
            source: 'byoi-extension',
            type: 'signin-error',
            challenge
        }
        window.postMessage(message, window.location.origin)
    }
}

const getCredentialFromIDB = async (id: Did) => {
    const message: RuntimeMessage = {
        source: 'content',
        type: 'get-credential',
        params: { passkey: { id, domain: utfToB64url(window.location.hostname) } }
    }
    const { success, data } = await browser.runtime.sendMessage(message) as RuntimeResponse
    if (!success) throw new Error('Failed to fetch DID Credential')
    return data ? data as Base64Url : null
}

const saveCredentialToIDB = async (id: Did, credentialId: ArrayBuffer) => {
    const message: RuntimeMessage = {
        source: 'content',
        type: 'save-credential',
        params: {
            passkey: {
                id,
                domain: utfToB64url(window.location.hostname),
                credentialId: bytesToB64url(credentialId)
            }
        }
    }
    const { success } = await browser.runtime.sendMessage(message) as RuntimeResponse
    if (!success) throw new Error('Failed to save DID Credential')
}

const getPublicKeyAdditionData = async (publicKeyBuffer: ArrayBuffer) => {
    const publicKey = await crypto.subtle.importKey(
        'spki',
        publicKeyBuffer,
        {
            name: 'ECDSA',
            namedCurve: 'P-256'
        },
        true,
        ['verify']
    )
    const publicJwk = await crypto.subtle.exportKey('jwk', publicKey)
    const patch: DidPatch = {
        publicKeysToAdd: [{
            id: utfToB64url(window.location.hostname),
            type: 'JsonWebKey2020',
            publicKeyJwk: publicJwk,
            purposes: [IonPublicKeyPurpose.Authentication]
        }]
    }
    return { patch, publicJwk }
}
