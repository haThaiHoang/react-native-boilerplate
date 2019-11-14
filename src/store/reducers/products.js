import { TYPES } from '@/store/actions'

const INIT_STATE = {
  loaded: [],
  submitting: null,
  error: null,

  products: []
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
        products: action.data
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
