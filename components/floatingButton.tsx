import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Box } from './ui/box';
import { AddIcon } from './ui/icon';
import { scale } from '@/utils/scale';

type paramsType = {
  onPress: () => void;
};

const FloatingButton = (params: paramsType) => {
  return (
    <Box position='absolute' bottom={12} right={12} zIndex={1}>
      <TouchableOpacity
        onPress={params.onPress}
        style={{
          backgroundColor: '#2567E8',
          width: scale(60),
          height: scale(60),
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 5,
          padding: scale(18),
        }}
      >
        <AddIcon color={'white'} />
      </TouchableOpacity>
    </Box>
  );
};

export default FloatingButton;
