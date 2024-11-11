import { deleteProductId, fetchProductId } from '@/services/requests';
import { productType } from '@/types/productType';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { formatCurrency } from '@/utils/currency';
import { Button, ButtonText } from '@/components/ui/button';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';
import ModalConfirm from '@/components/ModalConfirm';
import { Platform } from 'react-native';

import { scale } from '@/utils/scale';
import ModalMessage from '@/components/ModalMessage';

export default function ProductScreen() {
  const { id } = useLocalSearchParams();

  const [modalActive, setModalActive] = useState(false);
  const [modalMessageActive, setModalMessageActive] = useState(false);
  const [messageModal, setMessageModal] = useState({ title: '', message: '' });
  const [product, setProduct] = useState<productType>();

  const getProduct = async () => {
    try {
      const response = await fetchProductId(id.toString());
      setProduct(response);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async () => {
    try {
      const response = await deleteProductId(id.toString());
      if (response.isDeleted) {
        setModalActive(false);
        setModalMessageActive(true);
        setMessageModal({
          title: 'Produto excluído',
          message: 'O produto foi excluído com sucesso',
        });
      }
    } catch (error) {
      console.log(error);
      setModalActive(false);
      setModalMessageActive(true);
      setMessageModal({
        title: 'Um erro aconteceu',
        message:
          'Não foi possível excluir o produto, por favor tente novamente',
      });
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  if (!product) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { alignItems: 'center', justifyContent: 'center' },
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
        { paddingTop: Platform.OS !== 'ios' ? scale(36) : 0 },
      ]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name='arrowleft' size={scale(32)} color='black' />
        </TouchableOpacity>
      </View>
      <View style={styles.imgView}>
        <Image source={{ uri: product.images[0] }} style={styles.imgProduct} />
      </View>
      <View style={styles.content}>
        <View style={styles.infos}>
          <Text style={styles.title}>{product.title}</Text>
          {product.discountPercentage > 0 ? (
            <View style={styles.priceView}>
              <Text style={styles.priceTxt} numberOfLines={2}>
                {formatCurrency(
                  product.price * (1 - product.discountPercentage / 100),
                )}
              </Text>
              <Text style={styles.oldPriceTxt}>
                {formatCurrency(product.price)}
              </Text>
            </View>
          ) : (
            <View style={styles.priceView}>
              <Text style={styles.priceTxt}>
                {formatCurrency(product.price)}
              </Text>
            </View>
          )}
          <Text style={styles.desc} numberOfLines={4}>
            {product.description}
          </Text>
        </View>
        <View style={styles.btnArea}>
          <Button
            variant='solid'
            className='ml-full h-10'
            style={{ backgroundColor: '#2567E8' }}
            onPress={() =>
              router.navigate({
                pathname: '/editProduct',
                params: { id: product.id },
              })
            }
          >
            <ButtonText style={styles.btnText}>Editar</ButtonText>
            <FontAwesome5 name='edit' size={14} color='white' />
          </Button>
          <Button
            variant='solid'
            className='ml-full h-10'
            style={{ backgroundColor: '#E63535' }}
            onPress={() => setModalActive(true)}
          >
            <ButtonText style={styles.btnText}>Excluir</ButtonText>
            <Feather name='trash' size={14} color='white' />
          </Button>
        </View>
      </View>

      <ModalConfirm
        visible={modalActive}
        closeModal={() => setModalActive(false)}
        title='Excluir produto'
        message='Você tem certeza que deseja excluir esse produto? Essa ação não poderá ser desfeita.'
        btnText='Excluir'
        actionButton={() => deleteProduct()}
      />
      <ModalMessage
        visible={modalMessageActive}
        closeModal={() => setModalMessageActive(false)}
        title={messageModal.title}
        message={messageModal.message}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: scale(24),
    columnGap: scale(12),
    paddingBottom: scale(8),
  },
  textHeader: {
    color: '#000',
    fontWeight: '600',
    fontSize: scale(24),
  },
  imgView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#DADADA33',
  },
  imgProduct: {
    objectFit: 'contain',
    width: scale(235),
    height: scale(235),
  },
  content: {
    flex: 1,
    paddingHorizontal: scale(20),
    paddingVertical: scale(16),
    justifyContent: 'space-between',
  },
  infos: {
    padding: scale(12),
  },
  title: {
    fontWeight: '600',
    fontSize: scale(24),
    color: '#000',
  },
  desc: {
    fontWeight: '400',
    fontSize: scale(16),
    color: '#656565',
    marginTop: scale(10),
    marginBottom: scale(14),
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    columnGap: scale(16),
    rowGap: scale(6),
    marginTop: scale(8),
    flexWrap: 'wrap',
  },
  priceTxt: {
    fontWeight: '600',
    fontSize: scale(24),
    color: '#B20000',
  },
  oldPriceTxt: {
    fontWeight: '600',
    fontSize: scale(20),
    color: '#656565',
    textDecorationLine: 'line-through',
  },
  btnArea: {
    flexDirection: 'column',
    rowGap: scale(8),
  },
  btnText: {
    fontWeight: '500',
    fontSize: scale(12),
    color: '#fff',
  },
});
