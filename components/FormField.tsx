import { View, Text, TouchableOpacity, Image, TextInput, KeyboardTypeOptions } from 'react-native';
import React, { useState } from 'react';
import { icons } from '@/constants';

interface FieldProps {

  title: string;

  placeholder: string;

  value: string;

  handleChangeText: (text: string) => void;

  otherStyles?: string;

  keyboardType?: KeyboardTypeOptions;

};


const FormField: React.FC<FieldProps> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='font-pmedium text-base text-black-100 mb-2'>{title}</Text>
      <View className='w-full h-14 px-4 border-2 border-gray-100 focus:border-secondary rounded-2xl flex flex-row items-center'>
        <TextInput
          className='flex-1 text-black font-pregular text-base'
          placeholder={placeholder}
          placeholderTextColor='#8A8A8A'
          onChangeText={handleChangeText}
          value={value}
          secureTextEntry={title === 'Password' && !showPassword}
          {...props}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.EyeHide : icons.Eye}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
