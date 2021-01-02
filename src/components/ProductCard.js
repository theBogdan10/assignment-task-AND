import React from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {
  calcHeight,
  calcWidth,
  deviceWidth,
  moderateScale,
} from '../utils/dimensions';
import {BLACK, WHITE} from '../utils/colors';
import CustomText from './CustomText';
import MoreIcon from '../assets/icons/more.svg';

const ProductCard = ({
  name,
  price,
  onMorePress,
  isProductsScreen = true,
  onDelete,
}) => {
  return (
    <TouchableOpacity style={styles.item}>
      <View style={styles.headerView}>
        <CustomText color={BLACK} isSemiBold text={name} size={'medium'} />
        <TouchableOpacity
          onPress={isProductsScreen ? onMorePress : onDelete}
          hitSlop={styles.hitSlopTwenty}>
          {isProductsScreen ? (
            <MoreIcon
              width={moderateScale(20)}
              height={moderateScale(20)}
              fill={BLACK}
            />
          ) : (
            <CustomText isSemiBold text={'x'} size={'extra-large'} />
          )}
        </TouchableOpacity>
      </View>
      <CustomText size={'medium'} color={BLACK} isSemiBold text={`${price}$`} />
    </TouchableOpacity>
  );
};

ProductCard.propTypes = {
  name: PropTypes.string,
  onMorePress: PropTypes.func,
  isProductsScreen: PropTypes.bool,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const styles = StyleSheet.create({
  item: {
    width: '90%',
    alignSelf: 'center',
    paddingVertical: moderateScale(15),
    paddingHorizontal: moderateScale(15),
    borderRadius: moderateScale(20),
    backgroundColor: WHITE,
    elevation: 3,
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom: moderateScale(20),
    justifyContent: 'space-between',
  },
  hitSlopTwenty: {
    top: calcHeight(20),
    bottom: calcHeight(20),
    left: calcWidth(20),
    right: calcWidth(20),
  },
  headerView: {
    width: '100%',
    marginBottom: moderateScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default ProductCard;
