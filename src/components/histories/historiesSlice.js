const initialState = {};

export default function historiesReducer(state = initialState, action) {
  switch (action.type) {
    case "histories/historyAdded": {
      return {
        ...state,
        histories: {
          ...state.histories,
          [action.payload.key]: action.payload.state,
        },
      };
    }

    case "histories/historyDeleted": {
      return {
        ...state,
        histories: Object.keys(state.histories).reduce((object, key) => {
          if (key !== action.key) {
            object[key] = state.histories[key];
          }
          return object;
        }, {}),
      };
    }

    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state;
  }
}
