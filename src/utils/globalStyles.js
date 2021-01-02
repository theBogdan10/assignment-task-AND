import {StyleSheet} from 'react-native';
import {WHITE} from './colors';
import {moderateScale} from './dimensions';

const globalStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: WHITE,
  },
  genericHorizontalPadding: {
    paddingHorizontal: moderateScale(20),
  },
});

export default globalStyles;
