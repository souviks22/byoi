import type { DidKeys, DidUser, DidCredentials, DidDocument } from '@/types/did'
import type { RuntimeParams } from '@/types/messaging'

class IonDB {
    private static dbPromise: Promise<IDBDatabase>
    private static requiredStoreNames = ['users', 'keys', 'credentials', 'documents']
    static async getDB() {
        if (IonDB.dbPromise) return IonDB.dbPromise
        return IonDB.dbPromise = new Promise((resolve, reject) => {
            const dbRequest = indexedDB.open('byoi')
            dbRequest.onsuccess = () => resolve(dbRequest.result)
            dbRequest.onerror = () => reject(dbRequest.error)
            dbRequest.onupgradeneeded = () => {
                const db = dbRequest.result
                for (const name of IonDB.requiredStoreNames) {
                    if (!db.objectStoreNames.contains(name)) {
                        db.createObjectStore(name, { keyPath: 'id' })
                    }
                }
            }
        })
    }
}

const save = async (storeName: string, value: object) => {
    const db = await IonDB.getDB()
    const tx = db.transaction(storeName, 'readwrite')
    const store = tx.objectStore(storeName)
    store.put(value)
    return new Promise<void>((resolve, reject) => {
        tx.oncomplete = () => resolve()
        tx.onerror = () => reject(tx.error)
    })
}

const get = async (storeName: string, id: IDBValidKey) => {
    const db = await IonDB.getDB()
    const tx = db.transaction(storeName, 'readonly')
    const store = tx.objectStore(storeName)
    const req = id === '<all_users>' ? store.getAll() : store.get(id)
    return new Promise<any>((resolve, reject) => {
        tx.oncomplete = () => resolve(req.result)
        tx.onerror = () => reject(tx.error)
    })
}

export const saveKeys = async ({ keys }: RuntimeParams) => {
    await save('keys', keys!)
}

export const getKeys = async ({ did }: RuntimeParams) => {
    return await get('keys', did!) as DidKeys
}

export const saveUser = async ({ user }: RuntimeParams) => {
    await save('users', user!)
}

export const getUser = async ({ did }: RuntimeParams) => {
    return await get('users', did!) as DidUser
}

export const saveCredential = async ({ passkey }: RuntimeParams) => {
    const { id, domain, credentialId } = passkey!
    const saved = await get('credentials', id)
    const credentials = (saved || { id, content: {} }) as DidCredentials
    credentials.content[domain] = credentialId!
    await save('credentials', credentials)
}

export const getCredential = async ({ passkey }: RuntimeParams) => {
    const { id, domain } = passkey!
    const saved = await get('credentials', id)
    if (!saved) return null
    const credentials = saved as DidCredentials
    if (!(domain in credentials.content)) return null
    return credentials.content[domain]
}

export const saveDocument = async ({ document }: RuntimeParams) => {
    await save('documents', document!)
}

export const getDocument = async ({ did }: RuntimeParams) => {
    return await get('documents', did!) as DidDocument
}

export const updateDocument = async ({ did, patch }: RuntimeParams) => {
    const document = await getDocument({ did })
    const { publicKeysToAdd = [], idsOfPublicKeysToRemove } = patch!
    const buffer = document.content.publicKeys?.filter(pk => !idsOfPublicKeysToRemove?.includes(pk.id))
    for (const pk of publicKeysToAdd) {
        if (buffer?.filter(ex => ex.id === pk.id).length) throw new Error('Failed to add already existing Public Key')
        buffer?.push(pk)
    }
    document.content.publicKeys = buffer
    await saveDocument({ document })
}
