
import { useState } from 'react';
import {useFormik} from "formik";
import * as Yup from 'yup';
import axios from 'axios';

// Material UI
import { Alert, AlertTitle, Box, Button, Container, TextField, Typography } from '@mui/material';

// Organisms
import Link from '@components/organisms/Link';

// Template
import Layout from '../components/template/Layout';

const DeleteOccurrences = () => {

    const [errorMsg, setErrorMsg] = useState('');
    const [responseMsg, setResponseMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const validationSchema = Yup.object({
        numberArray: Yup
          .string('Type the array of numbers separated by commas (",")')
          .trim()
          .matches( /^[0-9,]+$/ , "Only number and commas are allowed")
          .required('An array of numbers is required'),
    });
    
    const formik = useFormik({
        initialValues: {
            numberArray: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            setErrorMsg('');
            setResponseMsg('');
            console.log(values.numberArray)       
            try {
                await axios.get(`/api/delete-occurrences`,{
                    params: {
                        numberArray: values.numberArray,
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
        <Layout title="Delete occurrences">
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
                    <AlertTitle>Delete Duplicates.</AlertTitle>
                    <strong>{responseMsg}</strong>
                </Alert>}
                <TextField
                    id="numberArray"
                    name="numberArray"
                    label="Array of numbers separated by commas (',')"
                    fullWidth
                    margin="normal"                    
                    autoComplete="numberArray"
                    helperText={formik.touched.numberArray && formik.errors.numberArray}
                    error={Boolean(formik.touched.numberArray && formik.errors.numberArray)}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.numberArray}
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

export default DeleteOccurrences;