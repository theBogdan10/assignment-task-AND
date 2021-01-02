import React, {useRef, useEffect} from 'react';
import {
  TextInput as RNTextInput,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {calcHeight, calcWidth, moderateScale} from '../utils/dimensions';
import {BLACK, GRAY, GRAY_BORDER} from '../utils/colors';
import {REGULAR_FONT} from '../utils/fonts';
import {MEDIUM_FONT} from '../utils/constants';
import CustomText from './CustomText';

const CustomTextInput = ({
  value = '',
  placeholder = 'Default placeholder',
  placeholderTextColor = BLACK,
  style,
  inputStyle,
  onChangeText,
  onBlur,
  isSecure = false,
  isMultiLine = false,
  isNumeric = false,
}) => {
  const inputElementRef = useRef(null);

  useEffect(() => {
    inputElementRef.current?.setNativeProps({
      style: {fontFamily: REGULAR_FONT},
    });
  }, []);

  return (
    <View style={[styles.inputView, style, styles.rootInput]}>
      <RNTextInput
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={isSecure}
        style={[styles.input, inputStyle]}
        ref={inputElementRef}
        multiline={isMultiLine}
        keyboardType={isNumeric ? 'numeric' : 'default'}
      />
    </View>
  );
};

CustomTextInput.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
  onBlur: PropTypes.func,
  onPressEyeIcon: PropTypes.func,
  isSecure: PropTypes.bool,
};

const styles = StyleSheet.create({
  inputView: {
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(3),
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    borderColor: GRAY_BORDER,
  },
  input: {
    fontFamily: REGULAR_FONT,
    fontSize: MEDIUM_FONT,
    color: BLACK,
    flex: 1,
  },
  rootInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  hitSlopTwenty: {
    top: calcHeight(20),
    bottom: calcHeight(20),
    left: calcWidth(20),
    right: calcWidth(20),
  },
});

export default CustomTextInput;
