import React from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {
  BLACK,
  GRAY,
  GRAY1,
  PURPLE,
  RED_PRIMARY,
  WHITE,
  GRAY_BORDER,
} from '../../utils/colors';
import {moderateScale} from '../../utils/dimensions';
import CustomText from '../CustomText';
import CustomButton from '../CustomButton';

const InfoModal = ({
  isModalVisible,
  onDismissModal,
  onDelete,
  onAddToFavourite,
  onAddToCart,
  isAddToCart,
  isAddToFavourites,
}) => {
  return (
    <Modal
      isVisible={isModalVisible}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      onBackdropPress={onDismissModal}>
      <View style={styles.root}>
        <CustomText
          text={'More info'}
          size={'large'}
          color={WHITE}
          isBold
          isCenter
        />
        {isAddToCart && (
          <CustomButton
            color={PURPLE}
            text={'Add to cart'}
            textColor={WHITE}
            style={styles.buttonStyle}
            onPress={onAddToCart}
          />
        )}
        {isAddToFavourites && (
          <CustomButton
            color={GRAY_BORDER}
            textColor={WHITE}
            text={'Add to Favorite'}
            style={styles.buttonStyle}
            onPress={onAddToFavourite}
          />
        )}
        <CustomButton
          color={RED_PRIMARY}
          text={'Delete product'}
          textColor={WHITE}
          style={styles.buttonStyle}
          onPress={onDelete}
        />
      </View>
    </Modal>
  );
};

InfoModal.propTypes = {
  isModalVisible: PropTypes.bool,
  onDismissModal: PropTypes.func,
  onAddToFavourite: PropTypes.func,
  onDelete: PropTypes.func,
  onAddToCart: PropTypes.func,
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: BLACK,
    paddingVertical: moderateScale(20),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(20),
  },
  buttonStyle: {
    marginTop: moderateScale(20),
  },
});

export default InfoModal;
