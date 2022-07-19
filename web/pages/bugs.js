import { useState } from 'react';
import {useFormik} from "formik";
import * as Yup from 'yup';
import axios from 'axios';

// Material UI
import { Alert, Box, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Select, MenuItem, TextField, Button, Stack, InputLabel, FormControl, Grid, AlertTitle }  from '@mui/material';

// Atoms
import Loading from '@components/atoms/Loading';

// Organisms
import Link from '@components/organisms/Link';

// Template
import Layout from '@components/template/Layout';

function SpaceBar() {
  return (
    <Box
      sx={{
        height: 20,
      }}
    />
  );
}

const Home = ({userList, projectList}) => {
  const [listBug, setListBug] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [responseMsg, setResponseMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState('');
  const [project, setProject] = useState('');

  const handleChangeUserSelect = (event) => {
    setUser(event.target.value);
  };
  const handleChangeProjectSelect = (event) => {
    setProject(event.target.value);
  };

  const validationSchema = Yup.object({ 
  });
  const formik = useFormik({
      initialValues: {
          user: null,
          project: null,
          start_date: null,
          end_date: null
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
          setLoading(true);
          setErrorMsg('');
          setResponseMsg('');
          console.log(user)
          try {
              await axios.get(`http://localhost:8000/bugs`,{
                  params: {
                    user_id: user,
                    project_id: project,
                    start_date: values.start_date,
                    end_date: values.end_date,
                  },
              })
              .then(function (response) {
                console.log(response.data)
                setListBug(response.data.data);
              })
              .catch((error) => {
                  console.log(error.response.data)
                  if (error.response.data?.message) {
                      setErrorMsg(error.response.data.message);
                    } else {
                      console.error('An unexpected error happened:', error.response.data);
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
    <Layout title="Bugs">
     
            <form onSubmit={formik.handleSubmit}>
              {errorMsg && <Alert severity="error">{errorMsg}</Alert>}              
              <Container maxWidth="md" component="main">
              <Grid container alignItems="flex-end">
                <FormControl fullWidth>
                  <InputLabel id="userLabel">User</InputLabel>
                  <Select
                    id="user"
                    label="User"
                    labelId="userLabel"
                    onChange={handleChangeUserSelect}
                    onBlur={formik.handleBlur}
                    value={user}
                    error={Boolean(formik.touched.user && formik.errors.user)}
                    helperText={formik.touched.user && formik.errors.user}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {userList.data.map((row) => ( 
                      <MenuItem value={row.id}>{`${row.name} ${row.surname}`}</MenuItem>
                    ))}
                  </Select>
                  <SpaceBar />
                </FormControl>
                <FormControl fullWidth>                  
                  <InputLabel id="projectLabel">Project</InputLabel>
                  <Select
                    id='project'
                    label="Project"
                    labelId="projectLabel"
                    value={project}
                    onChange={handleChangeProjectSelect}
                    onBlur={formik.handleBlur}
                    error={Boolean(formik.touched.project && formik.errors.project)}
                    helperText={formik.touched.project && formik.errors.project}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {projectList.data.map((row) => ( 
                      <MenuItem value={row.id}>{row.name}</MenuItem>
                    ))}
                  </Select>
                  <SpaceBar />               
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    id="start_date"
                    label="Start date"
                    type="datetime-local"
                    defaultValue={formik.values.start_date}s
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={Boolean(formik.touched.start_date && formik.errors.start_date)}
                    helperText={formik.touched.start_date && formik.errors.start_date}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.start_date}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <Box
                    sx={{
                      height: 20
                    }}
                  />
                  <TextField
                    id="end_date"
                    label="End date"
                    type="datetime-local"
                    defaultValue={formik.values.end_date}s
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={Boolean(formik.touched.end_date && formik.errors.end_date)}
                    helperText={formik.touched.end_date && formik.errors.end_date}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.end_date}
                  />
                </FormControl>
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
         <Container maxWidth="md" component="main">
          {loading ? (
            <Loading />
          ) : (
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Username</TableCell>
                  <TableCell align="right">Project</TableCell>
                  <TableCell align="right">Creation Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listBug.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.description}
                    </TableCell>
                    <TableCell align="right">{row.username}</TableCell>
                    <TableCell align="right">{row.project}</TableCell>
                    <TableCell align="right">{row.CreationDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          )}          
        </Container> 
      <Link href="/" color="secondary">
        Go to the home page
      </Link>
    </Layout>
  );
};

export async function getServerSideProps() {
  const resUserList = await fetch(`http://localhost:8000/users`);
  const userList = await resUserList.json();
  const resProjectList = await fetch(`http://localhost:8000/projects`);
  const projectList = await resProjectList.json();
  // Pass data to the page via props
  return { props: { userList, projectList } }
}


export default Home;
