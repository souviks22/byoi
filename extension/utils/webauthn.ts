import type { AttestationParams, AssertionParams } from "@/types/passkey"

export const createPasskey = async ({ user, challenge }: AttestationParams) => {
    const credential = await navigator.credentials.create({
        publicKey: {
            user,
            challenge,
            pubKeyCredParams: [{
                type: 'public-key',
                alg: -7
            }],
            rp: { name: 'BYOI SSI Wallet' },
            attestation: 'indirect',
            authenticatorSelection: {
                userVerification: 'required'
            },
            timeout: 60000
        }
    }) as PublicKeyCredential
    return {
        credentialId: new Uint8Array(credential.rawId),
        response: credential.response as AuthenticatorAttestationResponse
    }
}

export const getPasskey = async ({ challenge, credentialId }: AssertionParams) => {
    const credential = await navigator.credentials.get({
        publicKey: {
            challenge,

            allowCredentials: [{
                id: credentialId,
                type: 'public-key'
            }],
            userVerification: 'required',
            timeout: 60000
        }
    }) as PublicKeyCredential
    return {
        response: credential.response as AuthenticatorAssertionResponse
    }
}