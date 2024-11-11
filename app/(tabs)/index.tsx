import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {
  fetchAllProductsCategories,
  fetchCategories,
} from '@/services/requests';
import { useEffect, useState } from 'react';
import { TabView } from 'react-native-tab-view';
import { TabBar } from 'react-native-tab-view';
import { Dimensions } from 'react-native';
import { scale } from '@/utils/scale';
import CardProduct from '@/components/products/cardProduct';
import FloatingButton from '@/components/floatingButton';
import { router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { categoryType } from '@/types/categoryType';
import { productsArrayType } from '@/types/productType';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'expo-router';

type RouteType = {
  key: string;
  title: string;
  url: string;
};
type SceneType = {
  route: RouteType;
};

type slugsType = {
  url: string;
  slug: string;
};

export default function Home() {
  const [index, setIndex] = useState(0);

  const { isLoggedIn, user } = useAuthStore();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const [slugs, setSlugs] = useState<slugsType[] | []>([]);
  const [routes, setRoutes] = useState<RouteType[]>([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      if (!isLoggedIn || !user?.accessToken) {
        router.navigate('/login');
      }
    }
  }, [isMounted, isLoggedIn, user, router]);

  const {
    data: categories,
    error: errorCategories,
    isLoading,
  } = useQuery<categoryType[]>({
    queryKey: ['product-categories'],
    queryFn: () => fetchCategories(),
  });
  const {
    data: products,
    error: errorProducts,
    isLoading: isLoadingProducts,
  } = useQuery<productsArrayType[]>({
    queryKey: ['all-products', slugs],
    queryFn: () => fetchAllProductsCategories(slugs),
  });

  const getProductsCategorys = () => {
    if (categories) {
      const slugsCategorys = categories?.map(category => ({
        url: category.url,
        slug: category.slug,
      }));
      setSlugs(slugsCategorys);
    }
  };

  useEffect(() => {
    if (categories !== undefined && categories.length > 0) {
      const newRoutes = categories?.map(category => ({
        key: category.slug,
        title: category.name,
        url: category.url,
      }));
      setRoutes(newRoutes);
    }
    getProductsCategorys();
  }, [categories]);

  const renderScene = (params: SceneType) => {
    let productsCategory;
    if (products) {
      productsCategory =
        products.length > 0
          ? products.find(cat => cat.slug === params.route.key)
          : null;
    }

    if (!products) {
      return null;
    }

    return (
      <FlatList
        data={productsCategory?.products}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <CardProduct product={item} />}
        numColumns={2}
        contentContainerStyle={styles.cardsArea}
        columnWrapperStyle={styles.columnWrapper}
      />
    );
  };

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      scrollEnabled={true}
      style={styles.tabBar}
      indicatorStyle={styles.indicator}
      labelStyle={styles.label}
      tabStyle={styles.tabStyle}
    />
  );

  if (errorCategories || errorProducts) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          {
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}
      >
        <Text
          style={{
            paddingHorizontal: scale(16),
            fontWeight: '600',
            fontSize: scale(20),
            color: '#E63535',
            textAlign: 'center',
          }}
        >
          Não foi possível carregar os produtos, por favor reinicie o
          aplicativo.
        </Text>
      </SafeAreaView>
    );
  } else if (isLoading || isLoadingProducts) {
    return (
      <SafeAreaView
        style={[
          styles.container,

          {
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}
      >
        <ActivityIndicator color={'#2567E8'} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        { paddingTop: Platform.OS !== 'ios' ? scale(25) : 0 },
      ]}
    >
      {routes.length > 0 && (
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: Dimensions.get('window').width }}
          renderTabBar={renderTabBar}
        />
      )}
      <FloatingButton
        onPress={() => {
          router.navigate('/addProduct');
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scene: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: '#fff',
    height: scale(50),
  },
  indicator: {
    height: scale(2.5),
    backgroundColor: '#2567E8',
  },
  label: {
    color: 'black',
    fontWeight: 600,
    fontSize: scale(12),
  },
  tabStyle: {
    width: 'auto',
    paddingVertical: scale(10),
    height: scale(30),
  },
  cardsArea: {
    rowGap: scale(16),
    paddingVertical: scale(24),
    paddingHorizontal: scale(20),
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});
