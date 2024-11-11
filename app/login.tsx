// app/login.tsx
import { useForm, Controller } from 'react-hook-form';
import { View, Text, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { useAuthStore } from '../store/authStore';
import { TextInput } from 'react-native';
import { BgLogin } from '../assets/svg/index';
import { scale } from '../utils/scale';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Input, InputIcon, InputSlot } from '@/components/ui/input';

import { InputField } from '@/components/ui/input';
import { VStack } from '@/components/ui/vstack';
import { EyeIcon, EyeOffIcon } from '@/components/ui/icon';

import { Button, ButtonText } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { LoginData } from '@/types/loginData';
import { authLogin } from '@/services/requests';
import { userData } from '@/types/userData';
import axios, { AxiosError } from 'axios';
import { router } from 'expo-router';

type FormData = {
  username: string;
  password: string;
};

export default function LoginScreen() {
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();
  const { login, user, isLoggedIn } = useAuthStore();

  const onSubmit = async (data: FormData) => {
    // Aqui você pode fazer chamadas de API usando Axios para validar as credenciais.

    setErrorMessage('');
    try {
      const response = await authLogin(data);
      login(response as userData);
    } catch (error: unknown) {
      // console.error('Erro ao efetuar login: ', error);

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        console.error('Erro ao fazer login:', axiosError.message);

        // Exibe um aviso ao usuário
        alert(
          'Erro ao fazer login. Verifique suas credenciais e tente novamente.',
        );

        // Verifique se a resposta está disponível e exiba detalhes adicionais
        if (axiosError.response) {
          console.error('Código de status:', axiosError.response.status);
          console.error('Detalhes do erro:', axiosError.response.data);

          if (axiosError.response.data?.message === 'Invalid credentials') {
            setErrorMessage('Username ou senha inválidos');
          } else {
            setErrorMessage(axiosError.response.data?.message);
          }
        }
      } else {
        // Tratamento para outros tipos de erros
        console.error('Erro inesperado:', error);
        alert('Ocorreu um erro inesperado. Tente novamente mais tarde.');
      }
    }
  };

  useEffect(() => {
    if (user !== null && isLoggedIn) {
      router.navigate('/(tabs)');
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#2567E8'} />
      <BgLogin style={styles.background} />
      <Text style={styles.title}>Bem-vindo de volta!</Text>
      <Text style={styles.subtitle}>
        Insira seus dados para entrar na sua conta.
      </Text>
      <View style={styles.form}>
        {errorMessage !== '' && (
          <Text style={styles.error}>{errorMessage}</Text>
        )}
        <VStack space='xs'>
          <Text className='typography-typography-900' style={styles.label}>
            Username
          </Text>
          <Controller
            name='username'
            control={control}
            rules={{ required: 'Username é obrigatório' }}
            render={({ field: { onChange, value } }) => (
              <Input
                variant='outline'
                size='md'
                isDisabled={false}
                isReadOnly={false}
                isInvalid={!!errors.username}
              >
                <InputField
                  //   placeholder='Enter Text here...'
                  value={value}
                  onChangeText={onChange}
                />
              </Input>
            )}
          />
          {errors.username && (
            <View style={styles.errorView}>
              <AntDesign name='exclamationcircleo' size={16} color='#B91C1C' />
              <Text style={styles.errorText}>{errors.username.message}</Text>
            </View>
          )}
        </VStack>
        <VStack space='xs'>
          <Text className='text-typography-1 leading-1' style={styles.label}>
            Senha
          </Text>
          <Controller
            name='password'
            control={control}
            rules={{ required: 'Senha é obrigatório' }}
            render={({ field: { onChange, value } }) => (
              <Input
                variant='outline'
                size='md'
                isDisabled={false}
                isReadOnly={false}
                isInvalid={!!errors.password}
              >
                <InputField
                  type={showPassword ? 'text' : 'password'}
                  onChangeText={onChange}
                  value={value}
                />
                <InputSlot
                  className='pr-3'
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                </InputSlot>
              </Input>
            )}
          />
          {errors.password && (
            <View style={styles.errorView}>
              <AntDesign name='exclamationcircleo' size={16} color='#B91C1C' />
              <Text style={styles.errorText}>{errors.password.message}</Text>
            </View>
          )}
        </VStack>
        <Button
          className='ml-full'
          style={{ backgroundColor: '#2567E8' }}
          onPress={handleSubmit(onSubmit)}
        >
          <ButtonText className='text-typography-0'>Entrar</ButtonText>
        </Button>
        {/* <Button title='Login' onPress={handleSubmit(onSubmit)} /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: scale(250),
    flexDirection: 'column',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    width: scale(1000),
    left: scale(-100),
  },
  title: {
    color: '#fff',
    fontWeight: '600',
    fontSize: scale(32),
  },
  subtitle: {
    color: '#fff',
    fontWeight: '400',
    fontSize: scale(16),
    marginTop: scale(12),
    marginBottom: scale(24),
  },
  form: {
    borderWidth: scale(1),
    borderColor: '#BDBDBD',
    borderRadius: scale(16),
    backgroundColor: '#fff',
    width: scale(334),
    rowGap: scale(32),
    paddingHorizontal: scale(16),
    paddingTop: scale(36),
    paddingBottom: scale(48),
  },
  label: {
    fontWeight: '500',
    fontSize: scale(14),
  },
  error: {
    color: '#B91C1C',
    fontWeight: 400,
    fontSize: scale(16),
    textAlign: 'center',
  },
  errorView: {
    flexDirection: 'row',
    columnGap: scale(8),
    alignItems: 'center',
    marginTop: scale(4),
  },
  errorText: {
    color: '#B91C1C',
    fontWeight: 400,
    fontSize: scale(14),
  },
});
