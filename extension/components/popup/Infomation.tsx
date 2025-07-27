import type { DidUser } from '@/types/did'
import type { PopupState } from '@/types/popup'
import { Card, CardContent, Typography, Box, Avatar, Grid, Divider, Tooltip, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import { Mail, FileText, ArrowLeft, Copy, Check } from 'lucide-react'

export default function Infomation({ user, onStateChange }: {
    user?: DidUser
    onStateChange: (state: PopupState) => void
}) {
    const [sites, setSites] = useState<string[]>([])
    const [copiedDid, setCopiedDid] = useState<boolean>(false)

    useEffect(() => {
        (async () => {
            const document = await resolveIonDid(user?.id!)
            setSites(document.content.publicKeys!.map(pk => b64urlToUtf(pk.id)))
        })()
    }, [])

    const copyHandler = async (event: React.MouseEvent) => {
        event.stopPropagation()
        await navigator.clipboard.writeText(user?.id!)
        setCopiedDid(true)
        setTimeout(() => setCopiedDid(false), 1500)
    }

    return <>
        <div className='flex items-center gap-3'>
            <Tooltip title='Click to go back' arrow onClick={() => onStateChange('did-overview')}>
                <ArrowLeft size={25} className='p-0.5 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-700 text-gray-900 dark:text-neutral-100' />
            </Tooltip>
            <h2 className='text-lg font-semibold text-gray-800 dark:text-neutral-100'>
                {user?.displayName}
            </h2>
        </div>
        <Card elevation={3} sx={{ borderRadius: 2, bgcolor: 'background.paper', color: 'text.primary', marginBlock: 3 }}>
            <CardContent>
                <Box display='flex' alignItems='center' gap={2} mb={2}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                        {user?.displayName?.[0]?.toUpperCase() || '?'}
                    </Avatar>
                    <Box>
                        <Typography variant='h6' fontWeight='bold'>
                            {user?.displayName || 'Unnamed'}
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            @{user?.name}
                        </Typography>
                    </Box>
                </Box>

                <Grid container spacing={2}>
                    <Grid size={12}>
                        <Box display='flex' alignItems='center' gap={1}>
                            <Mail size={18} />
                            <Typography variant='body2'>{user?.email || 'No email provided'}</Typography>
                        </Box>
                    </Grid>

                    <Grid size={12}>
                        <Box display='flex' alignItems='center' gap={1}>
                            <FileText size={18} />
                            <Typography variant='body2'>{user?.profile || 'No profile description'}</Typography>
                        </Box>
                    </Grid>

                    <Grid size={12}>
                        <Divider sx={{ my: 1 }} />
                        <Box display='flex' alignItems='center' justifyContent='space-between'>
                            <Typography variant='caption' color='text.secondary'>
                                DID:
                            </Typography>
                            <Typography variant='caption' sx={{ maxWidth: 250, overflowWrap: 'break-word' }}>
                                <code>{user?.id}</code>
                                <Tooltip title={copiedDid ? 'Copied!' : 'Copy DID'} arrow onClick={copyHandler}>
                                    <button className='absolute px-2'>
                                        {copiedDid ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                </Tooltip>
                            </Typography>
                        </Box>
                    </Grid>

                    {sites.length > 0 && (
                        <Grid size={12}>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant='subtitle2' gutterBottom>
                                Websites Signed In with
                            </Typography>
                            <List dense disablePadding>
                                {sites.map((site, i) => (
                                    <ListItem key={i} disableGutters>
                                        <ListItemAvatar>
                                            <a href={`https://${site}`} target='_blank'>
                                                <Avatar src={`https://${site}/favicon.ico`} alt={site} sx={{ width: 30, height: 30 }} />
                                            </a>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={site.split('.').slice(1, 2)}
                                            secondary={site}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                    )}
                </Grid>
            </CardContent>
        </Card>
    </>
}