import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "./components/auth/Landing";
import Register from "./components/auth/Register";

import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8GHJ9iV7fSQhu7C9DEESbvfMjFo64ltI",
  authDomain: "instagram-4082c.firebaseapp.com",
  projectId: "instagram-4082c",
  storageBucket: "instagram-4082c.appspot.com",
  messagingSenderId: "444695891250",
  appId: "1:444695891250:web:0ba128f5f0d32bc75c9b2b",
  measurementId: "G-6DTBN5ZTFQ",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  const [auth, setAuth] = useState({
    loaded: false,
    loggedIn: false,
  });
  console.log(auth.loaded);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setAuth({ ...auth, loaded: true, loggedIn: false });
        console.log("no user");
      } else {
        setAuth({ ...auth, loaded: true, loggedIn: true });
      }
    });
  }, []);
  const Stack = createStackNavigator();
  if (!auth.loaded) {
    return (
      <View>
        <Text>Loding...</Text>
      </View>
    );
  }
  if (!auth.loggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen
            name="Landing"
            component={Landing}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return <Text>User is logged in</Text>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
