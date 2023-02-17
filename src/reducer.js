const reducer = (state, action) => {
  if (action.type === 'CLEAR_CART') {
    return {
      ...state,
      cart: [],
      /*
       * If action is clear Cart return an empty array of cart
       */
    }
  }
  if (action.type === 'REMOVE') {
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
      /*
       * If the id matches with payload id return filtered cartItems
       */
    }
  }

  if (action.type === 'INCREASE') {
    let tempCart = state.cart.map((cartItem) => {
      /*
       * iterating over the state before change
       */

      if (cartItem.id === action.payload) {
        return { ...cartItem, amount: cartItem.amount + 1 }
        /*
         * If the id matches with payload id return new array
         * with cartItems an increase amount by 1
         */
      }
      return cartItem
    })

    return { ...state, cart: tempCart }
  }

  if (action.type === 'DECREASE') {
    let tempCart = state.cart
      .map((cartItem) => {
        /*
         * iterating over the state before change
         */

        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount - 1 }
          /*
           * If the id matches with payload id return new array
           * with cartItems an decrease amount by 1
           */
        }
        return cartItem
      })
      .filter((cartItem) => cartItem.amount !== 0)

    return { ...state, cart: tempCart }
  }
  return state
}

export default reducer
