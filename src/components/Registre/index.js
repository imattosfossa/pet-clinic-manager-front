import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { TextInputMask } from 'react-native-masked-text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';

const RegistrationScreen = () => {
  const [registrationData, setRegistrationData] = useState({
    name: '',
    dateOfBirth: '',
    email: '',
    password: '',
    confirmPassword: '',
    document: '',
  });

  const [errorMessages, setErrorMessages] = useState({
    name: '',
    dateOfBirth: '',
    email: '',
    password: '',
    confirmPassword: '',
    document: '',
  });

  const validateFields = () => {
    let isValid = true;
    const errors = {};

    // Validar campos obrigatórios
    Object.entries(registrationData).forEach(([key, value]) => {
      if (value.trim() === '') {
        isValid = false;
        errors[key] = 'Campo obrigatório';
      }
    });

    setErrorMessages(errors);
    return isValid;
  };

  const validatePassword = () => {
    const errors = { ...errorMessages };
  
    // Validar senhas iguais
    if (registrationData.password !== registrationData.confirmPassword) {
      errors.password = 'As senhas não coincidem';
      errors.confirmPassword = 'As senhas não coincidem';
    } else {
      errors.password = '';
      errors.confirmPassword = '';
    }
  
    setErrorMessages(errors);
  
    // Retornar true se não houver mensagens de erro nas senhas
    return !errors.password && !errors.confirmPassword;
  };

  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);

  const handleCadastrar = async () => {
    const fieldsValid = validateFields();
    const passwordsValid = validatePassword();

    if (fieldsValid && passwordsValid) {
      try {

        const day = registrationData.dateOfBirth.split('/')[0];
        const mounth = registrationData.dateOfBirth.split('/')[1]
        const year = registrationData.dateOfBirth.split('/')[2]
        const formattedDateOfBirth = year + "-" + mounth + "-" + day;
        const response = await axios.post('http://192.168.0.10:8080/auth/register', {
          name: registrationData.name,
          dateOfBirth: formattedDateOfBirth,
          email: registrationData.email,
          password: registrationData.password,
          confirmPassword: registrationData.confirmPassword,
          document: registrationData.document,
        });

        console.log('Usuário cadastrado com sucesso, favor confirmar cadastro no e-mail');
      } catch (error) {
        console.error('Erro ao cadastrar o usuário:', error);
      }
    }
  };

  return (
    <ImageBackground style={styles.backgroundImage}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
      >
        <StatusBar style="auto" />
        <Image source={require('../../../images/logo.png')} style={styles.logo} />
        <View style={styles.formContainer}>
          {showConfirmationMessage && (
            <Text style={styles.confirmationMessage}>
              Para finalizar, é necessário confirmar o e-mail enviado para {registrationData.email}.
            </Text>
          )}
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Cadastro</Text>
          <TextInput
            placeholder="Nome Completo"
            value={registrationData.name}
            onChangeText={(text) => setRegistrationData({ ...registrationData, name: text })}
            style={styles.input}
            placeholderTextColor="#333"
          />
          <Text style={styles.errorText}>{errorMessages.name}</Text>

          <TextInputMask
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY',
            }}
            placeholder="Data de Nascimento"
            value={registrationData.dateOfBirth}
            onChangeText={(text) => setRegistrationData({ ...registrationData, dateOfBirth: text })}
            style={styles.input}
            placeholderTextColor="#333"
          />
          <Text style={styles.errorText}>{errorMessages.dateOfBirth}</Text>

          <TextInput
            placeholder="Email"
            value={registrationData.email}
            onChangeText={(text) => setRegistrationData({ ...registrationData, email: text })}
            style={styles.input}
            placeholderTextColor="#333"
          />
          <Text style={styles.errorText}>{errorMessages.email}</Text>

          <TextInput
            placeholder="Senha"
            value={registrationData.password}
            onChangeText={(text) => setRegistrationData({ ...registrationData, password: text })}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#333"
          />
          <Text style={styles.errorText}>{errorMessages.password}</Text>

          <TextInput
            placeholder="Confirmar Senha"
            value={registrationData.confirmPassword}
            onChangeText={(text) => setRegistrationData({ ...registrationData, confirmPassword: text })}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#333"
          />
          <Text style={styles.errorText}>{errorMessages.confirmPassword}</Text>

          <TextInput
            placeholder="Documento"
            value={registrationData.document}
            onChangeText={(text) => setRegistrationData({ ...registrationData, document: text })}
            style={styles.input}
            placeholderTextColor="#333"
          />
          <Text style={styles.errorText}>{errorMessages.document}</Text>

          <TouchableOpacity style={styles.button} onPress={handleCadastrar}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default RegistrationScreen;
