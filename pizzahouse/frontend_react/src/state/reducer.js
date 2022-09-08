export const initialstate = {
  profile: null,
  pagereload: null,
  cartuncomplit: null,
  cartcomplit: null,
};

const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case "ADD_PROFILE":
      return {
        ...state,
        profile: action.profile,
      };
    case "PAGE_RELOAD":
      return {
        ...state,
        pagereload: action.pagereload,
      };
    case "ADD_CARTUNCOMPLIT":
      return {
        ...state,
        cartuncomplit: action.cartuncomplit,
      };
    case "ADD_CARTCOMPLIT":
      return {
        ...state,
        cartcomplit: action.cartcomplit,
      };
    case "DELETE_CARTUNCOMPLIT":
      return {
        ...state,
        delete_cartuncomplit: state.cartuncomplit.cartproduct.filter(
          (cartuncomplit) => cartuncomplit._id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default reducer;
