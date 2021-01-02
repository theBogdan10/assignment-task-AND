import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context/src/SafeAreaView';
import PropTypes from 'prop-types';
import {calcHeight, calcWidth, moderateScale} from '../utils/dimensions';
import CustomText from './CustomText';
import {GRAY_LINE} from '../utils/colors';
import {deviceWidth} from '../utils/dimensions';

const Header = ({
  title = 'Default title',
  rightIcon = null,
  onPressRightIcon = () => {},
  isLine = true,
  leftIcon = null,
}) => {
  const LeftIcon = leftIcon;
  return (
    <View style={[styles.root, !isLine && {borderBottomWidth: 0}]}>
      <CustomText text={title} size={'large'} isSemiBold />
      {rightIcon && (
        <TouchableOpacity
          onPress={onPressRightIcon}
          style={styles.rightIconView}
          hitSlop={styles.hitSlopTwenty}>
          {rightIcon}
        </TouchableOpacity>
      )}
    </View>
  );
};

Header.propTypes = {
  onPressBack: PropTypes.func,
  title: PropTypes.string,
  isArrow: PropTypes.bool,
  rightIcon: PropTypes.any,
  onPressRightIcon: PropTypes.func,
  isLine: PropTypes.bool,
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: moderateScale(13),
    borderBottomColor: GRAY_LINE,
    borderBottomWidth: moderateScale(1),
  },
  arrowView: {
    position: 'absolute',
    left: moderateScale(25),
  },
  rightIconView: {
    position: 'absolute',
    right: moderateScale(25),
  },
  hitSlopTwenty: {
    top: calcHeight(20),
    bottom: calcHeight(20),
    left: calcWidth(20),
    right: calcWidth(20),
  },
});

export default Header;
