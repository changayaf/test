import * as React from 'react';
import PropTypes from 'prop-types';

// Material UI
import { Alert, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow}  from '@mui/material';

// Atoms
import Loading from '@components/atoms/Loading';

const BugList = ({}) => {
    
    return (
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
    )
}

BugList.propTypes = {
    
};

export default BugList;