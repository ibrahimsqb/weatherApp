import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [city, setCity] = useState("Islamabad");
  const [weather, setWeather] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();
      setUsers(data.users);
    } catch {
      setError("Failed to fetch user data");
    }
  };

  const fetchWeather = async () => {
    if (!city) {
      Alert.alert("Please enter a city");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ecd03eb5541b20b7d8268ad04e3c9b74`);
      const data = await res.json();

      if (res.ok) {
        setWeather(data);
      } else {
        setError("City not found");
        setWeather(null);
      }
    } catch {
      setError("Failed to load weather");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchWeather();
  }, []);

  return (
    <ImageBackground source={require("../assets/weather-bg.jpeg")} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        <Stack.Screen options={{ headerShown: false }} />
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>🌤️ Weather Checker</Text>

          <TextInput style={styles.input} placeholder="Enter city" placeholderTextColor="#eee" value={city} onChangeText={setCity} />
          <TouchableOpacity style={styles.button} onPress={fetchWeather}>
            <Text style={styles.buttonText}>Get Weather</Text>
          </TouchableOpacity>

          {loading && <ActivityIndicator size="large" color="#fff" style={{ marginTop: 10 }} />}
          {error ? <Text style={styles.error}>{error}</Text> : null}

          {weather && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Weather in {weather.name}</Text>
              <Text style={styles.cardText}>🌡️ {weather.main.temp} °C</Text>
              <Text style={styles.cardText}>☁️ {weather.weather[0].main}</Text>
            </View>
          )}

          <View style={styles.table}>
            <Text style={styles.cardTitle}>👥 User List</Text>
            <View style={styles.tableHeader}>
              <Text style={styles.cell}>First</Text>
              <Text style={styles.cell}>Last</Text>
              <Text style={styles.cell}>Age</Text>
              <Text style={styles.cell}>Gender</Text>
            </View>
            {users.map((user) => (
              <View key={user.id} style={styles.tableRow}>
                <Text style={styles.cell}>{user.firstName}</Text>
                <Text style={styles.cell}>{user.lastName}</Text>
                <Text style={styles.cell}>{user.age}</Text>
                <Text style={styles.cell}>{user.gender}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
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
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 4,
  },
  table: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 10,
    borderRadius: 10,
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  cell: {
    flex: 1,
    fontSize: 14,
    color: "#fff",
  },
});
