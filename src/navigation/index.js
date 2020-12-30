import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {
  calcHeight,
  calcWidth,
  deviceWidth,
  moderateScale,
} from '../utils/dimensions';
import {REGULAR_FONT, SEMI_BOLD_FONT} from '../utils/fonts';
import {BLACK, RED_PRIMARY, WHITE} from '../utils/colors';
import CartIcon from '../assets/icons/cartIcon.svg';
import ProductsIcon from '../assets/icons/listIcon.svg';
import FavoriteIcon from '../assets/icons/favoriteIcon.svg';
import {SMALL_FONT} from '../utils/constants';
import {NavigationScreens} from './screens';
import Products from '../screens/Products';
import Cart from '../screens/Cart';
import Favorites from '../screens/Favorites';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const renderIcon = (routeName, isActive) => {
  switch (routeName) {
    case NavigationScreens.PRODUCTS:
      return (
        <ProductsIcon
          fill={isActive ? RED_PRIMARY : BLACK}
          width={moderateScale(20)}
          height={moderateScale(20)}
        />
      );
    case NavigationScreens.CART:
      return (
        <CartIcon
          fill={isActive ? RED_PRIMARY : BLACK}
          height={moderateScale(20)}
          width={moderateScale(20)}
        />
      );
    case NavigationScreens.FAVORITES:
      return (
        <FavoriteIcon
          fill={isActive ? RED_PRIMARY : BLACK}
          height={moderateScale(20)}
          width={moderateScale(20)}
        />
      );
  }
};

const HomeStack = () => {
  return (
    <Tab.Navigator
      initialRouteName={NavigationScreens.HOME}
      tabBarOptions={{
        showIcon: true,
        style: styles.tabBarOptionsStyle,
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          return renderIcon(route.name, focused);
        },
        tabBarLabel: ({focused}) => {
          return (
            <Text
              style={[
                styles.underIconText,
                focused && styles.underIconTextFocused,
              ]}>
              {route.name}
            </Text>
          );
        },
      })}>
      <Tab.Screen name={NavigationScreens.PRODUCTS} component={Products} />
      <Tab.Screen name={NavigationScreens.CART} component={Cart} />
      <Tab.Screen name={NavigationScreens.FAVORITES} component={Favorites} />
    </Tab.Navigator>
  );
};

const Navigator = ({token}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => setIsLoading(false), []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {!isLoading ? (
          <Stack.Navigator headerMode="none">
            <Stack.Screen name={NavigationScreens.HOME} component={HomeStack} />
          </Stack.Navigator>
        ) : (
          <ActivityIndicator color={RED_PRIMARY} size={'large'} />
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  underIconText: {
    fontSize: SMALL_FONT,
    fontFamily: REGULAR_FONT,
    textAlign: 'center',
    color: BLACK,
    marginBottom: calcHeight(3),
  },
  underIconTextFocused: {
    color: RED_PRIMARY,
  },
  tabBarOptionsStyle: {
    backgroundColor: WHITE,
    width: deviceWidth,
    zIndex: 8,
  },
});

export default Navigator;
