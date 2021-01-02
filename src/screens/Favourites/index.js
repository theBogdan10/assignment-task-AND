import React, {useCallback, useMemo} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import globalStyles from '../../utils/globalStyles';
import {useDispatch, useSelector} from 'react-redux';
import {getProducts} from '../../store/selectors/productsSelector';
import {moderateScale} from '../../utils/dimensions';
import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import {selectProduct} from '../../store/actions/productsActions';
import CustomText from '../../components/CustomText';

const Favourites = ({navigation}) => {
  const dispatch = useDispatch();
  const {products, favouritesProductsId} = useSelector(getProducts);

  const favoritesProducts = useMemo(() => {
    return products.filter((item) => favouritesProductsId.includes(item.id));
  }, [favouritesProductsId, products]);

  const flatListHeader = useCallback(
    () => <Header title={'Favourite products'} />,
    [],
  );
  const renderProductItem = useCallback(
    ({item}) => <ProductCard name={item.name} price={item.price} />,
    [],
  );
  const listEmptyComponent = (
    <CustomText
      text={'Oops...\nThere are no favourite products'}
      isCenter
      isBold
      size={'medium'}
    />
  );
  return (
    <SafeAreaView style={globalStyles.root}>
      <FlatList
        data={favoritesProducts}
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

export default Favourites;
