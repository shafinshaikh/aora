import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SearchInput = () => {
    const [query, setQuery] = useState('');
    const navigation = useNavigation();

    const handleSearch = () => {
        if (query.trim()) {
            navigation.navigate('SearchResults', { query });
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search..."
                value={query}
                onChangeText={setQuery}
                style={styles.input}
            />
            <Button title="Search" onPress={handleSearch} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flexDirection: 'row', alignItems: 'center' },
    input: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 8, marginRight: 8 },
});

export default SearchInput;
