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

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    console.log("Fazer login com:", email, senha);
    router.push("/welcome");
  };

  const handleCreateAccount = () => {
    router.push("/cadastro");
  };

  return (
    <LinearGradient
      colors={["#cce5f6", "#f8cde9"]}
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <Image
          source={require("../assets/images/myfetus-logo.png")}
          style={styles.logoMain}
          resizeMode="contain"
        />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.formBox}>
          <Image
            source={require("../assets/images/fetus-heart.png")}
            style={styles.heartImage}
            resizeMode="contain"
          />
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
    justifyContent: "space-between",
    paddingHorizontal: 30
  },
  headerContainer: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },
  footerContainer: {
    width: "100%",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    // marginBottom: 20
  },
  logoMain: {
    width: 250,
    height: 160,
    alignSelf: "center"
  },
  heartImage: {
    width: 120,
    height: 120,
    position: "absolute",
    top: -60,
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
    borderWidth: 1,
    borderColor: "#fff",
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
    height: 80
  }
});