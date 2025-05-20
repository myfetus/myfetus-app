import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

  const handleCadastro = async () => {
    if (!nome || !email || !dataNascimento || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    try {
      setLoading(true);

      // Formata a data para o formato YYYY-MM-DD
      const [dia, mes, ano] = dataNascimento.split('/');
      const dataFormatada = `${ano}-${mes}-${dia}`;

      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nome,
          email: email,
          password: senha,
          birthdate: dataFormatada
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao criar conta');
      }

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      router.push('/login');
    } catch (error) {
      Alert.alert('Erro', error instanceof Error ? error.message : 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  const handleVoltarLogin = () => {
    router.push('/login');
  };

  return (
    <LinearGradient
      colors={["#cce5f6", "#f8cde9"]}
      style={styles.container}
    >
      <View style={styles.formBox}>
        <Image
          source={require("../assets/images/fetus-heart.png")}
          style={styles.heartImage}
          resizeMode="contain"
        />
        <TextInput
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
          style={[styles.input, { marginTop: 20 }]}
          placeholderTextColor="#f9a9a7"
          editable={!loading}
        />
        <TextInput
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#f9a9a7"
          editable={!loading}
        />
        <TextInput
          placeholder="Data de Nascimento (DD/MM/AAAA)"
          value={dataNascimento}
          onChangeText={(text) => setDataNascimento(formatarData(text))}
          style={styles.input}
          keyboardType="numeric"
          maxLength={10}
          placeholderTextColor="#f9a9a7"
          editable={!loading}
        />
        <TextInput
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#f9a9a7"
          editable={!loading}
        />
        <TextInput
          placeholder="Confirmar Senha"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#f9a9a7"
          editable={!loading}
        />

        <TouchableOpacity 
          style={[styles.loginButton, loading && styles.loginButtonDisabled]} 
          onPress={handleCadastro}
          disabled={loading}
        >
          <Text style={styles.loginText}>
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleVoltarLogin} disabled={loading}>
          <Text style={styles.createAccountText}>Voltar para Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footerContainer}>
        <Image
          source={require("../assets/images/poli-upe-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    
  },
  footerContainer: {
    width: "100%",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20
  },
  formBox: {
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 20,
    padding: 20,
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
    paddingVertical: 40
    
  },
  heartImage: {
    width: 120,
    height: 120,
    position: "absolute",
    top: -60,
    zIndex: 3,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: "100%",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#fff"
  },
  loginButton: {
    backgroundColor: "#f9a9a7",
    paddingVertical: 12,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    marginBottom: 10
  },
  loginButtonDisabled: {
    backgroundColor: "#f9a9a7aa",
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  },
  createAccountText: {
    color: "#20B2AA",
    fontWeight: "bold",
    fontSize: 14
  },
  logo: {
    width: 240,
    height: 80
  }
});