import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';

interface ButtonProps {
    title: string;
    handlePress: () => void;
    isLoading?: boolean;
    containerStyles?: string;
    textStyles?: string;
  }

const CustomButton: React.FC<ButtonProps> = ({
  title,
  handlePress,
  isLoading = false,
  containerStyles,
  textStyles,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`bg-secondary rounded-lg min-h-[62px] flex flex-row justify-center items-center ${containerStyles} ${
        isLoading ? 'opacity-50' : ''
      }`}
      disabled={isLoading}
      activeOpacity={0.7}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator animating={isLoading} color="#000" size='small' className='ml-2' />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
