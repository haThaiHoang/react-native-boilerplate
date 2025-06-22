import { createNavigationContainerRef, StackActions } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef()

export const navigate = (name: string, params?: object) => {
  if (navigationRef.isReady()) {
    // @ts-ignore
    navigationRef.navigate(name as never, params);
  }
}

export const push = (name: string, params?: object) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(name, params))
  }
}

export const replace = (name: string, params: object) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name, params))
  }
}

export const goBack = () => {
  if (navigationRef.isReady()) {
    navigationRef.goBack()
  }
}
