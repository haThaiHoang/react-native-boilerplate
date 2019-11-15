import { NavigationActions, StackActions, DrawerActions } from 'react-navigation'

let navigator

const setTopLevelNavigator = (navigatorRef) => {
  navigator = navigatorRef
}

const navigate = (routeName, params) => {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  )
}

const push = (routeName, params) => {
  navigator.dispatch(
    StackActions.push({
      routeName,
      params
    })
  )
}

const back = () => {
  navigator.dispatch(NavigationActions.back({}))
}

const replace = (routeName, params) => {
  navigator.dispatch(
    StackActions.replace({
      routeName,
      params
    })
  )
}

const reset = (routeName, params) => {
  navigator.dispatch(
    StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName, params })]
    })
  )
}

const toggleDrawer = () => {
  navigator.dispatch(DrawerActions.toggleDrawer())
}

const openDrawer = () => {
  navigator.dispatch(DrawerActions.openDrawer())
}

const closeDrawer = () => {
  navigator.dispatch(DrawerActions.closeDrawer())
}

export {
  setTopLevelNavigator
}

export default {
  navigate,
  push,
  back,
  reset,
  replace,
  openDrawer,
  toggleDrawer,
  closeDrawer
}
