/* eslint-disable array-callback-return */
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
    /*
     * Return the cartItems if the amount is greater than 0 else Remove
     * cart item
     */

    return { ...state, cart: tempCart }
  }

  if (action.type === 'GET_TOTALS') {
    let tempTotal = 0
    let tempAmount = 0
    state.cart.map((item) => {
      const { price, amount } = item
      tempTotal += price * amount
      tempAmount += amount
    })
    return {
      ...state,
      total: parseFloat(tempTotal.toFixed(2)),
      /*
       * limit the number of decimals
       * it is returning string so it needs to be passed through parseFloat
       */
      amount: tempAmount,
    }
    /*
     * returning state and overriding total, amount value
     */
    /*
     * function which returning an object
     */
  }

  // if (action.type === 'GET_TOTALS') {
  //   let { total, amount } = state.cart.reduce(
  //     (cartTotal, cartItem) => {
  //       const { price, amount } = cartItem
  //       const itemTotal = price * amount
  //       cartTotal.amount += amount
  //       cartTotal.total += itemTotal

  //       return cartTotal
  //     },
  //     {
  //       total: 0,
  //       amount: 0,
  //     }
  //     /*
  //      * function which returning an object
  //      */
  //   )
  //   total = parseFloat(total.toFixed(2))

  //   /*
  //    * limit the number of decimals
  //    * it is returning string so it needs to be passed through parseFloat
  //    */
  //   return { ...state, total, amount }
  //   /*
  //    * returning state and overriding total, amount value
  //    */
  // }

  if (action.type === 'LOADING') {
    return { ...state, loading: true }
    /*
     * returning all what is in state and overriding loading
     */
  }
  if (action.type === 'DISPLAY_ITEMS') {
    return { ...state, cart: action.payload, loading: false }
  }

  if (action.type === 'TOGGLE_AMOUNT') {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          if (action.payload.type === 'inc') {
            return { ...cartItem, amount: cartItem.amount + 1 }
          }
          if (action.payload.type === 'dec') {
            return { ...cartItem, amount: cartItem.amount - 1 }
          }
        }
        return cartItem
      })
      .filter((cartItem) => cartItem.amount !== 0)
    /*
     * Return the cartItems if the amount is greater than 0 else Remove
     * cart item
     */

    return { ...state, cart: tempCart }
  }

  return state
}

export default reducer
