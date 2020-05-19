/* Navigation helper services */
import { CommonActions, StackActions, DrawerActions } from '@react-navigation/native'
import lodash from 'lodash'

let navigator

const setTopLevelNavigator = (navigatorRef) => {
  navigator = navigatorRef
}

const navigate = (name, params) => {
  navigator.dispatch(
    CommonActions.navigate({
      name,
      params
    })
  )
}

const push = (name, params) => {
  navigator.dispatch(
    StackActions.push(name, params)
  )
}

const goBack = () => {
  navigator.dispatch(CommonActions.goBack())
}

const replace = (name, params) => {
  navigator.dispatch(
    StackActions.replace(name, params)
  )
}

const pop = (index) => {
  navigator.dispatch(StackActions.popToTop(index))
}

const popToTop = () => {
  navigator.dispatch(StackActions.popToTop())
}

const reset = (param) => {
  if (lodash.isFunction(param)) {
    navigator.dispatch((state) => CommonActions.reset(param(state)))
  } else {
    navigator.dispatch(CommonActions.reset(param))
  }
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
  setTopLevelNavigator,
  navigate,
  push,
  goBack,
  replace,
  pop,
  popToTop,
  reset,
  openDrawer,
  toggleDrawer,
  closeDrawer
}

export default {
  setTopLevelNavigator,
  navigate,
  push,
  goBack,
  replace,
  pop,
  popToTop,
  reset,
  openDrawer,
  toggleDrawer,
  closeDrawer
}
