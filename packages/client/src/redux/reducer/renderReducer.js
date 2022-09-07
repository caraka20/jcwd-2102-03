const initialState = {
  value: false,
};

// const fetchTrigger = (initialPostState.value)

const renderReducer = (state = initialState, action) => {
  if (action.type === "FETCH_DATA") {
    return {
      ...state,
      value: action.payload.value,
    };
  }

  return state;
};

export default renderReducer;
