import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import { app } from '../FirebaseConfig';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth(app);

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Sesión iniciada');
        navigation.navigate('HomeScreen');
      })
      .catch((error) => {
        console.log('Error al iniciar sesión:', error);
        Alert.alert('Error', 'No se pudo iniciar sesión. Verifica tus datos.');
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/img/logo-vedruna.png')} 
          style={styles.logo}
        />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>VEDRUNA</Text>
        <Text style={styles.title}>EDUCACIÓN</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Introduzca su correo o nick..."
        placeholderTextColor="#868686"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Introduzca su contraseña..."
        placeholderTextColor="#868686"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>¿Olvidaste la contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleSignIn}>
        <Text style={styles.loginButtonText}>Log in</Text>
      </TouchableOpacity>

      <View style={styles.divider} /> {/* Línea divisoria */}


      <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
        <Text style={styles.createAccount}>
          <Text>¿No tienes cuenta?</Text>
          <Text style={styles.createAccountLink}> Crear cuenta</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23272A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 200, 
    height: 200,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  title: {
    color: '#DFDFDF',
    fontSize: 30,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    backgroundColor: '#323639',
    color: '#DFDFDF',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  forgotPassword: {
    color: '#9FC63B',
    fontSize: 14,
    marginBottom: 20,
    marginLeft: 170,
  },
  loginButton: {
    width: '80%',
    backgroundColor: '#9FC63B',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 100,
  },
  loginButtonText: {
    color: '#23272A',
    fontWeight: 'bold',
    fontSize: 16,
  },
  createAccount: {
    color: '#DFDFDF',
    fontSize: 14,
  },
  createAccountLink: {
    color: '#9FC63B',
    fontWeight: 'bold',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#323639',
    marginVertical: 30,
  },
});