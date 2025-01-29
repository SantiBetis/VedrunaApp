import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const CLOUD_NAME = "dlbxc5fjz";
const UPLOAD_PRESET = "ml_default";
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
const SERVER_URL = 'http://localhost:8080/publicaciones';

export function AddScreen() {
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');

    useEffect(() => {
        requestPermissions();
    }, []);

    const requestPermissions = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permiso denegado', 'Se necesita acceso a la cámara.');
        }
    };

    const takePhoto = async () => {
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets?.[0]?.uri);
        }
    };

    const uploadImage = async () => {
        if (!image) {
            Alert.alert('Error', 'Selecciona o toma una imagen.');
            return;
        }

        const formData = new FormData();
        formData.append('file', { uri: image, type: 'image/jpeg', name: 'photo.jpg' });
        formData.append('upload_preset', UPLOAD_PRESET);

        try {
            const response = await fetch(CLOUDINARY_URL, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error(await response.text());
            
            const data = await response.json();
            await savePost(data.secure_url);
            navigation.navigate('HomeScreen');
        } catch (error) {
            Alert.alert('Error', 'No se pudo subir la imagen.');
        }
    };

    const savePost = async (imageUrl) => {
        const userName = auth.currentUser?.displayName || 'Usuario Anónimo';

        try {
            const response = await fetch(SERVER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: auth.currentUser?.uid,
                    image_url: imageUrl,
                    titulo,
                    descripcion,
                    likes: [],
                    user: userName,
                }),
            });

            if (!response.ok) throw new Error(await response.text());
        } catch (error) {
            Alert.alert('Error', 'No se pudo guardar la publicación.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>PUBLICACIÓN</Text>
            <TouchableOpacity style={styles.imageContainer} onPress={takePhoto}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                ) : (
                    <Image source={require('../../../assets/img/Contacts.png')} style={styles.image} />
                )}
            </TouchableOpacity>
            <Text style={styles.label}>Título:</Text>
            <TextInput style={styles.input} maxLength={40} value={titulo} onChangeText={setTitulo} />
            <Text style={styles.label}>Descripción:</Text>
            <TextInput style={[styles.input, styles.textArea]} maxLength={250} multiline value={descripcion} onChangeText={setDescripcion} />
            <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
                <Text style={styles.uploadButtonText}>PUBLICAR</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23272A',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9FC63B',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9FC63B',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    backgroundColor: '#2C2F33',
    color: '#DFDFDF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 14,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  uploadButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#9EF01A',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  uploadButtonText: {
  color: '#DFDFDF',
  fontWeight: 'bold',
  fontSize: 18,
  },  
});

export default AddScreen;
