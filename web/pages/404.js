import Head from 'next/head';
import NextLink from 'next/link';
import Image from 'next/image'
import { Box, Button, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NotFound = () => (
  <>
    <Head>
      <title>
        Test | 404
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        minHeight: '100%'
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Image
              alt="Under development"
              src="/static/images/undraw_page_not_found_su7k.svg"
             
              layout='fill'
            />
          </Box>          
        </Box>
        <NextLink
            href="/"
            passHref
          >
            <Button
              component="a"
              startIcon={(<ArrowBackIcon fontSize="small" />)}
              sx={{ mt: 3 }}
              variant="contained"
            >
              Go back to home
            </Button>
          </NextLink>
      </Container>
    </Box>
  </>
);

export default NotFound;
