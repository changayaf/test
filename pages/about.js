import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// Organisms
import Link from '@components/organisms/Link';

// Template
import Layout from '@components/template/Layout';

const About = () => {
  return (
    <Layout title="Home">  
      <Stack direction="row" spacing={2}>
        <Avatar 
          alt="Yusnier Acosta Fdez" src="/static/images/avatar/1.webp"
          sx={{ width: 56, height: 56 }}
        />
      </Stack>
      <Box maxWidth="sm">
        <Button variant="contained" component={Link} noLinkStyle href="/">
          Go to the home page
        </Button>
      </Box>
    </Layout>
  );
};

export default About;