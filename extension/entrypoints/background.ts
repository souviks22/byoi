import type { RuntimeMessage, RuntimeParams, RuntimeResponse } from '@/types/messaging'

const tasks: { [key: string]: (args: RuntimeParams) => Promise<any> } = {
	'save-keys': saveKeys,
	'get-keys': getKeys,
	'save-user': saveUser,
	'get-user': getUser,
	'save-did': saveDocument,
	'get-did': getDocument,
	'update-did': updateDocument
}

export default defineBackground(() => {
	console.log('Hello background!', { id: browser.runtime.id })
	browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
		const { type, params } = message as RuntimeMessage
		tasks[type](params)
			.then(data => {
				const response: RuntimeResponse = { success: true, data }
				sendResponse(response)
			})
			.catch(error => {
				const response: RuntimeResponse = { success: false, error }
				sendResponse(response)
			})
		return true
	})
})
