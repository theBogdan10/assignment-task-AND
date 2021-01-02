import React from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {Formik} from 'formik';
import {BLACK, GRAY, GRAY1, GRAY_BORDER, WHITE} from '../../utils/colors';
import {moderateScale} from '../../utils/dimensions';
import CustomText from '../CustomText';
import CustomButton from '../CustomButton';
import CustomTextInput from '../CustomTextInput';
import {useDispatch, useSelector} from 'react-redux';
import {getProducts} from '../../store/selectors/productsSelector';

const ProductModal = ({
  isModalVisible,
  onDismissModal,
  onSubmitSaveProduct,
  isEdit = false,
  onSubmitSaveEdit,
}) => {
  const dispatch = useDispatch();
  const {products, selectedProductId} = useSelector(getProducts);

  const product = products?.filter(
    (product) => product.id === selectedProductId,
  )[0];

  console.log(7777, product);

  const headerText = isEdit ? 'Edit product' : 'Input info about new product';
  const initialValues = isEdit
    ? {
        name: product.name,
        price: product.price.toString(),
      }
    : {
        name: '',
        price: '',
      };
  return (
    <Modal
      isVisible={isModalVisible}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      onBackdropPress={onDismissModal}>
      <View style={styles.root}>
        <CustomText
          text={headerText}
          size={'large'}
          color={WHITE}
          isBold
          isCenter
        />
        <Formik
          initialValues={initialValues}
          onSubmit={isEdit ? onSubmitSaveEdit : onSubmitSaveProduct}>
          {({handleChange, handleBlur, handleSubmit, values}) => {
            const isEnableButton = values.name && values.price;
            return (
              <View>
                <CustomTextInput
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  placeholderTextColor={GRAY_BORDER}
                  placeholder={'Name'}
                  style={{marginVertical: moderateScale(30)}}
                  inputStyle={{color: WHITE}}
                />
                <CustomTextInput
                  onChangeText={handleChange('price')}
                  onBlur={handleBlur('price')}
                  value={values.price}
                  isNumeric
                  placeholderTextColor={GRAY_BORDER}
                  placeholder={'Price'}
                  inputStyle={{color: WHITE}}
                />
                <CustomButton
                  color={'rgba(255,255,255, 0.2)'}
                  text={'Save'}
                  style={styles.extraButtonStyle}
                  textColor={WHITE}
                  onPress={handleSubmit}
                  disabled={!isEnableButton}
                />
              </View>
            );
          }}
        </Formik>
      </View>
    </Modal>
  );
};

ProductModal.propTypes = {
  isModalVisible: PropTypes.bool,
  onDismissModal: PropTypes.func,
  errorMessage: PropTypes.string,
  errorTitle: PropTypes.string,
  isEdit: PropTypes.bool,
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: BLACK,
    paddingVertical: moderateScale(20),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(20),
  },
  messageView: {
    marginTop: moderateScale(10),
    marginBottom: moderateScale(20),
  },
  extraButtonStyle: {
    borderRadius: moderateScale(25),
    marginTop: moderateScale(20),
  },
});

export default ProductModal;
