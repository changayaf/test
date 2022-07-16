import Head from 'next/head';
import PropTypes from 'prop-types';

// Material UI
import { Box, Container, Typography }  from '@mui/material';

// Molecules
import Copyright from '@components/molecules/Copyright';

const Layout = ({ children, title }) => {    

    return (
        <>
        <Head>
            <title>
                Test | {title}
            </title>
        </Head> 
        <Container maxWidth="lg">
            <Box
            sx={{
            my: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Test project to apply to a programming group
                </Typography>
                { children }
                <Copyright />
            </Box>
        </Container>
        </>
    )
};

Layout.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
};

export default Layout;