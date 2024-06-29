import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { databases } from '../../lib/appwrite';

const SearchResults = () => {
    const route = useRoute();
    const { query } = route.params;
    const [results, setResults] = useState([]);

    useEffect(() => {
        const searchGarages = async () => {
            const response = await databases.listDocuments('667e9e7c00146f290854', '667eb5ba003a0ae2ed1a', [
                databases.query.search('name', query),
            ]);
            setResults(response.documents);
        };

        searchGarages();
    }, [query]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Search Results for "{query}"</Text>
            <FlatList
                data={results}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.itemText}>{item.name}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold' },
    item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
    itemText: { fontSize: 18 },
});

export default SearchResults;
