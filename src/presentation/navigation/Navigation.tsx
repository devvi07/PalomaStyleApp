import { createStackNavigator, StackCardStyleInterpolator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/home/HomeScreen";
import { WomanScreen } from "../screens/woman/WomanScreen";
import { ManScreen } from "../screens/man/ManScreen";
import { KidsScreen } from "../screens/kids/KidsScreen";
import { ProductDetail } from "../screens/products/ProductDetail";
import { AddProductosScreen } from "../screens/products/AddProductosScreen";

export type RootStackParams = {
  HomeScreen: undefined;
  Women: undefined;
  Men: undefined;
  Kids: undefined;
  ProductDetail: undefined;
  AddProductos: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

const fadeAnimation: StackCardStyleInterpolator = ({current}) => {
  return {
    cardStyle: {
      opacity: current.progress,
    },
  };
};


export const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          cardStyleInterpolator: fadeAnimation,
          headerShown: false,
          title: '',
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#FFF',
          //headerTitleAlign: 'left'
        }}
      />

      <Stack.Screen
        name="Women"
        component={WomanScreen}
        options={{
          cardStyleInterpolator: fadeAnimation,
          headerShown: false,
          title: '',
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#FFF',
          //headerTitleAlign: 'left'
        }}
      />

      <Stack.Screen
        name="Men"
        component={ManScreen}
        options={{
          cardStyleInterpolator: fadeAnimation,
          headerShown: false,
          title: '',
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#FFF',
          //headerTitleAlign: 'left'
        }}
      />

      <Stack.Screen
        name="Kids"
        component={KidsScreen}
        options={{
          cardStyleInterpolator: fadeAnimation,
          headerShown: false,
          title: '',
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#FFF',
          //headerTitleAlign: 'left'
        }}
      />

      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{
          cardStyleInterpolator: fadeAnimation,
          headerShown: true,
          title: 'Detalle del producto',
          headerStyle: {
            backgroundColor: '#FFF',
          },
          headerTintColor: '#ff9887',
          //headerTitleAlign: 'left'
        }}
      />

      <Stack.Screen
        name="AddProductos"
        component={AddProductosScreen}
        options={{
          cardStyleInterpolator: fadeAnimation,
          headerShown: false,
          title: '',
          headerStyle: {
            backgroundColor: '#FFF',
          },
          headerTintColor: '#ff9887',
          //headerTitleAlign: 'left'
        }}
      />

    </Stack.Navigator>
  );
};