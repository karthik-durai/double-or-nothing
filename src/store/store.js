const initialState = {
  users: [],
};

const actionTypes = {
  ADD_USERS: "ADD_USERS",
  SELECT_DESELECT_USER: "SELECT_DESELECT_USER",
};

export const actions = {
  addUsers: (data) => ({
    type: actionTypes.ADD_USERS,
    payload: data,
  }),
  userToggle: ({ index, checked }) => ({
    type: actionTypes.SELECT_DESELECT_USER,
    payload: { index, checked },
  }),
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_USERS: {
      return { users: [...action.payload], state };
    }
    case actionTypes.SELECT_DESELECT_USER: {
      const { users } = state;
      users[action.payload.index].selected = action.payload.checked;
      return { users: [...users], state };
    }
    default:
      return state;
  }
};
