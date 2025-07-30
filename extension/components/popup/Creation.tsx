import type { PopupState, User, UserPropertiesError } from '@/types/popup'
import type { DidUser } from '@/types/did'
import { TextField, CircularProgress, Tooltip } from '@mui/material'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { PREFERRED_DID } from './Overview'

export default function Creation({ onStateChange, onUserCreation }: {
    onStateChange: (state: PopupState) => void
    onUserCreation: (user: DidUser) => void
}) {
    const [creating, setCreating] = useState<boolean>(false)
    const [created, setCreated] = useState<boolean>(false)
    const [user, setUser] = useState<User>()
    const [error, setError] = useState<UserPropertiesError>()

    const textChangeHandler = (key: string) => {
        return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setUser(user => ({
                ...user,
                [key]: e.target.value
            }))
        }
    }

    const userIsValid = () => {
        const error: UserPropertiesError = {
            name: !user || !user.name?.trim() || user.name.trim().includes(' '),
            displayName: !user || !user.displayName?.trim(),
            email: !!user?.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email.trim()),
            profile: !!user?.profile && user.profile.trim().length < 3
        }
        setError(error)
        return !Object.values(error).some(e => e)
    }

    const didCreationHandler = async (e: React.MouseEvent) => {
        e.preventDefault()
        if (!userIsValid()) return
        setCreating(true)
        const did = await createIonDid({
            name: user?.name!,
            displayName: user?.displayName!,
            ...user
        })
        await browser.storage.local.set({ [PREFERRED_DID]: did.id })
        onUserCreation(did)
        setCreated(true)
        onStateChange('did-overview')
    }

    return !creating ?
        <>
            <div className='flex items-center gap-3'>
                <Tooltip title='Click to go back' arrow onClick={() => onStateChange('did-overview')}>
                    <ArrowLeft size={25} className='p-0.5 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-700 text-gray-900 dark:text-neutral-100' />
                </Tooltip>
                <h2 className='text-lg font-semibold text-gray-800 dark:text-neutral-100'>
                    Create New Identity
                </h2>
            </div>

            <form className='flex flex-col gap-5 py-10'>
                <Tooltip title='This is an one-word identifier linked to your DID, e.g., souviks22, _mistletoee._ etc.'>
                    <TextField
                        autoFocus
                        fullWidth
                        size='small'
                        variant='outlined'
                        label='*Username'
                        value={user?.name}
                        onChange={textChangeHandler('name')}
                        error={error?.name}
                        helperText={error?.name ? 'Username is required' : ''}
                    />
                </Tooltip>

                <Tooltip title='This is your common family name, e.g., Souvik Sarkar, Bristi Maity etc.'>
                    <TextField
                        fullWidth
                        size='small'
                        variant='outlined'
                        label='*Fullname'
                        value={user?.displayName}
                        onChange={textChangeHandler('displayName')}
                        error={error?.displayName}
                        helperText={error?.displayName ? 'Fullname is required' : ''}
                    />
                </Tooltip>

                <Tooltip title='Optional email ID, e.g., souviksarkar2k3@gmail.com, bristimaity03@gmail.com etc.'>
                    <TextField
                        fullWidth
                        size='small'
                        variant='outlined'
                        label='Email'
                        value={user?.email}
                        onChange={textChangeHandler('email')}
                        error={error?.email}
                        helperText={error?.email ? 'Enter a valid email address' : ''}
                    />
                </Tooltip>

                <Tooltip title='Optional profile domain to classify your identities, e.g., Personal, Work etc.'>
                    <TextField
                        fullWidth
                        size='small'
                        variant='outlined'
                        label='Profile'
                        value={user?.profile}
                        onChange={textChangeHandler('profile')}
                        error={error?.profile}
                        helperText={error?.profile ? 'Enter a longer user profile' : ''}
                    />
                </Tooltip>
                <div className='py-10'>
                    <button
                        onClick={didCreationHandler}
                        className='px-4 py-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded'
                        type='submit'
                    >
                        Create
                    </button>
                    <p className='py-5 text-center'>
                        A brand new Decentralized Identifier (DID) will be generated
                    </p>
                </div>
            </form>
        </>
        :
        <div className='flex flex-col items-center justify-center h-full text-center'>
            {!created ?
                <>
                    <CircularProgress className='text-blue-500 mb-4' />
                    <p className='text-sm text-gray-700 dark:text-neutral-200'>
                        Creating your new identity…
                    </p>
                </>
                :
                <>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className='text-green-500 text-2xl mb-2'
                    >
                        ✅
                    </motion.div>
                    <p className='text-sm font-semibold text-gray-800 dark:text-neutral-100'>
                        DID created successfully!
                    </p>
                </>
            }
        </div>
}