import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from "@material-ui/core/Grid";
import BrandRenderer from './BrandRenderer';
import AddBrand from './AddBrand';


const useStyles = makeStyles({
  root: {
    width: '95%',
    height: '95%',
  },
  container: {
    maxHeight: 1000,
  },
  head: {
    backgroundColor: "#ffb600",
    color: "#000000",
  }
});

/**
 * This is the main component used to render the brands
 * It fetches the brands via the function getBrands
 */
export default function BrandTable() {
  const classes = useStyles();

  const [brands, setBrands] = useState([]);

  const getBrands = async () => {
    (async () => {
      fetch("http://localhost:3001/brands", {
        method: "GET",
        headers: {"Content-Type": "application/json"}
      }).then(res => res.json())
      .then(json => {setBrands(json);})
    })();
  }

  useEffect(() => {
    getBrands();
  }, [])


  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.head}>
                <h3>Name of the brand</h3>
              </TableCell>
              <TableCell className={classes.head}>
                <h3>Country of the brand</h3>
              </TableCell>
              <TableCell className={classes.head}>
                <h3>Description of the brand</h3>
              </TableCell>
              <TableCell className={classes.head}>
                <h3>Created at</h3>
              </TableCell>
              <TableCell className={classes.head}>
                <h3>See sneakers</h3>
              </TableCell>
              <TableCell className={classes.head}>
                <h3>Edit brand</h3>
              </TableCell>
              <TableCell className={classes.head}>
                <h3>Delete brand</h3>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <BrandRenderer refreshFunction={getBrands} brands={brands} />
          </TableBody>
        </Table>
      </TableContainer>
      <Grid
        container
        justify="center"
        alignItems="center"
      >
        <AddBrand refreshFunction={getBrands} />
      </Grid>
    </Paper>
  );
}
