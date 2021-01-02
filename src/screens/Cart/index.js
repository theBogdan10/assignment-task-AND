import React, {useCallback, useMemo} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getProducts} from '../../store/selectors/productsSelector';
import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import globalStyles from '../../utils/globalStyles';
import {moderateScale} from '../../utils/dimensions';
import CustomText from '../../components/CustomText';
import {
  deleteFromCart,
  selectProduct,
} from '../../store/actions/productsActions';

const Cart = ({navigation}) => {
  const dispatch = useDispatch();
  const {products, cartProductsId} = useSelector(getProducts);

  const cartProducts = useMemo(() => {
    return products.filter((item) => cartProductsId.includes(item.id));
  }, [cartProductsId, products]);

  console.log(999, cartProductsId);

  const onDeleteItem = useCallback(
    async (id) => {
      await dispatch(deleteFromCart(id));
    },
    [dispatch],
  );

  const flatListHeader = useCallback(() => <Header title={'Cart'} />, []);
  const renderProductItem = useCallback(
    ({item}) => (
      <ProductCard
        isProductsScreen={false}
        name={item.name}
        price={item.price}
        onDelete={() => onDeleteItem(item.id)}
      />
    ),
    [onDeleteItem],
  );

  const listEmptyComponent = (
    <CustomText
      text={'Oops...There are no products in cart'}
      isCenter
      isBold
      size={'medium'}
    />
  );
  return (
    <SafeAreaView style={globalStyles.root}>
      <FlatList
        data={cartProducts}
        renderItem={renderProductItem}
        ListHeaderComponent={flatListHeader}
        ListHeaderComponentStyle={styles.headerStyles}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={listEmptyComponent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerStyles: {
    marginBottom: moderateScale(30),
  },
});

export default Cart;
