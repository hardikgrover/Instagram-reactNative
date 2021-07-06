import React, { useEffect, useState } from "react";
import { View, Button, TextInput } from "react-native";
import firebase from "firebase";

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
          firebase.firestore().collection('users')
          .doc(firebase.auth().currentUser.uid)
          .set({
              name,
              email
          })
        
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
      <Button onPress={onSignUp} title="SignUp" />
    </View>
  );
}

export default Register;
