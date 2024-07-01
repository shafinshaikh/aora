import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { account, databases } from '../../lib/appwrite'; // Adjust path as per your project structure

const GarageOwnerProfileScreen = () => {
    const [garageId, setGarageId] = useState('');
    const [garageName, setGarageName] = useState('');
    const [garageAddress, setGarageAddress] = useState('');
    const [garageDescription, setGarageDescription] = useState('');
    const [garagePhone, setGaragePhone] = useState('');

    useEffect(() => {
        fetchGarageId();
    }, []);

    const fetchGarageId = async () => {
        try {
            // Fetch user data to get the garageId associated with the logged-in user
            const userData = await databases.getDocument();
            console.log("user object: ", userData )
            const userGarageId = userData.data.garageId; // Adjust based on your actual data structure

            setGarageId(userGarageId);
        } catch (error) {
            console.error('Error fetching garageId:', error);
        }
    };

    const handleSaveProfile = async () => {
        try {
            // Example of updating profile details in the "garages" collection
            const response = await databases.updateDocument('667e9ca5003b01ab7b60', '667eb5ba003a0ae2ed1a', garageId, {
                name: garageName,
                address: garageAddress,
                description: garageDescription,
                phone: garagePhone,
            });
            console.log('Profile updated successfully:', response);
            // Optionally, navigate to another screen after saving
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Garage Owner Profile</Text>
            <TextInput
                style={styles.input}
                placeholder="Garage Name"
                value={garageName}
                onChangeText={setGarageName}
            />
            <TextInput
                style={styles.input}
                placeholder="Garage Address"
                value={garageAddress}
                onChangeText={setGarageAddress}
            />
            <TextInput
                style={styles.input}
                placeholder="Garage Description"
                multiline
                numberOfLines={4}
                value={garageDescription}
                onChangeText={setGarageDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Garage Phone"
                value={garagePhone}
                onChangeText={setGaragePhone}
                keyboardType="phone-pad"
            />
            <Button title="Save Profile" onPress={handleSaveProfile} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        padding: 8,
    },
});

export default GarageOwnerProfileScreen;
