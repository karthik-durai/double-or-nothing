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
  container: {
    width: "150px",
    height: "180px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "5px",
    borderRadius: "5px",
    boxShadow: "0px 2px 5px 0px rgba(0,0,0,0.75)",
  },
}));

function UserCard({ item }) {
  const styles = useStyles();
  return (
    <Box className={styles.container}>
      <Box className="d-flex">
        <Box>
          <img
            src={item["Profile Image"]}
            className={`${styles.img} rounded`}
          />
        </Box>
        <Box className="ms-2">
          <Typography>{item.Name}</Typography>
        </Box>
      </Box>
      <Box className="d-flex flex-wrap">
        <Box className="d-flex ms-3">
          <img src={price} style={{ width: "20px" }} />
          <Typography className="ms-1">{item.Price}</Typography>
        </Box>
        <Box className="d-flex ms-3">
          <img src={target} style={{ width: "20px" }} />
          <Typography className="ms-1">{item.Bet}</Typography>
        </Box>
        <Box className="d-flex ms-3">
          <img src={trophy} style={{ width: "20px" }} />
          <Typography className="ms-1">{item.wins}</Typography>
        </Box>
      </Box>
      <Box
        style={{
          backgroundColor: item.won ? "#4BB543" : "#B33A3A",
        }}
      >
        <Typography className="text-center text-light">
          {item.won ? "Winner" : "Lose"}
        </Typography>
      </Box>
    </Box>
  );
}

export default UserCard;
