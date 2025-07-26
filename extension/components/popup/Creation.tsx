import type { PopupState, User, UserError } from '@/types/popup'
import { TextField, CircularProgress, Tooltip } from '@mui/material'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

export default function Creation({ onStateChange }: {
    onStateChange: (state: PopupState) => void
}) {
    const [creating, setCreating] = useState<boolean>(false)
    const [created, setCreated] = useState<boolean>(false)
    const [user, setUser] = useState<User>()
    const [error, setError] = useState<UserError>()

    const userIsValid = () => {
        const error: UserError = {
            name: !user || !user.name?.trim() || user.name.trim().includes(' '),
            displayName: !user || !user.displayName?.trim(),
            email: !!user?.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email.trim()),
            profile: !!user?.profile && user.profile.trim().length < 3
        }
        setError(error)
        return !Object.values(error).some(e => e)
    }

    const textChangeHandler = (key: string) => {
        return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setUser(user => ({
                ...user,
                [key]: e.target.value
            }))
        }
    }

    const didCreationHandler = () => {
        if (!userIsValid()) return
        setCreating(true)
        setCreated(true)
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

            <div className='flex flex-col gap-3 py-10'>
                <Tooltip title='This is a readable unique identifier locally linked to your DID, e.g., souviks22, _mistletoee._ etc.' arrow>
                    <TextField
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

                <Tooltip title='This is formally your legal name, e.g., Souvik Sarkar, Bristi Maity etc.' arrow>
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

                <Tooltip title='Optional email ID, e.g., souviksarkar2k3@gmail.com, bristimaity03@gmail.com etc.' arrow>
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

                <Tooltip title='Optional profile domain to classify your identities, e.g., Personal, Work etc.' arrow>
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
            </div>
            <button
                onClick={didCreationHandler}
                className='px-4 py-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded'
            >
                Create
            </button>
            <p className='py-5 text-center'>
                A brand new Decentralized Identifier (DID) will be generated afterwards
            </p>
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