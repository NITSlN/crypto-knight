export default (state = '₹', action) => {
    switch (action.type) {
      case 'CURRENCY_SYMBOL':
        return action.payload;
      default:
        return state;
    }
    
  };