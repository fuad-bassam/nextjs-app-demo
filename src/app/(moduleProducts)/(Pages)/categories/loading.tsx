// "use client"
import { Skeleton, Box } from '@mui/material';

const CategoriesLoadingSkeleton = () => {
    // const theme = useTheme();
    //seMediaQuery(theme.breakpoints.down('sm'));
    const isXs = false;

    return (
        <Box sx={{ padding: '20px' }} >
            <Skeleton
                variant="text"
                width="60%"
                height={40}
                sx={{ mb: 2 }}
            />

            <Box sx={{ padding: 0 }}>
                <Skeleton
                    variant="text"
                    width="30%"
                    height={24}
                    sx={{ mb: 4 }}
                />

                <Box sx={{
                    padding: 2,
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '16px',
                    margin: '16px',
                }}>
                    <Box sx={{
                        width: '100%',
                    }}>
                        <Skeleton variant="rectangular" height={36} width={120} />
                    </Box>
                    <Skeleton
                        variant="rectangular"
                        height={56}
                        sx={{
                            flex: isXs ? '1 1 100%' : '1 1 45%',
                            transform: 'none'
                        }}
                    />
                    <Skeleton
                        variant="rectangular"
                        height={56}
                        sx={{
                            flex: isXs ? '1 1 100%' : '1 1 45%',
                            transform: 'none'
                        }}
                    />

                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        gap: '16px',
                        flexDirection: isXs ? 'column' : 'row'
                    }}>
                        <Skeleton variant="rectangular" height={36} width={120} />
                        <Skeleton variant="rectangular" height={36} width={100} />
                    </Box>
                </Box>

                <Box sx={{ mt: 4 }} padding={3}>
                    <Skeleton variant="rounded" height={50} />

                    <Skeleton variant="rounded" height={36} />
                    <Skeleton variant="rounded" height={36} />
                    <Skeleton variant="rounded" height={36} />
                    <Skeleton variant="rounded" height={36} />
                    <Skeleton variant="rounded" height={36} />
                </Box>
            </Box>
        </Box>
    );
};


export default CategoriesLoadingSkeleton;