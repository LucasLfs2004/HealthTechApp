// app/login.tsx
import { useForm, Controller } from 'react-hook-form';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { scale } from '../utils/scale';
import { Input } from '@/components/ui/input';
import ModalMessage from '@/components/ModalMessage';
import { InputField } from '@/components/ui/input';
import { VStack } from '@/components/ui/vstack';
import { Button, ButtonText } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { editProductId, fetchProductId } from '@/services/requests';
import axios, { AxiosError } from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import { newProductType, productType } from '@/types/productType';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { Platform } from 'react-native';

export default function AddProduct() {
  const { id } = useLocalSearchParams();

  const { control, handleSubmit, reset } = useForm<newProductType>();
  const [modalMessageActive, setModalMessageActive] = useState(false);
  const [messageModal, setMessageModal] = useState({ title: '', message: '' });
  const [product, setProduct] = useState<productType | null>(null);

  const getProduct = async () => {
    try {
      const response = await fetchProductId(id.toString());
      setProduct(response);
    } catch (error) {}
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      reset({
        title: product.title,
        description: product.description,
        price: formatPrice(product.price ? product.price.toString() : ''),
        discountPercentage: product.discountPercentage
          ? product.discountPercentage.toString()
          : '',
        images: product.images[0],
      });
    }
  }, [product, reset]);

  const formatPrice = (value: string) => {
    const numericValue = parseFloat(value.replace(/\D/g, ''));
    const formattedValue = (numericValue / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return formattedValue;
  };

  const onSubmit = async (data: newProductType) => {
    try {
      data.discountPercentage = parseFloat(String(data.discountPercentage));
      data.price = parseFloat(
        String(data.price)
          .replace('R$', '')
          .replace('.', '')
          .replace(',', '.')
          .trim(),
      );
      if (product) {
        const response = await editProductId(data, product?.id?.toString());
        setProduct(response);
        setModalMessageActive(true);
        setMessageModal({ title: 'Produto editado com sucesso!', message: '' });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        console.error('Erro ao editar produto:', axiosError.response?.data);

        setModalMessageActive(true);
        setMessageModal({
          title: 'Falha ao editar',
          message:
            'Ocorreu um erro ao editar o produto, por favor tente novamente',
        });
      } else {
        console.error('Erro inesperado:', error);
        alert('Ocorreu um erro inesperado. Tente novamente mais tarde.');
      }
    }
  };

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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name='arrowleft' size={scale(32)} color='black' />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Editar Produto</Text>
      </View>
      <View style={styles.main}>
        <View style={styles.form}>
          <VStack space='xs'>
            <Text className='typography-typography-900' style={styles.label}>
              Nome
            </Text>
            <Controller
              name='title'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  variant='outline'
                  size='md'
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                >
                  <InputField
                    //   placeholder='Enter Text here...'
                    value={value}
                    onChangeText={onChange}
                  />
                </Input>
              )}
            />
          </VStack>
          <VStack space='xs'>
            <Text className='typography-typography-900' style={styles.label}>
              Descrição
            </Text>
            <Controller
              name='description'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Textarea
                  size='md'
                  isReadOnly={false}
                  isInvalid={false}
                  isDisabled={false}
                  className='w-full'
                >
                  <TextareaInput value={value} onChangeText={onChange} />
                </Textarea>
              )}
            />
          </VStack>
          <VStack space='xs'>
            <Text className='typography-typography-900' style={styles.label}>
              Preço (R$)
            </Text>
            <Controller
              name='price'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  variant='outline'
                  size='md'
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                >
                  <InputField
                    keyboardType='numeric'
                    value={value?.toString()}
                    onChangeText={value => onChange(formatPrice(value))}
                  />
                </Input>
              )}
            />
          </VStack>
          <VStack space='xs'>
            <Text className='typography-typography-900' style={styles.label}>
              Desconto (%)
            </Text>
            <Controller
              name='discountPercentage'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  variant='outline'
                  size='md'
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                >
                  <InputField
                    value={value?.toString()}
                    onChangeText={onChange}
                    keyboardType='numeric'
                  />
                </Input>
              )}
            />
          </VStack>
          <VStack space='xs'>
            <Text className='typography-typography-900' style={styles.label}>
              URL da imagem
            </Text>
            <Controller
              name='images'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  variant='outline'
                  size='md'
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                >
                  <InputField
                    //   placeholder='Enter Text here...'
                    value={value}
                    onChangeText={onChange}
                  />
                </Input>
              )}
            />
          </VStack>
        </View>
        <Button
          className='ml-full'
          style={{ backgroundColor: '#2567E8', marginBottom: scale(12) }}
          onPress={handleSubmit(onSubmit)}
        >
          <ButtonText className='text-typography-0'>Salvar</ButtonText>
        </Button>
      </View>
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
    paddingTop: Platform.OS !== 'ios' ? scale(36) : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: scale(24),
    columnGap: scale(12),
  },
  textHeader: {
    color: '#000',
    fontWeight: '600',
    fontSize: scale(24),
  },
  main: {
    paddingHorizontal: scale(18),
    paddingVertical: scale(24),
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
  },
  form: {
    rowGap: scale(18),
  },
  label: {
    color: '#000',
    fontWeight: '500',
    fontSize: scale(14),
  },

  modal: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: scale(16),
    padding: scale(24),
    width: scale(320),
    flexDirection: 'column',
  },
  titleModal: {
    fontWeight: '600',
    fontSize: scale(16),
    textAlign: 'center',
  },
  descriptionModal: {
    width: '100%',
    fontWeight: '400',
    fontSize: scale(14),
  },
  infosModal: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: scale(24),
    rowGap: scale(8),
    paddingVertical: scale(12),
  },
});
