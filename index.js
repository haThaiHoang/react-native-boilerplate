import 'react-native-gesture-handler'
import { AppRegistry } from 'react-native';
import * as yup from 'yup';
import { Appearance, StatusBar } from 'react-native'
import 'moment/locale/vi'

import i18n from '@pamo-fe/locale'
import Bootstrap from '@/boot'

Appearance.setColorScheme('light')
StatusBar.setBarStyle('dark-content')

yup.setLocale({
  mixed: {
    required: () => i18n.t('this_is_a_required_field'),
  },
  number: {
    min: ({ min }) => i18n.t('must_be_greater_than_or_equal_to_min', { min }),
  },
});

AppRegistry.registerComponent('MobileApp', () => Bootstrap);
