import { useState } from 'react';
import {useFormik} from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import moment from 'moment';

// Material UI
import { Alert, AlertTitle, Box, Button, Container, Grid, Stack, TextField, Typography } from '@mui/material';

// Organisms
import Link from '@components/organisms/Link';

// Template
import Layout from '@components/template/Layout';

const SalaryToPay = () => {

    const [errorMsg, setErrorMsg] = useState('');
    const [responseMsg, setResponseMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const validationSchema = Yup.object({
        startTime: Yup.string().required("Start time cannot be empty"),
        endTime: Yup
            .string()
            .required("End time cannot be empty")
            .test("Is-greater", "End time should be greater", function(value) {
                const { startTime } = this.parent;
                return moment(value, "HH:mm").isSameOrAfter(moment(startTime, "HH:mm"));
            }),
        salaryHours: Yup
            .number()
            .typeError('You must specify a number')
            .min(4, 'Min value 4.')
            .max(30, 'Max value 30.'),
        multiplier: Yup
            .number()
            .typeError('You must specify a number')
            .min(1, 'Min value 1.')
            .max(10, 'Max value 10.'),
    });
    const formik = useFormik({
        initialValues: {
            startTime: "08:00",
            endTime: "18:00",
            salaryHours: 12,
            multiplier: 1,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            setErrorMsg('');
            setResponseMsg('');         
            try {
                await axios.get(`/api/salary-to-pay`,{
                    params: {
                        startTime: values.startTime,
                        endTime: values.endTime,
                        salaryHours: values.salaryHours,
                        multiplier: values.multiplier,
                    },
                })
                .then(function (response) {
                    setResponseMsg(response.data.msg);
                })
                .catch((error) => {
                    if (error?.message) {
                        setErrorMsg(error.message);
                      } else {
                        console.error('An unexpected error happened:', error);
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
        <Layout title="Salary to pay">
            <Container maxWidth="sm">
            <form onSubmit={formik.handleSubmit}>
                <Box sx={{ my: 3 }}>
                <Typography
                    color="textPrimary"
                    variant="h4"
                >
                    Salary calculation
                </Typography>
                </Box>
                {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
                {responseMsg && <Alert variant="filled" severity="success">
                    <AlertTitle>Salary to be paid.</AlertTitle>
                    The worker will receive a salary of $ <strong>{responseMsg}</strong>
                </Alert>}
                <Container sx={{ py: 1 }} maxWidth="md">
                        <Grid item key={1} xs={12} sm={6} md={4}>
                            <Typography
                                color="textPrimary"
                                variant="h8"
                            >
                                Start Time
                            </Typography>
                            <TextField
                                id="startTime"
                                name="startTime"
                                type="time"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                                fullWidth
                                error={Boolean(formik.touched.startTime && formik.errors.startTime)}
                                helperText={formik.touched.startTime && formik.errors.startTime}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.startTime}
                            />
                        </Grid>
                        <Grid item key={2} xs={12} sm={6} md={4}>
                            <Typography
                                color="textPrimary"
                                variant="h8"
                            >
                                End Time
                            </Typography>
                            <TextField
                                id="endTime"
                                name="endTime"
                                type="time"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                                fullWidth
                                error={Boolean(formik.touched.endTime && formik.errors.endTime)}
                                helperText={formik.touched.endTime && formik.errors.endTime}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.endTime}
                            />
                        </Grid>
                        <Grid item key={3} xs={12} sm={6} md={4}>
                            <Typography
                                color="textPrimary"
                                variant="h8"
                            >
                                Salary to pay
                            </Typography>
                            <TextField
                                id="salaryHours"
                                name="salaryHours"
                                type="number"
                                fullWidth
                                error={Boolean(formik.touched.salaryHours && formik.errors.salaryHours)}
                                helperText={formik.touched.salaryHours && formik.errors.salaryHours}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.salaryHours}
                            />
                            <Typography
                                color="textPrimary"
                                variant="h8"
                            >
                                Multiplying factor
                            </Typography>
                            <TextField
                                id="multiplier"
                                name="multiplier"
                                type="number"
                                fullWidth
                                error={Boolean(formik.touched.multiplier && formik.errors.multiplier)}
                                helperText={formik.touched.multiplier && formik.errors.multiplier}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.multiplier}
                            />
                    </Grid>
                </Container>
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

export default SalaryToPay