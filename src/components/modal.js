import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import Modal, { SlideAnimation } from 'react-native-modals'
import lodash from 'lodash'

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#707070ff'
  },
  body: {
    padding: 20
  },
  actionBox: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#707070ff'
  },
  actionButton: {
    flex: 1,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionDivider: {
    width: 1,
    backgroundColor: '#707070ff'
  }
})

const ModalComponent = ({ children, actionButtons, title, bodyStyles, ...props }) => (
  <Modal
    modalAnimation={new SlideAnimation()}
    overlayOpacity={0.6}
    width={0.9}
    draggable={false}
    {...props}
  >
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
    >
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' && 'position'}>
        <Text style={styles.title}>{title}</Text>
        {children}
        {!lodash.isEmpty(actionButtons) && (
          <View style={styles.actionBox}>
            {actionButtons.map((item, index) => (
              <Fragment key={index}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={item.onPress}
                >
                  <Text
                    style={{ fontWeight: item.default ? 'bold' : 'normal' }}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
                {index < actionButtons.length - 1 && (
                  <View style={styles.actionDivider} />
                )}
              </Fragment>
            ))}
          </View>
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  </Modal>
)

ModalComponent.propTypes = {
  children: PropTypes.node.isRequired,
  actionButtons: PropTypes.array,
  title: PropTypes.string,
  bodyStyles: PropTypes.object
}

export default ModalComponent
