import React from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {
  calcHeight,
  calcWidth,
  deviceWidth,
  moderateScale,
} from '../utils/dimensions';
import {BLACK, GRAY, GRAY1, GRAY_LINE, WHITE} from '../utils/colors';
import CustomText from './CustomText';
import MoreIcon from '../assets/icons/more.svg';
import EditIcon from '../assets/icons/edit.svg';

const ProductCard = ({
  name,
  price,
  onMorePress,
  isProductsScreen = true,
  onDelete,
  onEdit,
}) => {
  return (
    <View style={styles.item}>
      <View style={styles.headerView}>
        <CustomText color={BLACK} isSemiBold text={name} size={'large'} />
        <TouchableOpacity
          onPress={isProductsScreen ? onMorePress : onDelete}
          hitSlop={styles.hitSlopTwenty}>
          {isProductsScreen ? (
            <MoreIcon
              width={moderateScale(22)}
              height={moderateScale(22)}
              fill={BLACK}
            />
          ) : (
            <CustomText isSemiBold text={'X'} size={'large'} />
          )}
        </TouchableOpacity>
      </View>
      <View style={[styles.headerView, styles.footerView]}>
        <CustomText
          size={'large'}
          color={BLACK}
          isSemiBold
          text={`${price}$`}
        />
        {isProductsScreen && (
          <TouchableOpacity hitSlop={styles.hitSlopTwenty} onPress={onEdit}>
            <EditIcon
              width={moderateScale(15)}
              height={moderateScale(15)}
              fill={BLACK}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

ProductCard.propTypes = {
  name: PropTypes.string,
  onMorePress: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  isProductsScreen: PropTypes.bool,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const styles = StyleSheet.create({
  item: {
    width: '90%',
    alignSelf: 'center',
    paddingVertical: moderateScale(15),
    paddingHorizontal: moderateScale(10),
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerView: {
    marginTop: moderateScale(20),
  },
});

export default ProductCard;
