const initialState = {
  loading: false
};

export const startLoading = () => ({
  type: "START_LOADING"
});

export const stopLoading = () => ({
  type: "STOP_LOADING"
});

export default function(state = initialState, action) {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, loading: true };

    case "STOP_LOADING":
      return { ...state, loading: false };

    default:
      return state;
  }
}
