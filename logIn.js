import { useState } from "react";
import { Text, View, TextInput, ImageBackground, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { db } from './config'
import { onValue, ref } from "firebase/database";
import styles from "../style/style";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const image = { uri: "https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000" }
export default function Login({ navigation }) {
   const [email, onChangeEmail] = useState("");
   const [pass, onChangepass] = useState("");
   function loginValidation() {
      if (email == '') {
         alert("email con't be blank");
         return false;
      }
      if (pass == '') {
         alert("password can not be blank");
         return false;
      }
      else (

         cheak()
      )

   }
   function cheak() {
      const Ref = ref(db, "users");
      onValue(Ref, (snap) => {
         const userData = snap.val()[pass];
         localStorage.setItem("currentUser", JSON.stringify(userData));
      })

   }
   function loginValidation() {
      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser.userEmail == email && currentUser.userPassword == pass) {
         //================//
         onChangeEmail("");
         onChangepass("");
         //===============//
         return navigation.navigate("HomePage");
         // console.log('ok')

      }
      else {
         alert("Email or Password Wrong");
         return false
      }

   }
   return (<View style={styles.mainContainer}>
      <ImageBackground source={image} resizeMode='cover' style={styles.image}>
         <FontAwesome5 name="twitter" size={100} color="black" />
         <Text style={styles.text}><h1>Login Here</h1></Text>
         <Text style={styles.text} >Email:
            <TextInput
               style={styles.border}
               onChangeText={onChangeEmail}
               value={email}
               placeholder="Email" />

         </Text>
         <Text style={styles.text} >pass:
            <TextInput
               style={styles.border}
               onChangeText={onChangepass}
               value={pass}
               placeholder="password"
               secureTextEntry={true} />
         </Text>

         <TouchableOpacity onPress={cheak}>
            <Text style={styles.sizeText} >Remeber Me *</Text>
         </TouchableOpacity>
         <Button title="Login" onPress={loginValidation}></Button>
         <TouchableOpacity onPress={() => { navigation.navigate("signUpPage"); }}>
            <Text style={styles.size} >Don't have account?Sign Up Here</Text>
         </TouchableOpacity>
      </ImageBackground>
   </View>);
}