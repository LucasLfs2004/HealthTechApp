import { scale } from '@/utils/scale';
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@/components/ui/modal';
import { Text, StyleSheet } from 'react-native';
import { Icon, CloseIcon } from './ui/icon';
import { Button, ButtonText } from './ui/button';

type modalType = {
  visible: boolean;
  title: string;
  message: string;
  //   btnText: string;
  closeModal: () => void;
  //   actionButton: () => void;
};

const ModalMessage = (params: modalType) => {
  return (
    <Modal isOpen={params.visible} onClose={() => params.closeModal()}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Text style={styles.modalHeaderText}>{params.title}</Text>
          {/* <ModalCloseButton onPress={() => params.closeModal()}>
            <Icon
              as={CloseIcon}
              size='md'
              className='stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900'
            />
          </ModalCloseButton> */}
        </ModalHeader>
        <ModalBody>
          <Text className='text-typography-500' style={styles.modalMessage}>
            {params.message}
          </Text>
        </ModalBody>
        <ModalFooter>
          {/* <Button
            variant='outline'
            action='secondary'
            onPress={() => params.closeModal()}
          >
            <ButtonText style={{ fontWeight: '500', color: '#8C8C8C' }}>
              Cancelar
            </ButtonText>
          </Button> */}
          <Button
            style={{ backgroundColor: '#2567E8' }}
            onPress={() => {
              params.closeModal();
              //   params.actionButton();
            }}
          >
            <ButtonText>Voltar</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalMessage;

const styles = StyleSheet.create({
  modalHeaderText: {
    fontWeight: '600',
    fontSize: scale(18),
    marginBottom: scale(8),
  },
  modalMessage: {
    fontWeight: '400',
    fontSize: scale(14),
  },
});
