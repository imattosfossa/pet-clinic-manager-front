import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from './styles';

const LoginScreen = ({ navigation }) => {
  const [credenciais, setCredenciais] = useState({
    email: '',
    password: '',
  });

  const handleChange = (field, value) => {
    setCredenciais({
      ...credenciais,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      // Fazendo a requisição POST para autenticar o usuário
      const response = await axios.post('http://192.168.0.10:8080/auth/login', {
        email: credenciais.email,
        password: credenciais.password,
      });
      await AsyncStorage.setItem('token', response.data.token);

      const token = await AsyncStorage.getItem('token');
      console.log('Token recuperado:', token);

    } catch (error) {
      // Lógica de erro - aqui você pode exibir uma mensagem de erro para o usuário
      console.error('Erro ao autenticar o usuário:', error);
    }
  };

  const handleNavigateToCadastro = () => {
    // Navegar para a tela de cadastro
    navigation.navigate('Cadastro');
  };

  return (
    <ImageBackground
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Image source={require('../../../images/logo.png')} style={styles.logo} />
        <TextInput
          placeholder="Email"
          value={credenciais.email}
          onChangeText={(text) => handleChange('email', text)}
          style={styles.input}
          placeholderTextColor="#333" // Cor mais escura para o texto de placeholder
        />
        <TextInput
          placeholder="Senha"
          value={credenciais.password}
          onChangeText={(text) => handleChange('password', text)}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#333" // Cor mais escura para o texto de placeholder
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <View style={styles.cadastrarContainer}>
          <TouchableOpacity onPress={handleNavigateToCadastro}>
            <Text style={styles.cadastrarText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;