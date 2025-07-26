import type { DidDocument, DidUser } from '@/types/did'
import type { PopupState } from '@/types/popup'
import { Card, CardContent, Typography, Box, Avatar, Grid, Divider, Tooltip, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import { Mail, FileText } from 'lucide-react'
import { ArrowLeft } from 'lucide-react'

export default function Infomation({ user, onStateChange }: {
    user?: DidUser
    onStateChange: (state: PopupState) => void
}) {
    const [sites, setSites] = useState<string[]>([])
    useEffect(() => {
        (async () => {
            const document = await resolveIonDid(user?.id!)
            setSites(document.content.publicKeys!.map(pk => b64urlToUtf(pk.id)))
        })()
    }, [])
    return <>
        <div className='flex items-center gap-3'>
            <Tooltip title='Click to go back' arrow onClick={() => onStateChange('did-overview')}>
                <ArrowLeft size={25} className='p-0.5 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-700 text-gray-900 dark:text-neutral-100' />
            </Tooltip>
            <h2 className='text-lg font-semibold text-gray-800 dark:text-neutral-100'>
                Create New Identity
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
                            <Typography variant='caption' sx={{ maxWidth: 200, overflowWrap: 'break-word' }}>
                                {user?.id}
                            </Typography>
                        </Box>
                    </Grid>

                    {sites.length > 0 && (
                        <Grid size={12}>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant='subtitle2' gutterBottom>
                                Websites Signed In With This DID
                            </Typography>
                            <List dense disablePadding>
                                {sites.map((site, i) => (
                                    <ListItem key={i} disableGutters>
                                        <ListItemAvatar>
                                            <Avatar src={'https://perishablepress.com/wp/wp-content/images/2021/favicon-standard.png'} alt={site} sx={{ width: 24, height: 24 }} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={site.split('.').slice(1, 2)}
                                            secondary={site}
                                            primaryTypographyProps={{ variant: 'body2' }}
                                            secondaryTypographyProps={{ variant: 'caption' }}
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