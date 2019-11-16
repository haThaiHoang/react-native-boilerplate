import { TYPES } from '@/store/actions'

const INIT_STATE = {
  loaded: [],
  submitting: null,
  error: null,

  products: {
    items: [],
    total: 0
  }
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TYPES.GET_PRODUCTS_REQUEST:
      return {
        ...state,
        submitting: action.type
      }
    case TYPES.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        submitting: null,
        products: {
          items: action.payload.merge ? state.products.items.concat(action.data.items) : action.data.items,
          total: action.data.total
        }
      }
    case TYPES.GET_PRODUCTS_FAILURE:
      return {
        ...state,
        submitting: null,
        error: action.error
      }
    default:
      return state
  }
}
