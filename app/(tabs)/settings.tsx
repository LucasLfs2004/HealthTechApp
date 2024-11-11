import { StyleSheet } from 'react-native';
import { useState } from 'react';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View, Image } from 'react-native';
import { useAuthStore } from '@/store/authStore';
import { scale } from '@/utils/scale';
import { Button, ButtonText, ButtonIcon } from '@/components/ui/button';
import { FontAwesome } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import {
  Icon,
  CloseIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@/components/ui/icon';
import { router } from 'expo-router';
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@/components/ui/modal';
import ModalConfirm from '@/components/ModalConfirm';

export default function SettingsScreens() {
  const { user, logout } = useAuthStore();
  const [modalActive, setModalActive] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.perfilInfos}>
          {user?.image && (
            <View style={styles.imgView}>
              <Image source={{ uri: user.image }} style={styles.img} />
            </View>
          )}
          <Text
            style={styles.name}
          >{`${user?.firstName} ${user?.lastName}`}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
        <View style={styles.btnArea}>
          <Button variant='outline' className='ml-full h-12 justify-between'>
            <View style={styles.btnView}>
              <FontAwesome name='user' size={24} color='#454545' />
              <ButtonText style={styles.btnText}>Meus dados</ButtonText>
            </View>
            <ButtonIcon as={ChevronRightIcon} className='ml-2' />
          </Button>
          <Button variant='outline' className='ml-full h-12 justify-between'>
            <View style={styles.btnView}>
              <MaterialCommunityIcons name='bell' size={24} color='#454545' />
              <ButtonText style={styles.btnText}>Notificações</ButtonText>
            </View>
            <ButtonIcon as={ChevronRightIcon} className='ml-2' />
          </Button>
          <Button variant='outline' className='ml-full h-12 justify-between'>
            <View style={styles.btnView}>
              <MaterialIcons name='edit-document' size={24} color='#454545' />
              <ButtonText style={styles.btnText}>Termos de Uso</ButtonText>
            </View>
            <ButtonIcon as={ChevronRightIcon} className='ml-2' />
          </Button>
          <Button
            className='ml-full mt-[8]'
            style={{ backgroundColor: '#E63535' }}
            onPress={() => setModalActive(true)}
          >
            <ButtonText className='text-typography-0'>Sair da conta</ButtonText>
          </Button>
        </View>
      </View>
      <ModalConfirm
        visible={modalActive}
        closeModal={() => setModalActive(false)}
        title='Sair da conta'
        message='Você tem certeza que deseja sair da conta?'
        btnText='Sair'
        actionButton={() => {
          logout();
          router.navigate('/login');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#2567E8',
    position: 'relative',
  },
  content: {
    backgroundColor: '#fff',
    width: '100%',
    height: scale(550),
    borderTopEndRadius: scale(16),
    borderTopStartRadius: scale(16),
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  perfilInfos: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    top: scale(-75),
    backgroundColor: 'transparent',
  },
  imgView: {
    backgroundColor: '#fff',
    width: scale(150),
    height: scale(150),
    borderRadius: scale(75),
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: scale(120),
    height: scale(120),
    borderRadius: scale(60),
  },
  name: {
    fontWeight: '600',
    fontSize: scale(24),
  },
  email: {
    color: '#656565',
    fontWeight: '400',
    fontSize: scale(20),
  },
  btnArea: {
    paddingTop: scale(156),
    flexDirection: 'column',
    paddingHorizontal: scale(20),
    rowGap: scale(16),
  },
  btnView: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: scale(12),
  },
  btnText: {
    fontWeight: '500',
    fontSize: scale(16),
  },
});
