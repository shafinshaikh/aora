import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { databases } from '../../lib/appwrite';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const [garages, setGarages] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchGarages = async () => {
            const response = await databases.listDocuments('667e9e7c00146f290854', '667eb5ba003a0ae2ed1a');
            setGarages(response.documents);
        };

        fetchGarages();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Garages</Text>
            <FlatList
                data={garages}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('GarageDetails', { garage: item })}>
                        <View style={styles.item}>
                            <Text style={styles.itemText}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
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

export default Home;
