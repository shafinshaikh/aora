import React, { useState } from 'react';
import { Link, router } from "expo-router";
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { account } from '../../lib/appwrite';

const SignIn = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        try {
            // Check if there is an existing session and delete it
            const sessions = await account.listSessions();
            if (sessions.total > 0) {
                for (const session of sessions.sessions) {
                    await account.deleteSession(session.$id);
                }
            }
            // Create a new session
            await account.createEmailSession(email, password);
            Alert.alert("Success", "User signed in successfully");
            router.replace("/home");
            // navigation.navigate('/Home');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Sign In" onPress={handleSignIn} />
      <View style={styles.spacing} />
      <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
  spacing: {
    height: 16, // Adjust the height to increase/decrease the spacing
  },
});

export default SignIn;