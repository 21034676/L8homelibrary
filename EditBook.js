import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditBook = ({ route, navigation }) => {
    const { index, book } = route.params;
    const [title, setTitle] = useState(book.title);
    const [isbn, setIsbn] = useState(book.isbn);
    const [copies, setCopies] = useState(book.copies.toString());
    const [image, setImage] = useState(book.image);

    const updateBook = async () => {
        if (!title || !isbn || !copies || !image) {
            alert('Please fill in all fields');
            return;
        }

        const updatedBook = {
            title,
            isbn,
            copies: parseInt(copies),
            image,
        };

        try {
            const savedBooks = await AsyncStorage.getItem('books');
            const books = JSON.parse(savedBooks);
            books[index] = updatedBook;
            await AsyncStorage.setItem('books', JSON.stringify(books));
            navigation.navigate('Home');
        } catch (error) {
            console.error('Failed to update book', error);
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
            <Button title="Update Book" onPress={updateBook} />
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

export default EditBook;
