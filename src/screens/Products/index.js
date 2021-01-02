import React, {useCallback, useState} from 'react';
import {FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import globalStyles from '../../utils/globalStyles';
import {getProducts} from '../../store/selectors/productsSelector';
import ProductCard from '../../components/ProductCard';
import Header from '../../components/Header';
import {moderateScale} from '../../utils/dimensions';
import {PURPLE, WHITE} from '../../utils/colors';
import PlusIcon from '../../assets/icons/plusIcon.svg';
import {
  addNewProduct,
  addToCart,
  addToFavourite,
  deleteProduct,
  goToAddNewProduct,
  selectProduct,
  updateProduct,
} from '../../store/actions/productsActions';
import ProductModal from '../../components/Modals/ProductModal';
import InfoModal from '../../components/Modals/InfoModal';
import CustomText from '../../components/CustomText';

const Products = ({navigation}) => {
  const [
    isAddNewProductModalVisible,
    setIsAddNewProductModalVisible,
  ] = useState(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useDispatch();
  const {
    products,
    selectedProductId,
    favouritesProductsId,
    cartProductsId,
  } = useSelector(getProducts);

  const flatListHeader = useCallback(
    () => <Header title={'Your products'} />,
    [],
  );
  const handleVisibilityAddNewProductModal = useCallback(() => {
    setIsAddNewProductModalVisible((oldState) => !oldState);
    if (isEdit) {
      setIsEdit(false);
    }
  }, [isEdit]);
  const handleVisibilityInfoModal = useCallback(() => {
    setIsInfoModalVisible((oldState) => !oldState);
  }, []);

  const onPressAddProduct = useCallback(() => {
    dispatch(goToAddNewProduct());
    handleVisibilityAddNewProductModal();
  }, [dispatch, handleVisibilityAddNewProductModal]);

  const onSubmitSaveProduct = useCallback(
    async (values) => {
      await dispatch(
        addNewProduct({
          id: uuidv4(),
          name: values.name.trim(),
          price: values.price.trim(),
        }),
      );
      handleVisibilityAddNewProductModal();
    },
    [dispatch, handleVisibilityAddNewProductModal],
  );

  const renderProductItem = useCallback(
    ({item}) => (
      <ProductCard
        name={item.name}
        price={item.price}
        onMorePress={() => {
          dispatch(selectProduct(item.id));
          handleVisibilityInfoModal();
        }}
        onEdit={() => {
          setIsEdit(true);
          dispatch(selectProduct(item.id));
          handleVisibilityAddNewProductModal();
        }}
      />
    ),
    [dispatch, handleVisibilityAddNewProductModal, handleVisibilityInfoModal],
  );
  const onDeleteProduct = useCallback(async () => {
    await dispatch(deleteProduct(selectedProductId));
    handleVisibilityInfoModal();
  }, [dispatch, handleVisibilityInfoModal, selectedProductId]);

  const onAddToFavourite = useCallback(async () => {
    await dispatch(addToFavourite(selectedProductId));
    handleVisibilityInfoModal();
  }, [dispatch, handleVisibilityInfoModal, selectedProductId]);

  const onAddToCart = useCallback(async () => {
    await dispatch(addToCart(selectedProductId));
    handleVisibilityInfoModal();
  }, [dispatch, handleVisibilityInfoModal, selectedProductId]);

  const listEmptyComponent = (
    <CustomText
      text={'Oops...There are no products'}
      isCenter
      isBold
      size={'medium'}
    />
  );

  return (
    <SafeAreaView style={globalStyles.root}>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        ListHeaderComponent={flatListHeader}
        ListHeaderComponentStyle={styles.headerStyles}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={listEmptyComponent}
      />
      <TouchableOpacity
        onPress={onPressAddProduct}
        activeOpacity={0.8}
        style={styles.addProductView}>
        <PlusIcon
          fill={WHITE}
          width={moderateScale(20)}
          height={moderateScale(20)}
        />
      </TouchableOpacity>
      {isAddNewProductModalVisible && (
        <ProductModal
          isModalVisible={isAddNewProductModalVisible}
          onDismissModal={handleVisibilityAddNewProductModal}
          onSubmitSaveProduct={onSubmitSaveProduct}
          onSubmitSaveEdit={(values) => {
            dispatch(
              updateProduct({
                id: selectedProductId,
                name: values.name,
                price: values.price,
              }),
            );
            handleVisibilityAddNewProductModal();
          }}
          isEdit={isEdit}
        />
      )}
      {isInfoModalVisible && (
        <InfoModal
          isModalVisible={isInfoModalVisible}
          onDismissModal={handleVisibilityInfoModal}
          onDelete={onDeleteProduct}
          onAddToFavourite={onAddToFavourite}
          onAddToCart={onAddToCart}
          isAddToFavourites={!favouritesProductsId.includes(selectedProductId)}
          isAddToCart={!cartProductsId.includes(selectedProductId)}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerStyles: {
    marginBottom: moderateScale(30),
  },
  addProductView: {
    backgroundColor: PURPLE,
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: moderateScale(15),
    right: moderateScale(15),
  },
});

export default Products;
