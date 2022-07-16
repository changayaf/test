import { useState } from 'react';
import {useFormik} from "formik";
import * as Yup from 'yup';
import axios from 'axios';

// Material UI
import { Alert, AlertTitle, Box, Button, Container, TextField, Typography } from '@mui/material';

// Organisms
import Link from '@components/organisms/Link';

// Template
import Layout from '@components/template/Layout';

const OrderPhrase = () => {

    const [errorMsg, setErrorMsg] = useState('');
    const [responseMsg, setResponseMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const validationSchema = Yup.object({
        phrase: Yup
          .string('Type the phrase')
          .trim()
          .matches( /^[a-z ]+$/ , "Only lowercase letters are allowed")
          .required('An phrase is required'),
    });
    const formik = useFormik({
        initialValues: {
            phrase: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            setErrorMsg('');
            setResponseMsg('');         
            try {
                await axios.get(`/api/order-phrase`,{
                    params: {
                        phrase: values.phrase,
                    },
                })
                .then(function (response) {
                    setResponseMsg(response.data.msg);
                })
                .catch((error) => {
                    if (error.data?.error) {
                        setErrorMsg(error.data.error);
                      } else {
                        console.error('An unexpected error happened:', error.data);
                        setErrorMsg('An unexpected error happened');
                      };                
                })
            } catch (error) {
                setErrorMsg('An unexpected error happened');
            };
            setLoading(false);
        }
    });

    return (
        <Layout title="Order phrase">
            <Container maxWidth="sm">
            <form onSubmit={formik.handleSubmit}>
                <Box sx={{ my: 3 }}>
                <Typography
                    color="textPrimary"
                    variant="h4"
                >
                    Order alphabetically
                </Typography>
                </Box>
                {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
                {responseMsg && <Alert variant="filled" severity="success">
                    <AlertTitle>Orderly phrase.</AlertTitle>
                    <strong>{responseMsg}</strong>
                </Alert>}
                <TextField
                    error={Boolean(formik.touched.phrase && formik.errors.phrase)}
                    fullWidth
                    helperText={formik.touched.phrase && formik.errors.phrase}
                    margin="normal"
                    id="phrase"
                    name="phrase"
                    label="Phrase"
                    autoComplete="phrase"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.phrase}
                    variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                    <Button
                        color="primary"
                        disabled={loading}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                    >
                        Send
                    </Button>
                </Box>
            </form>
            </Container>
            <Link href="/" color="secondary">
                Go to the home page
            </Link>
        </Layout>
    );
};

export default OrderPhrase;