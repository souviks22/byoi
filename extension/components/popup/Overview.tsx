import type { PopupState } from '@/types/popup'
import { Info } from 'lucide-react'
import { Tooltip } from '@mui/material'

const sampleDIDs = [
  { id: 'did:ion:abc123', label: 'Personal' },
  { id: 'did:ion:def456', label: 'Work' },
  { id: 'did:ion:ghi789', label: 'Anonymous' },
]

export default function Overview({ onStateChange }: {
  onStateChange: (state: PopupState) => void
}) {
  const [currentDID, setCurrentDID] = useState(sampleDIDs[0])
  return <>
    <div>
      <h2 id='popup-title' className='text-lg font-semibold text-gray-800 dark:text-neutral-100'>
        Your Digital Identity
      </h2>
    </div>

    <div className='mt-4'>
      <p className='text-sm text-gray-600 dark:text-neutral-300 mb-1'>Currently Active DID:</p>
      <div className='p-4 border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-[#242628]'>
        <p className='text-sm font-semibold text-gray-900 dark:text-neutral-100'>
          {currentDID.label}
        </p>
        <p className='text-xs text-gray-600 dark:text-neutral-400 break-all'>
          {currentDID.id}
        </p>
      </div>
    </div>

    <div className='mt-6'>
      <p className='text-sm text-gray-600 dark:text-neutral-300 mb-1'>Switch Identity:</p>
      <ul>
        {sampleDIDs.map((did) => (
          <li key={did.id}
            className={`flex justify-between items-center gap-1 w-full text-left px-4 py-2 rounded transition duration-150 text-sm font-medium focus:outline-none
                      ${currentDID.id === did.id
                ? 'bg-blue-100 dark:bg-blue-400/10 text-blue-700 dark:text-blue-300'
                : 'hover:bg-gray-100 dark:hover:bg-neutral-700 text-gray-900 dark:text-neutral-100'}`}
            onClick={() => setCurrentDID(did)}
          >
            <div>
              <p>{did.label}</p>
              <p className='text-xs text-gray-600 dark:text-neutral-400 break-all'>
                {did.id}
              </p>
            </div>
            <Tooltip title='More info about this DID' arrow onClick={e => e.stopPropagation()}>
              <Info size={16} className='text-gray-500 dark:text-neutral-400' />
            </Tooltip>
          </li>
        ))}
      </ul>
    </div>

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
