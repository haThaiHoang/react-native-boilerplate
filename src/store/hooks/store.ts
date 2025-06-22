import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

import type { RootState } from '@/store/store'
import { resetAppState } from '../actions/app'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAppDispatch: () => any = useDispatch

export const useResetAppState = () => {
  const dispatch = useAppDispatch()

  const reset = useCallback(async () => {
    await dispatch(resetAppState())
  }, [dispatch])

  return reset
}
