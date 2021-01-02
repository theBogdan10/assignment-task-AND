import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {moderateScale} from '../utils/dimensions';
import CustomText from './CustomText';

const CustomButton = ({
  color,
  text,
  textColor,
  onPress = () => {},
  style,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.component, style, {backgroundColor: color}]}>
      <CustomText text={text} isBold size={'medium'} color={textColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  component: {
    borderRadius: moderateScale(10),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: moderateScale(13),
  },
});

CustomButton.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string,
  onPress: PropTypes.func,
  textColor: PropTypes.string,
  disabled: PropTypes.bool,
};

export default CustomButton;
