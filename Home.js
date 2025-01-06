import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Button, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {
    const [books, setBooks] = useState([]);

    // Sample books to load if no books are in AsyncStorage
    const sampleBooks = [
        {
            title: 'To Kill a Mockingbird',
            isbn: '9780061120084',
            copies: 2,
            image: require('./assets/images/book1.jpg'), // Local image path
        },
        {
            title: '1984',
            isbn: '9780451524935',
            copies: 1,
            image: require('./assets/images/book2.jpg'), // Local image path
        },
        {
            title: 'The Great Gatsby',
            isbn: '9780743273565',
            copies: 3,
            image: require('./assets/images/book3.jpg'), // Local image path
        },
    ];

    // Load books from AsyncStorage or set sample books if empty
    const loadBooks = async () => {
        try {
            const savedBooks = await AsyncStorage.getItem('books');
            if (savedBooks) {
                setBooks(JSON.parse(savedBooks));
            } else {
                // If no books are stored, set sample books and save them in AsyncStorage
                await AsyncStorage.setItem('books', JSON.stringify(sampleBooks));
                setBooks(sampleBooks);
            }
        } catch (error) {
            console.error('Failed to load books', error);
        }
    };

    // Remove a book
    const removeBook = async (index) => {
        const updatedBooks = books.filter((_, i) => i !== index);
        setBooks(updatedBooks);
        await AsyncStorage.setItem('books', JSON.stringify(updatedBooks));
    };

    useEffect(() => {
        loadBooks();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={books}
                renderItem={({ item, index }) => (
                    <View style={styles.bookItem}>
                        <Image source={item.image} style={styles.bookImage} />
                        <View style={styles.bookDetails}>
                            <Text style={styles.bookTitle}>{item.title}</Text>
                            <Text>ISBN: {item.isbn}</Text>
                            <Text>Copies: {item.copies}</Text>
                            <Button
                                title="Edit"
                                onPress={() => navigation.navigate('EditBook', { index, book: item })}
                            />
                            <Button
                                title="Remove"
                                onPress={() => removeBook(index)}
                            />
                        </View>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <Button title="Add Book" onPress={() => navigation.navigate('AddBook')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    bookItem: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
    },
    bookImage: {
        width: 50,
        height: 75,
        marginRight: 20,
    },
    bookDetails: {
        flex: 1,
    },
    bookTitle: {
        fontWeight: 'bold',
    },
});

export default Home;
