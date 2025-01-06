import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddBook = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [isbn, setIsbn] = useState('');
    const [copies, setCopies] = useState('');
    const [image, setImage] = useState('');

    const addBook = async () => {
        if (!title || !isbn || !copies || !image) {
            alert('Please fill in all fields');
            return;
        }

        const newBook = {
            title,
            isbn,
            copies: parseInt(copies),
            image: require(`./assets/images/${image}.jpg`), // Using local images from assets folder
        };

        try {
            const savedBooks = await AsyncStorage.getItem('books');
            const books = savedBooks ? JSON.parse(savedBooks) : [];
            books.push(newBook);
            await AsyncStorage.setItem('books', JSON.stringify(books));
            navigation.navigate('Home');
        } catch (error) {
            console.error('Failed to save book', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Title:</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
            />
            <Text>ISBN:</Text>
            <TextInput
                style={styles.input}
                value={isbn}
                onChangeText={setIsbn}
            />
            <Text>Copies:</Text>
            <TextInput
                style={styles.input}
                value={copies}
                onChangeText={setCopies}
                keyboardType="numeric"
            />
            <Text>Image (book1, book2, book3):</Text>
            <TextInput
                style={styles.input}
                value={image}
                onChangeText={setImage}
            />
            <Button title="Add Book" onPress={addBook} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        borderWidth: 1,
        marginBottom: 10,
        padding: 8,
    },
});

export default AddBook;
