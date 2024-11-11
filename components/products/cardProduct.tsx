import { productType } from '@/types/productType';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { scale } from '@/utils/scale';
import { formatCurrency } from '@/utils/currency';
import { router } from 'expo-router';

type paramsCardProduct = {
  product: productType;
};

const CardProduct = (product: paramsCardProduct) => {
  return (
    <TouchableOpacity
      style={styles.card}
      key={product.product.id}
      onPress={() =>
        router.navigate({
          pathname: '/product',
          params: { id: product.product.id },
        })
      }
    >
      <View style={styles.imageView}>
        <Image
          source={{ uri: product.product.images[0] }}
          alt='Produto'
          resizeMode='contain'
          width={scale(100)}
          height={scale(100)}
        />
      </View>
      <View style={styles.infos}>
        <Text style={styles.title}>{product.product.title}</Text>
        <Text style={styles.desc} numberOfLines={4}>
          {product.product.description}
        </Text>
        {product.product.discountPercentage > 0 ? (
          <View style={styles.priceView}>
            <Text style={styles.priceTxt} numberOfLines={2}>
              {formatCurrency(
                product.product.price *
                  (1 - product.product.discountPercentage / 100),
              )}
            </Text>
            <Text style={styles.oldPriceTxt}>
              {formatCurrency(product.product.price)}
            </Text>
          </View>
        ) : (
          <View style={styles.priceView}>
            <Text style={styles.priceTxt}>
              {formatCurrency(product.product.price)}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
export default CardProduct;

const styles = StyleSheet.create({
  cardsArea: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: scale(16),
    rowGap: scale(16),
    paddingHorizontal: scale(20),
    justifyContent: 'space-between',
  },
  card: {
    width: scale(168),
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: '#bdbdbd',
  },
  imageView: {
    borderBottomWidth: scale(1),
    width: '100%',
    borderBottomColor: '#bdbdbd',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  infos: {
    padding: scale(12),
  },
  title: {
    fontWeight: '600',
    fontSize: scale(16),
    color: '#000',
  },
  desc: {
    fontWeight: '400',
    fontSize: scale(10),
    color: '#656565',
    marginTop: scale(10),
    marginBottom: scale(14),
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    columnGap: scale(16),
    rowGap: scale(6),
    flexWrap: 'wrap',
  },
  priceTxt: {
    fontWeight: '600',
    fontSize: scale(14),
    color: '#000',
  },
  oldPriceTxt: {
    fontWeight: '600',
    fontSize: scale(10),
    color: '#656565',
    textDecorationLine: 'line-through',
  },
});
