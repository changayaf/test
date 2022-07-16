import * as React from 'react';

// Material UI
import { Box, Button, Card, CardActions, CardHeader, Container, Grid }  from '@mui/material';

// Organisms
import Link from '@components/organisms/Link';

// Template
import Layout from '@components/template/Layout';

const tests = [
  {
    title: 'Test 1',
    subheader: 'Order alphabetically',
    buttonText: 'Go to test',
    buttonVariant: 'outlined',
    href: '/order-phrase',
  },
  {
    title: 'Test 2',
    subheader: 'Salary calculation',
    buttonText: 'Go to test',
    buttonVariant: 'outlined',
    href: '/salary-to-pay',
  },
  {
    title: 'Test 3',
    subheader: 'Delete duplicates',
    buttonText: 'Go to test',
    buttonVariant: 'outlined',
    href: '/delete-occurrences',
  },
];

const Home = () => {
  return (
    <Layout title="Home">
      <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="flex-end">
            {tests.map((test) => (
              <Grid
                item
                key='order-phrase'
                xs={12}
                sm={6}
                md={4}
              >
                <Card>
                  <CardHeader
                    title={test.title}
                    subheader={test.subheader}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{
                      align: 'center',
                    }}
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                          ? theme.palette.grey[200]
                          : theme.palette.grey[700],
                    }}
                  />
                  <CardActions>
                    <Button
                      fullWidth
                      variant={test.buttonVariant}
                      component={Link}
                      noLinkStyle
                      href={test.href}
                    >
                      {test.buttonText}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>          
      </Box>
      <Link href="/about" color="secondary">
        Go to the about page
      </Link>
    </Layout>
  );
};

export default Home;
