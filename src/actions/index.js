//Action Creator for currency
export const selectCurrency = currency =>{

    return {
        type: 'CURRENCY_SELECTED',
        payload: currency
    }
}
//Action Creator for currency
export const selectSymbol = symbol =>{

    return {
        type: 'CURRENCY_SYMBOL',
        payload: symbol
    }
}