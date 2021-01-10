import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  makeStyles,
  Button,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import Table from "../components/table";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { actions } from "../store/store";
import UserCard from "../components/userCard";
import { Search as SearchIcon } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  selectedUsers: {
    width: "30%",
    height: "100%",
    overflow: "auto",
    position: "relative",
    display: "flex",
  },
  users: {
    width: "100%",
    height: "100%",
    overflow: "auto",
  },
  startBtn: {
    position: "absolute",
    bottom: "5px",
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function Home(props) {
  const styles = useStyles();
  const history = useHistory();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [players, setPlayers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchDetails();
  }, []);

  useEffect(() => {
    setSelectedUsers(props.users.filter((item) => item.selected));
  }, [props.users]);

  useEffect(() => {
    let { users } = props;
    if (searchQuery.length) {
      users = users.filter((item) =>
        item.Name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setPlayers(users);
  }, [searchQuery, props.users]);

  async function fetchDetails() {
    try {
      const { data } = await axios.get(
        "https://s3-ap-southeast-1.amazonaws.com/he-public-data/bets7747a43.json"
      );
      let localData = localStorage.getItem("state");
      localData = localData ? JSON.parse(localData) : [];
      const modifiedData = data.map((item) => {
        const localUserData = localData.find((user) => user.Name === item.Name);
        item.wins = localUserData?.wins || 0;
        item.lost = localUserData?.lost || 0;
        item.selected = localUserData?.selected || false;
        item.won = localUserData?.won || false;
        item.Price = localUserData?.Price || item.Price;
        return item;
      });
      props.addUsers(modifiedData);
    } catch (e) {
      console.log(e);
      props.addUsers([]);
    }
  }

  return (
    <Box className="d-flex w-100 h-100 p-2 border border-secondary">
      <Box className={`${styles.selectedUsers}`}>
        <Box className="p-5 w-100">
          <Typography variant="body2" className="text-muted mb-3">
            Playing 9
          </Typography>
          <Box className="d-grid gap-4">
            {selectedUsers.map((item) => {
              return <UserCard key={item.Name} item={item} />;
            })}
          </Box>
        </Box>
        <Box className={styles.startBtn}>
          <Button
            variant="contained"
            color="primary"
            className="px-4 py-2"
            disabled={selectedUsers.length < 9}
            onClick={(_) => history.push("/bets")}
          >
            Start
          </Button>
        </Box>
      </Box>
      <Box className="flex-grow-1 pb-3">
        <Typography variant="h5" className="mb-3">
          Select playing 9
        </Typography>
        <form>
          <TextField
            placeholder="Search Players"
            className="mb-3"
            onChange={({ target: { value } }) => setSearchQuery(value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </form>
        <Box className={`${styles.users} pb-3`}>
          <Table data={players} />
        </Box>
      </Box>
    </Box>
  );
}

export default connect((state) => state, actions)(Home);
