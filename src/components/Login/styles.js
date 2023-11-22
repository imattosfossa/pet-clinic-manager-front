import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: '#00a69c', // Nova cor de fundo
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    color: '#333', // Cor mais escura para o texto dentro do input
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  button: {
    backgroundColor: '#00897B', // Cor um pouco mais forte que o fundo
    padding: 15,
    borderRadius: 5,
    width: '80%',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cadastrarContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '80%',
    marginTop: 10,
  },
  cadastrarText: {
    color: '#666', // Cor mais discreta para o texto "Cadastrar"
  },
});

export default styles;
