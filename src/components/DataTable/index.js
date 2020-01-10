import React from 'react';
import Table from '@material-ui/core/Table';
import TablePagination from '@material-ui/core/TablePagination';
import { makeStyles } from '@material-ui/core/styles';

import TableHeader from './TableHeader';
import TableBody from './TableBody';


const useStyles = makeStyles(theme => ({
  table: {
    tableLayout: 'fixed'
  },
}));


export default function DataTable({ list, order, orderBy, handleChangePage, headCells, rowsPerPage, page, handleChangeRowsPerPage,handleRequestSort, colgroupRender, rowRender}){
  const classes = useStyles();
  return (
    <React.Fragment>
    <Table className={classes.Table} aria-label="simple table">
          {colgroupRender && colgroupRender()}
          <TableHeader
            classes={{}}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            headCells={headCells}
          />
          <TableBody 
            list={list}
            currentSortColumn={headCells.find(cell => cell.id === orderBy)}
            order={order}
            beginIndex={page * rowsPerPage}
            endIndex={page * rowsPerPage + rowsPerPage}
            rowRender={rowRender}
          />
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={list.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    </React.Fragment>
  );
}