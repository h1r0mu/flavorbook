import PropTypes from "prop-types";
import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const parseDate = (date) => new Date(date).toLocaleString();
const parseStoreInfo = (row) => ({ ...row, date: parseDate(row.date) });

export default function StoreInfoTable(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="store info table">
        <TableHead>
          <TableRow>
            {props.headers.map((column) => (
              <TableCell key={column}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(props.rows).map(([date, row]) => (
            <TableRow key={date} onClick={() => props.onClick(row.tiles)}>
              {props.headers.map((column) => (
                <TableCell key={date + column} align="center">
                  {parseStoreInfo(row.storeInfo)[column]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
StoreInfoTable.propTypes = {
  headers: PropTypes.array,
  rows: PropTypes.object,
  onClick: PropTypes.func,
};
