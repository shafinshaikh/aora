import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { account } from '../../lib/appwrite';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            await account.deleteSession('current');
            navigation.navigate('SignIn');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});

export default Profile;
