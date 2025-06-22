import { useAppDispatch, setIsLogined as setIsLoginedAction } from '@/store'

export const useAppUtils = () => {
  const dispatch = useAppDispatch();

  const setIsLogined = (value: boolean) => {
    dispatch(setIsLoginedAction(value))
  }

  return {
    setIsLogined,
  }
}
