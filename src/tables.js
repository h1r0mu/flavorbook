import PropTypes from "prop-types";
import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

export default function StoreInfoTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {Object.entries(props.rows).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell component="th" scope="row">
                {key}
              </TableCell>
              <TableCell align="left">{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
StoreInfoTable.propTypes = {
  rows: PropTypes.object,
};
