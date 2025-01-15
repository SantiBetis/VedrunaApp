import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from '../FirebaseConfig';

export function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nick, setNick] = useState('');
  const [name, setName] = useState('');
  const [lastName1, setLastName1] = useState('');
  const [lastName2, setLastName2] = useState('');
  const auth = getAuth(app);

  const handleCreateAccount = () => {
    if (!email || !password || !confirmPassword || !nick || !name || !lastName1 || !lastName2) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Cuenta creada');
        navigation.navigate('LoginScreen');
      })
      .catch((error) => {
        console.log('Error al crear cuenta:', error);
        Alert.alert('Error', 'No se pudo crear la cuenta. Verifica los datos.');
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/img/formulario.png')}
          style={styles.image}
        />
      </View>

      <Text style={styles.title}>Completar los siguientes campos:</Text>

      {/* Campo de correo */}
      <TextInput
        style={styles.input}
        placeholder="Introduzca su correo"
        placeholderTextColor="#868686"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Campo de contraseña */}
      <TextInput
        style={styles.input}
        placeholder="Introduzca contraseña"
        placeholderTextColor="#868686"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Campo de repetir contraseña */}
      <TextInput
        style={styles.input}
        placeholder="Repita contraseña"
        placeholderTextColor="#868686"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {/* Campo de nick */}
      <TextInput
        style={styles.input}
        placeholder="Introduzca su nick"
        placeholderTextColor="#868686"
        value={nick}
        onChangeText={setNick}
      />

      {/* Campo de nombre */}
      <TextInput
        style={styles.input}
        placeholder="Introduzca su nombre"
        placeholderTextColor="#868686"
        value={name}
        onChangeText={setName}
      />

      {/* Campo de primer apellido */}
      <TextInput
        style={styles.input}
        placeholder="Introduzca su primer apellido"
        placeholderTextColor="#868686"
        value={lastName1}
        onChangeText={setLastName1}
      />

      {/* Campo de segundo apellido */}
      <TextInput
        style={styles.input}
        placeholder="Introduzca su segundo apellido"
        placeholderTextColor="#868686"
        value={lastName2}
        onChangeText={setLastName2}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleCreateAccount}>
        <Text style={styles.submitButtonText}>FINALIZAR</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#23272A',
    alignItems: 'center',
    paddingVertical: 5,
  },
  imageContainer: {
    marginBottom: 10,
  },
  image: {
    height: 300,
    resizeMode: 'contain',
  },
  title: {
    color: '#9FC63B',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    color: '#868686',
    padding: 5,
    marginVertical: 10,
  },
  submitButton: {
    width: '50%',
    backgroundColor: '#23272A',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#9FC63B',
  },
  submitButtonText: {
    color: '#DFDFDF',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
