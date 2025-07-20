import { Base64Url } from '@/types/did'
import * as uint8arrays from 'uint8arrays'

export const utfToB64url = (str: string) => {
    const bytes = uint8arrays.fromString(str, 'utf-8')
    return uint8arrays.toString(bytes, 'base64url') as Base64Url
}

export const b64urlToUtf = (b64: string) => {
    const bytes = uint8arrays.fromString(b64, 'base64url')
    return uint8arrays.toString(bytes, 'utf-8')
}

export const bytesToB64url = (buffer: ArrayBuffer) => {
    const bytes = new Uint8Array(buffer)
    return uint8arrays.toString(bytes, 'base64url') as Base64Url
}

export const b64urlToBytes = (str: Base64Url) => {
    return uint8arrays.fromString(str, 'base64url')
}