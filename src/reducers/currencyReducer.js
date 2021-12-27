export default (state = 'INR', action) => {
    switch (action.type) {
      case 'CURRENCY_SELECTED':
        return action.payload;
      default:
        return state;
    }
    
  };
  