// app/login.tsx
import { useForm, Controller } from 'react-hook-form';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Image } from '@/components/ui/image';
import { scale } from '../utils/scale';
import { Input } from '@/components/ui/input';
import { InputField } from '@/components/ui/input';
import { VStack } from '@/components/ui/vstack';
import { Button, ButtonText } from '@/components/ui/button';
import { useState } from 'react';
import { postNewProduct } from '@/services/requests';
import axios, { AxiosError } from 'axios';
import { router } from 'expo-router';
import { newProductType } from '@/types/productType';
import { Platform } from 'react-native';

export default function AddProduct() {
  const { control, handleSubmit, reset } = useForm<newProductType>();
  const [priceValue, setPriceValue] = useState('');
  const [newProduct, setNewProduct] = useState<newProductType | null>();
  const [productAdded, setProductAdded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  //   const [message, setMessage] = useState();

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
      const response = await postNewProduct(data);
      setProductAdded(true);
      setNewProduct(response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        console.error('Erro ao adicionar novo produto:', axiosError.message);

        setErrorMessage(
          'Erro ao cadastrar produto, verifique os campos preenchidos e tente novamente',
        );

        if (axiosError.response) {
          setErrorMessage(axiosError.response.data?.message);
        }
      } else {
        console.error('Erro inesperado:', error);
        alert('Ocorreu um erro inesperado. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* <ArrowLeftIcon /> */}
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name='arrowleft' size={scale(32)} color='black' />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Adicionar Produto</Text>
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
          {errorMessage && <Text>{errorMessage}</Text>}
        </View>
        <Button
          className='ml-full'
          style={{ backgroundColor: '#2567E8', marginBottom: scale(12) }}
          onPress={handleSubmit(onSubmit)}
        >
          <ButtonText className='text-typography-0'>Salvar</ButtonText>
        </Button>
      </View>
      <Modal transparent visible={productAdded}>
        <View style={styles.modal}>
          <View style={styles.modalView}>
            <Text style={styles.titleModal}>
              Produto adicionado com sucesso!
            </Text>
            <View style={styles.infosModal}>
              {newProduct?.images && (
                <Image
                  source={{
                    uri: newProduct?.images,
                  }}
                  alt='Produto'
                  size='xl'
                  width={scale(160)}
                  height={scale(160)}
                />
              )}
              <Text style={styles.titleModal}>{newProduct?.title}</Text>
              <Text style={styles.descriptionModal}>
                {newProduct?.description}
              </Text>
            </View>
            <Button
              className='ml-full'
              style={{ backgroundColor: '#2567E8', marginBottom: scale(12) }}
              onPress={() => {
                setProductAdded(false);
                setNewProduct(null);
                reset();
              }}
            >
              <ButtonText className='text-typography-0'>Fechar</ButtonText>
            </Button>
          </View>
        </View>
      </Modal>
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
