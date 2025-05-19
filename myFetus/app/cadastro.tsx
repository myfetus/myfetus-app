import { View, Text, TextInput, Button, StyleSheet, Alert, Image, StatusBar } from 'react-native';
import { useState } from 'react';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const formatarData = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    let formatted = '';

    if (cleaned.length <= 2) {
      formatted = cleaned;
    } else if (cleaned.length <= 4) {
      formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    } else if (cleaned.length <= 8) {
      formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4) + '/' + cleaned.slice(4);
    } else {
      formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4) + '/' + cleaned.slice(4, 8);
    }

    return formatted;
  };

  const handleCadastro = () => {
    if (!nome || !email || !dataNascimento || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    console.log('Cadastro enviado:', { nome, email, dataNascimento, senha });
    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
  };

  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.container}>
        <Text style={styles.tituloApp}>My Fetus</Text>

        <Image
          source={require('@/assets/images/ilustracao-de-feto-desenhado-a-mao_23-2149213666.avif')}
          style={styles.imagem}
          resizeMode="contain"
        />

        <Text style={styles.titulo}>Cadastro</Text>

        <TextInput
          placeholder="Nome"
          placeholderTextColor="#f9a9a8"
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#f9a9a8"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Data de Nascimento (DD/MM/AAAA)"
          placeholderTextColor="#f9a9a8"
          style={styles.input}
          value={dataNascimento}
          onChangeText={(text) => setDataNascimento(formatarData(text))}
          keyboardType="numeric"
          maxLength={10}
        />
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#f9a9a8"
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
        <TextInput
          placeholder="Confirmar Senha"
          placeholderTextColor="#f9a9a8"
          style={styles.input}
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry
        />

        <View style={styles.botaoContainer}>
          <Button title="Cadastrar" onPress={handleCadastro} color="#87CEEB" />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#ffd7e0',
  },
  tituloApp: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  imagem: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 12,
    borderRadius: 25, // mais arredondado
    borderColor: '#ccc',
    borderWidth: 1,
    color: '#333',
  },
  botaoContainer: {
    borderRadius: 25,
    overflow: 'hidden', // necessário para arredondar o botão
  },
});