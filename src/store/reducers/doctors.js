import { TYPES } from '@/store/actions'

const INIT_STATE = {
  loaded: [],
  submitting: null,
  error: null,

  doctors: []
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case TYPES.GET_DOCTORS_REQUEST:
      return {
        ...state,
        submitting: action.type
      }
    case TYPES.GET_DOCTORS_SUCCESS:
      return {
        ...state,
        submitting: null,
        doctors: action.data
      }
    case TYPES.GET_DOCTORS_FAILURE:
      return {
        ...state,
        submitting: null,
        error: action.error
      }
    default:
      return state
  }
}
