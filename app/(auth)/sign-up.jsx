import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { account, databases } from '../../lib/appwrite'; // Make sure to import databases if you need to create documents
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const SignUp = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('customer'); // Default role

    const handleSignUp = async () => {
        try {
            // Create the user
            const user = await account.create(uuidv4(), email, password, name);

            // Save user role in the database (if needed)
            await databases.createDocument(
                '667e9e7c00146f290854', // Replace with your Database ID
                '667e9eb000376c6d757e', // Replace with your Collection ID for user roles
                user.$id, // Use the user ID as the document ID
                { 
                    role,
                    username: name, // Ensure the username is included
                    email: email,
                    accountId: uuidv4(),
                }
            );

            Alert.alert("Sign up successful")
            navigation.navigate('SignIn');
        } catch (error) {
            console.error("Authentication error: ", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Sign Up</Text>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <Text>Role</Text>
            <Picker
                selectedValue={role}
                style={styles.input}
                onValueChange={(itemValue) => setRole(itemValue)}
            >
                <Picker.Item label="Customer" value="customer" />
                <Picker.Item label="Garage Owner" value="garageOwner" />
            </Picker>
            <Button title="Sign Up" onPress={handleSignUp} />
            <View style={styles.spacing} />
            <Button title="Sign In" onPress={() => navigation.navigate('SignIn')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginVertical: 8,
    },
    spacing: {
        height: 16, // Adjust the height to increase/decrease the spacing
    },
});

export default SignUp;
