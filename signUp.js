import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { Text, View, TextInput, ImageBackground, Button, Image } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "../style/style";
import { db } from "./config";
import { set, ref } from "firebase/database";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const Backimage = { uri: "https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000" }

export default function Sign({ navigation }) {
    const [email, setEmail] = useState("");
    const [pass, setpass] = useState("");
    const [name, setname] = useState("");
    const [phone, setphone] = useState("");
    const [image, setImage] = useState(null);
    function loginValidation() {
        if (name == '') {
            alert("Name can't be blank");
            return false;
        }
        if (email == '') {
            alert("email can't be blank");
            return false;
        }
        if (pass == '') {
            alert("password can't be blank");
            return false;
        }
        return userRegister()
    }
    function userRegister() {
        return (
            set(ref(db, 'users/' + pass), {
                userName: name,
                userEmail: email,
                userPassword: pass,
                userPhone: phone,
                userImage: image
            }).then(() => {
                alert("Congratulation Registration successfule");
                navigation.navigate("LoginPage")


            }).catch((error) => {
                alert(error);
            }))
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [2, 1],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (<View style={styles.mainContainer}>
        <ImageBackground source={Backimage} resizeMode='cover' style={styles.image}>
            <FontAwesome5 name="twitter" size={100} color="black" />
            <Text style={styles.text}><h1>SignUp Here</h1></Text>
            <Text><h2>please file the form to create account</h2></Text>
            <Text style={styles.text} >Name:
                <TextInput
                    style={styles.border}
                    onChangeText={(name) => { setname(name) }}
                    value={name}
                    placeholder="Name"
                    autoComplete="off" />
            </Text>
            <Text style={styles.text} >Email:
                <TextInput
                    style={styles.border}
                    onChangeText={(email) => { setEmail(email) }}
                    value={email}
                    placeholder="Email"
                    autoComplete="off" />
            </Text>
            <Text style={styles.text} >phone:
                <TextInput
                    style={styles.border}
                    onChangeText={(phone) => { setphone(phone) }}
                    value={phone}
                    placeholder="phone"
                    keyboardType='numbers-and-punctuation'
                    autoComplete="off"
                />
            </Text>
            <Text style={styles.text} >pass:
                <TextInput
                    style={styles.border}
                    onChangeText={(pass) => { setpass(pass) }}
                    value={pass}
                    placeholder="password"
                    autoComplete="off"
                    secureTextEntry={true} />
            </Text>
            <View style={{ flexDirection: "row", margin: 10 }}>
                <Button title="upload" onPress={pickImage} />
                <Button title="SignUp"
                    onPress={loginValidation}> </Button>
            </View>
            <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center', flexDirection: "row" }}>
                {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
            </View>


        </ImageBackground>
    </View>);
}











