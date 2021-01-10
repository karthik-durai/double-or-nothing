import React from "react";
import { Box, Typography, makeStyles, styled } from "@material-ui/core";
import price from "../assets/price.png";
import target from "../assets/bets.png";
import trophy from "../assets/trophy_icon.png";

const useStyles = makeStyles(() => ({
  img: {
    width: "50px",
    height: "50px",
  },
}));

function UserCard({ item }) {
  const styles = useStyles();
  return (
    <Box
      key={item.Name}
      className="d-flex align-items-center justify-content-between w-100"
    >
      <Box className="d-flex">
        <Box>
          <img
            src={item["Profile Image"]}
            className={`${styles.img} rounded`}
          />
        </Box>
        <Box className="ms-3">
          <Typography>{item.Name}</Typography>
          <Box className="d-flex">
            <Box className="d-flex">
              <img src={target} style={{ width: "20px" }} />
              <Typography className="ms-1">{item.Bet}</Typography>
            </Box>
            <Box className="d-flex ms-3">
              <img src={trophy} style={{ width: "20px" }} />
              <Typography className="ms-1">{item.wins}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box className="d-flex">
          <img src={price} style={{ width: "20px" }} />
          <Typography className="ms-1">{item.Price}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default UserCard;
