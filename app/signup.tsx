import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignupScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const res = await fetch("https://dummyjson.com/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        Alert.alert("Success", `User ${data.username} registered`);
        router.push("/login");
      } else {
        Alert.alert("Error", data.message || "Signup failed");
      }
    } catch (err) {
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <ImageBackground source={require("../assets/weather-bg.jpeg")} style={styles.background}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Text style={styles.title}>🌤️ Create Account</Text>
        <TextInput placeholder="Username" placeholderTextColor="#eee" style={styles.input} onChangeText={setUsername} />
        <TextInput placeholder="Password" placeholderTextColor="#eee" secureTextEntry style={styles.input} onChangeText={setPassword} />
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
        <Text onPress={() => router.push("/login")} style={styles.link}>
          Already have an account? Login
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginVertical: 10,
    color: "#fff",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  button: {
    backgroundColor: "#4da6ff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  link: {
    color: "#fff",
    marginTop: 15,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
