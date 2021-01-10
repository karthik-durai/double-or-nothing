import React, { useEffect, useState } from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { actions } from "../store/store";
import UserCard from "../components/userCard-bets";

const useStyles = makeStyles(() => ({
  opposingBetContainer: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    color: "#FFF",
  },
}));

function Bets(props) {
  const [opposingBet] = useState(`${getOpposingBet()}`);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const styles = useStyles();

  useEffect(() => {
    const data = props.users.length
      ? props.users
      : JSON.parse(localStorage.getItem("state")) || [];
    if (!props.users.length) {
      let localData = localStorage.getItem("state") || [];
      localData = JSON.parse(localData);
      props.addUsers(localData);
    }
    const users = data.map((item) => {
      const hasWon = item.Bet === opposingBet;
      item.won = hasWon;
      item.Price = hasWon ? Number(item.Price) * 2 : Number(item.Price);
      item.wins = hasWon ? item.wins + 1 : item.wins;
      item.lost = !hasWon ? item.lost + 1 : item.lost;
      return item;
    });
    setSelectedUsers(users.filter((user) => user.selected));
    props.addUsers(users);
  }, []);

  function getOpposingBet() {
    return Math.floor(Math.random() * 10);
  }

  return (
    <Box className="border border-primary h-100 d-flex flex-column justify-content-center">
      <Box className="d-flex mb-5 justify-content-around">
        {selectedUsers.slice(0, 5).map((item) => (
          <UserCard key={item.Name} item={item} />
        ))}
      </Box>
      <Box className="d-flex justify-content-center">
        <Box className={styles.opposingBetContainer}>
          <Typography variant="h3">{opposingBet}</Typography>
        </Box>
      </Box>
      <Box className="d-flex mt-5 justify-content-around">
        {selectedUsers.slice(5).map((item) => (
          <UserCard key={item.Name} item={item} />
        ))}
      </Box>
    </Box>
  );
}

export default connect((state) => state, actions)(Bets);
