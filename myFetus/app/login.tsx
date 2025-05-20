import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";

export default function LoginScreen(): JSX.Element {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    console.log("Fazer login com:", email, senha);
    // router.push("/home"); // Exemplo de redirecionamento
  };

  const handleCreateAccount = () => {
    console.log("Ir para criar conta");
    // router.push("/signup");
  };

  return (
    <LinearGradient
      colors={["#cce5f6", "#f8cde9"]}
      style={styles.container}
    >
      <Image
        source={require("../assets/images/myfetus-logo.png")} // coloque o nome correto do seu arquivo aqui
        style={styles.logoMain}
        resizeMode="contain"
      />

      <Image
        source={require("../assets/images/fetus-heart.png")} // coloque esta imagem na pasta assets
        style={styles.heartImage}
        resizeMode="contain"
      />

      <View style={styles.formBox}>
        <TextInput
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          style={[styles.input, { marginTop:60}]}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#f9a9a7"
        />
        <TextInput
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#f9a9a7"
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCreateAccount}>
          <Text style={styles.createAccountText}>Crie uma conta</Text>
        </TouchableOpacity>
      </View>

      <Image
        source={require("../assets/images/poli-upe-logo.png")} // coloque esta imagem na pasta assets
        style={styles.logo}
        resizeMode="contain"
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30
  },
  logoMain: {
    position: 'absolute',
    top: 80,
    width: 250, // ajuste conforme o tamanho da logo
    height: 160,
    alignSelf: "center", // Centraliza horizontalmente
    zIndex: 2,           // Garante que fique acima dos outros
  },
  heartImage: {
    width: 120,
    height: 120,
    position: "absolute",
    top: 250, // ajuste conforme necessário
    zIndex: 3,
  },
  formBox: {
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 20,
    padding: 20,
    width: "100%",
    alignItems: "center",
    marginTop: 80,
    marginBottom: 30,
    borderWidth: 1,              // Espessura da borda
    borderColor: "#fff",         // Cor branca
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
    height: 80,
    position: "absolute",
    bottom: 20
  }
});