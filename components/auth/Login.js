import React, { useEffect, useState } from "react";
import { View, Button, TextInput } from "react-native";
import firebase from "firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSignIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((e) => console.log(e));
  };

  return (
    <View>
      <TextInput placeholder="name" onChangeText={(name) => setName(name)} />
      <TextInput
        placeholder="email"
        onChangeText={(email) => setEmail(email)}
      ></TextInput>
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      ></TextInput>
      <Button onPress={onSignIn} title="SignUp" />
    </View>
  );
}

export default Login;
