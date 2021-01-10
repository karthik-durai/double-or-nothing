import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  makeStyles,
  TableSortLabel,
} from "@material-ui/core";
import { actions } from "../store/store";
import { connect } from "react-redux";

const headCells = [
  { id: "player", numeric: false, disablePadding: true, label: "Players" },
  { id: "avatar", numeric: true, disablePadding: false, label: "Avatar" },
  { id: "bets", numeric: true, disablePadding: false, label: "Bets" },
  { id: "wins", numeric: true, disablePadding: false, label: "Wins" },
  { id: "lose", numeric: true, disablePadding: false, label: "Lose" },
  { id: "price", numeric: true, disablePadding: false, label: "Price" },
];

const useStyles = makeStyles(() => ({
  img: {
    width: "50px",
    height: "50px",
  },
}));

function UserTable({ data, userToggle, users }) {
  const styles = useStyles();
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    setSelectedUsers(users.filter((user) => user.selected));
  }, [users]);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" />
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? "right" : "left"}
                sortDirection={"asc"}
              >
                {headCell.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => {
            return (
              <TableRow key={row.Name}>
                <TableCell padding="checkbox">
                  <Checkbox
                    defaultChecked={row.selected}
                    checked={row.selected}
                    onChange={({ target: { checked } }) => {
                      if (selectedUsers.length >= 9 && checked) return;
                      userToggle({ index, checked });
                    }}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.Name}
                </TableCell>
                <TableCell align="right">
                  <img
                    src={row["Profile Image"]}
                    alt={`${row.Name}`}
                    className={`${styles.img} rounded`}
                  />
                </TableCell>
                <TableCell align="right">{row.Bet}</TableCell>
                <TableCell align="right">{row.wins}</TableCell>
                <TableCell align="right">{row.lost}</TableCell>
                <TableCell align="right">{row.Price}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default connect((state) => state, actions)(UserTable);
