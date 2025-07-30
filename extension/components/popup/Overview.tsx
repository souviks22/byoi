import type { PopupState } from '@/types/popup'
import type { Did, DidUser } from '@/types/did'
import { Info } from 'lucide-react'
import { Tooltip } from '@mui/material'

export const PREFERRED_DID = 'currently-preferred-did-identity'

export default function Overview({ users, onStateChange, onDidInfo }: {
  users: DidUser[]
  onStateChange: (state: PopupState) => void
  onDidInfo: (user: DidUser) => void
}) {
  const [preferred, setPreferred] = useState<number>(0)
  useEffect(() => {
    (async () => {
      const storage = await browser.storage.local.get(PREFERRED_DID)
      if (!(PREFERRED_DID in storage)) return
      const preferred = storage[PREFERRED_DID] as Did
      const i = users.map(user => user.id).findIndex(did => did === preferred)
      setPreferred(i)
    })()
  }, [users])

  return <>
    <div>
      <h2 id='popup-title' className='text-lg font-semibold text-gray-800 dark:text-neutral-100'>
        Bring Your Own Identity
      </h2>
    </div>
    {users.length ?
      <>
        <div className='mt-4'>
          <p className='text-sm text-gray-600 dark:text-neutral-300 mb-1'>Currently Preferred DID:</p>
          <div className='p-4 border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-[#242628]'>
            <p className='text-sm font-semibold text-gray-900 dark:text-neutral-100'>
              {users.at(preferred)?.profile || users.at(preferred)?.name}
            </p>
            <p className='text-xs text-gray-600 dark:text-neutral-400 break-all'>
              {`${users.at(preferred)?.id.slice(0, 20)}...`}
            </p>
          </div>
        </div>

        <div className='mt-6'>
          <p className='text-sm text-gray-600 dark:text-neutral-300 mb-1'>Switch Identity:</p>
          <ul className='max-h-60 overflow-auto'>
            {users.map((did, i) => (
              <li key={did.id}
                className={`flex justify-between items-center gap-1 w-full text-left px-4 py-2 rounded transition duration-150 text-sm font-medium focus:outline-none
                      ${users.at(preferred)?.id === did.id
                    ? 'bg-blue-100 dark:bg-blue-400/10 text-blue-700 dark:text-blue-300'
                    : 'hover:bg-gray-100 dark:hover:bg-neutral-700 text-gray-900 dark:text-neutral-100'}`}
                onClick={() => {
                  setPreferred(i)
                  browser.storage.local.set({ [PREFERRED_DID]: did.id })
                }}
              >
                <div>
                  <p>{did.profile || did.name}</p>
                  <p className='text-xs text-gray-600 dark:text-neutral-400 break-all'>
                    {`${did.id.slice(0, 20)}...`}
                  </p>
                </div>
                <Tooltip title='More info about this DID' arrow onClick={e => {
                  e.stopPropagation()
                  onDidInfo(did)
                }}>
                  <Info size={16} className='text-gray-500 dark:text-neutral-400' />
                </Tooltip>
              </li>
            ))}
          </ul>
        </div>
      </>
      :
      <p className='text-center text-sm text-gray-600 dark:text-neutral-300 mt-10'>
        First time with DIDs? Create one!
      </p>
    }

    <div className='mt-6'>
      <button
        onClick={() => onStateChange('did-creation')}
        className='w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-sm transition'
      >
        Create New DID
      </button>
    </div>

    <div className='border-t border-gray-200 dark:border-neutral-700 mt-6 pt-4 text-center'>
      <p className='text-xs text-gray-500 dark:text-neutral-400'>
        BYOI Extension v1.0.0
      </p>
    </div>
  </>
}
