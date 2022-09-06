const initialState = {
  id: 0,
};

const addressReducer = (state = initialState, action) => {
  if (action.type === "SET_ADDRESS") {
    return {
      ...state,
      id: action.payload.id,
    };
  }
  if (action.type === "UNSET_ADDRESS") {
    return initialState;
  }
  return state;
};

export default addressReducer;
