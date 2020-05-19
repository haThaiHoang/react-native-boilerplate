import React from 'react'
import { Animated } from 'react-native'
import { CardStyleInterpolators } from '@react-navigation/stack'

export default {
  // Animation transition from bottom to top with transoarent background
  bottomSheet: {
    cardStyle: {
      backgroundColor: 'transparent'
    },
    cardOverlayEnabled: true,
    cardOverlay: ({ style }) => (
      <Animated.View
        style={[{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.7)'
        }, style]}
      />
    ),
    gestureEnabled: false,
    cardStyleInterpolator: ({ current, layouts }) => ({
      cardStyle: {
        transform: [{
          translateY: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.height, 0]
          })
        }]
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0.2, 1],
          outputRange: [0, 1]
        })
      }
    }),
    transitionSpec: {
      open: {
        animation: 'timing',
        config: {
          duration: 400
        }
      },
      close: {
        animation: 'timing',
        config: {
          duration: 400
        }
      }
    }
  },

  // Animation transition from bottom to top
  modal: {
    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    gestureEnabled: false
  },

  // Animation transition from bottom to top with transparent background
  transparentModal: {
    cardStyle: {
      backgroundColor: 'transparent'
    },
    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    gestureEnabled: false
  },

  // Animation transition from right to left
  card: {
    gestureDirection: 'horizontal',
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
  },

  // Animation transition from right to left with no close swipe handle
  unGestureCard: {
    gestureDirection: 'horizontal',
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    gestureEnabled: false
  },

  // Animation transition from left to right
  leftCard: {
    cardStyleInterpolator: ({ current, next, layouts }) => ({
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [-layouts.screen.width, 0]
            })
          },
          {
            translateX: next
              ? next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, layouts.screen.width / 4]
              })
              : 0
          }
        ]
      }
    })
  },

  // Animation transition fade
  fade: {
    cardStyleInterpolator: ({ current }) => ({
      cardStyle: {
        opacity: current.progress
      }
    }),
    transitionSpec: {
      open: {
        animation: 'timing',
        config: {
          duration: 200
        }
      },
      close: {
        animation: 'timing',
        config: {
          duration: 200
        }
      }
    },
    gestureEnabled: false
  },

  // Animation transition zoom scale form middle of screen
  zoomScale: {
    cardStyleInterpolator: ({ current }) => ({
      cardStyle: {
        opacity: current.progress,
        transform: [{
          scale: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.6, 1]
          })
        }]
      }
    }),
    transitionSpec: {
      open: {
        animation: 'timing',
        config: {
          duration: 200
        }
      },
      close: {
        animation: 'timing',
        config: {
          duration: 200
        }
      }
    }
  },

  // Animation transition zoom scale form middle of screen
  transparentZoomScale: {
    cardStyle: {
      backgroundColor: 'transparent'
    },
    cardOverlayEnabled: true,
    cardOverlay: ({ style }) => (
      <Animated.View
        style={[{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.7)'
        }, style]}
      />
    ),
    gestureEnabled: false,
    cardStyleInterpolator: ({ current }) => ({
      cardStyle: {
        opacity: current.progress,
        transform: [{
          scale: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.6, 1]
          })
        }]
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0.2, 1],
          outputRange: [0, 1]
        })
      }
    }),
    transitionSpec: {
      open: {
        animation: 'timing',
        config: {
          duration: 200
        }
      },
      close: {
        animation: 'timing',
        config: {
          duration: 200
        }
      }
    }
  }
}
