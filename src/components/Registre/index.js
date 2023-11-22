import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { TextInputMask } from 'react-native-masked-text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';

const CadastroScreen = () => {
  const [dadosCadastro, setDadosCadastro] = useState({
    nomeCompleto: '',
    dataNascimento: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    cnpj: '',
  });

  const handleChange = (field, value) => {
    setDadosCadastro({
      ...dadosCadastro,
      [field]: value,
    });
  };

  const handleCadastrar = async () => {
    try {
      // Fazendo a requisição POST para cadastrar o usuário
      const response = await axios.post('http://192.168.0.10:8080/auth/registre', {
        nomeCompleto: dadosCadastro.nomeCompleto,
        dataNascimento: dadosCadastro.dataNascimento,
        email: dadosCadastro.email,
        senha: dadosCadastro.senha,
        confirmarSenha: dadosCadastro.confirmarSenha,
        cnpj: dadosCadastro.cnpj,
      });

      console.log('Usuário cadastrado com sucesso:', response.data);
    } catch (error) {
      // Lógica de erro - aqui você pode exibir uma mensagem de erro para o usuário
      console.error('Erro ao cadastrar o usuário:', error);
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
          <Text style={styles.title}>Cadastro</Text>
          <TextInput
            placeholder="Nome Completo"
            value={dadosCadastro.nomeCompleto}
            onChangeText={(text) => handleChange('nomeCompleto', text)}
            style={styles.input}
            placeholderTextColor="#333"
          />
          <TextInputMask
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY',
            }}
            placeholder="Data de Nascimento"
            value={dadosCadastro.dataNascimento}
            onChangeText={(text) => handleChange('dataNascimento', text)}
            style={styles.input}
            placeholderTextColor="#333"
          />
          <TextInput
            placeholder="Email"
            value={dadosCadastro.email}
            onChangeText={(text) => handleChange('email', text)}
            style={styles.input}
            placeholderTextColor="#333"
          />
          <TextInput
            placeholder="Senha"
            value={dadosCadastro.senha}
            onChangeText={(text) => handleChange('senha', text)}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#333"
          />
          <TextInput
            placeholder="Confirmar Senha"
            value={dadosCadastro.confirmarSenha}
            onChangeText={(text) => handleChange('confirmarSenha', text)}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#333"
          />
          <TextInput
            placeholder="CNPJ"
            value={dadosCadastro.cnpj}
            onChangeText={(text) => handleChange('cnpj', text)}
            style={styles.input}
            placeholderTextColor="#333"
          />
          <TouchableOpacity style={styles.button} onPress={handleCadastrar}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default CadastroScreen;