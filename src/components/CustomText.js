import React, {useCallback} from 'react';
import {Text as RNText, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {calcFontSize} from '../utils/dimensions';
import {
  EXTRA_LARGE_FONT,
  EXTRA_SMALL_FONT,
  LARGE_FONT,
  MEDIUM_FONT,
  SMALL_FONT,
} from '../utils/constants';
import {BLACK} from '../utils/colors';
import {PRIMARY_FONT, REGULAR_FONT, SEMI_BOLD_FONT} from '../utils/fonts';

const CustomText = ({
  text,
  color = BLACK,
  size,
  isBold = false,
  isSemiBold = false,
  isCenter = false,
}) => {
  const getSizeByName = useCallback((size) => {
    if (typeof size === 'number') {
      return calcFontSize(size);
    }

    const config = {
      'extra-small': EXTRA_SMALL_FONT,
      small: SMALL_FONT,
      medium: MEDIUM_FONT,
      large: LARGE_FONT,
      'extra-large': EXTRA_LARGE_FONT,
    };

    return config[size];
  }, []);

  return (
    <RNText
      style={[
        localStyles.text,
        isBold && localStyles.bold,
        isSemiBold && localStyles.semiBold,
        isCenter && localStyles.center,
        {
          fontSize: getSizeByName(size),
          color: color,
        },
      ]}>
      {text}
    </RNText>
  );
};

CustomText.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  size: PropTypes.string,
  isBold: PropTypes.bool,
  isSemiBold: PropTypes.bool,
  isCenter: PropTypes.bool,
};

const localStyles = StyleSheet.create({
  text: {
    fontFamily: REGULAR_FONT,
    color: BLACK,
    letterSpacing: 0.8,
  },
  bold: {
    fontFamily: PRIMARY_FONT,
  },
  semiBold: {
    fontFamily: SEMI_BOLD_FONT,
  },
  center: {
    textAlign: 'center',
  },
});

export default CustomText;
