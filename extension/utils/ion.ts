import { IonKey, IonRequest, LocalSigner } from '@decentralized-identity/ion-sdk'
import type { Did, DidPatch } from '@/types/did'

export const createIonDid = async () => {
    const [recoveryPublicJwk, recoveryPrivateJwk] = await IonKey.generateEs256kOperationKeyPair()
    const [updatePublicJwk, updatePrivateJwk] = await IonKey.generateEs256kOperationKeyPair()
    const createRequest = await IonRequest.createCreateRequest({
        recoveryKey: recoveryPublicJwk,
        updateKey: updatePublicJwk,
        document: {
            publicKeys: []
        }
    })
    const did = await anchorCreation(createRequest)
    await saveDidJwk({
        id: did,
        recoveryPublicJwk,
        recoveryPrivateJwk,
        updatePublicJwk,
        updatePrivateJwk
    })
    return did
}

export const updateIonDid = async (did: Did, patch: DidPatch) => {
    const keys = await getDidJwk(did)
    const [newUpdatePublicJwk, newUpdatePrivateJwk] = await IonKey.generateEs256kOperationKeyPair()
    const updateRequest = await IonRequest.createUpdateRequest({
        didSuffix: did.split(':').pop()!,
        updatePublicKey: keys.updatePublicJwk,
        signer: LocalSigner.create(keys.updatePrivateJwk),
        nextUpdatePublicKey: newUpdatePublicJwk,
        ...patch
    })
    await anchorUpdate(updateRequest)
    await saveDidJwk({
        ...keys,
        updatePublicJwk: newUpdatePublicJwk,
        updatePrivateJwk: newUpdatePrivateJwk
    })
}
