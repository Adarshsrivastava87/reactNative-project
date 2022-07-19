import { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Text, FlatList, ImageBackground } from "react-native";
const image = { uri: "https://img.freepik.com/free-vector/colorful-palm-silhouettes-background_23-2148541792.jpg?w=2000" }
export default function ChatScreen() {
    const [message, setmessage] = useState("");
    let getchat = JSON.parse(localStorage.getItem("chatList"));
    let userschat = getchat ? getchat : [];
    function send() {
        let date = new Date()
        let arrDate = [date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()]
        let chatObj = {
            date: arrDate,
            chat: message,

        }
        userschat.push(chatObj);
        localStorage.setItem("chatList", JSON.stringify(userschat));
    }
    const Display = ({ item }) => {
        return (
            <View style={styles.chatdirection1}>

                <Text style={styles.datetext}>{item.date}</Text>
                <Text>:</Text>
                <Text style={styles.text}>{item.chat}</Text>

            </View>

        );
    }

    return (
        <View style={styles.chatContainer1}>

            <View style={styles.chatContainer2}>
                <ImageBackground source={image} resizeMode='cover' style={styles.ImageContainer}>
                    <FlatList
                        data={getchat}
                        renderItem={Display} />
                </ImageBackground>
            </View>


            <View style={styles.chatdirection}>
                <TextInput style={styles.chatTextinput}
                    placeholder='message'
                    value={message}
                    onChangeText={setmessage}

                />
                <TouchableOpacity onPress={send}>
                    <Text style={styles.button}>send</Text>
                </TouchableOpacity>

            </View>

        </View >);

}
const styles = StyleSheet.create({
    chatContainer1: {
        flex: 1,
        justifyContent: "space-between",

    },
    chatContainer2: {
        flex: .99,
        borderRadius: 16,
        backgroundColor: 'rgb(220, 166, 220)',
        borderWidth: 2,

    },
    ImageContainer: {
        flex: 0.999,
        borderRadius: 16,
        padding: 10
    },

    chatTextinput: {
        height: 50,
        width: "75%",
        borderWidth: 1,
        borderRadius: 16,
        backgroundColor: "rgb(155, 162, 158)"
    },
    chatdirection: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "baseline"
    },
    chatdirection1: {
        flexDirection: "row",
        alignItems: "baseline"
    },
    image: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%"

    },
    text: {
        fontSize: 16,
        fontWeight: "600",
        color: "white",
        fontStyle: "italic"
    },
    datetext: {
        fontSize: 16,
        color: "white",
    },
    button: {
        fontWeight: 'bold',
        paddingRight: 20
    }
})