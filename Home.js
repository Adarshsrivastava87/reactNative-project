import { View, StyleSheet, Text, Image } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import UserApiPage from "./userApi";
export default function Home({ navigation }) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    function chat() {
        return navigation.navigate("ChatPage");
    }
    function Document() {
        return navigation.navigate("DocumentPage");
    }
    function logout() {

        localStorage.removeItem("currentUser");
        return navigation.navigate("LoginPage");
    }

    return (
        <View style={styles.HomeContainer}>
            <View style={styles.HomeContainerFirst}>
                <Text style={styles.HomeTextsize}>Welcome !</Text>
                <View style={styles.image}>
                    <View style={styles.rowDirection}>
                        <TouchableOpacity onPress={() => { navigation.navigate("CurrentUserPage") }}>
                            <Image style={styles.Homeimage}
                                source={currentUser.userImage} />
                        </TouchableOpacity>
                        {/* <Text style={styles.HomeTextsize}>{currentUser.userName}</Text> */}
                    </View>
                </View>
                <TouchableOpacity onPress={() => { navigation.navigate("UserPage") }}>
                    <Text style={styles.DrawerText}>
                        * Manage Users
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={chat}>
                    <Text style={styles.DrawerText}>
                        *  Group chat
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={Document}>
                    <Text style={styles.DrawerText}>
                        * Manage Documents
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={logout}>
                    <Text style={styles.DrawerText}>
                        *  Logout
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.HomeContainerSecond}>
                <TextInput placeholder="Search Here" style={styles.textInput}></TextInput>
                <UserApiPage />

            </View>
        </View>);
}
const styles = StyleSheet.create({
    HomeContainer: {
        flexDirection: "row", flex: 1
    },
    HomeContainerFirst: {
        height: "100%",
        width: "30%",
        backgroundColor: "rgb(209, 207, 209)",
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        marginTop: 10,
        marginLeft: 10,
        padding: 10,
        justifyContent: 'space-evenly',

    },
    HomeContainerSecond: {
        // justifyContent:"center",
        alignItems: 'flex-start',
        // padding: 20,
        borderWidth: 2,
        backgroundColor: "rgb(245, 171, 229)",
        // marginRight: 10,
        marginTop: 10,
        height: "100%",
        width: "70%"
    },
    Homeimage: {
        height: 60,
        width: 60,
        marginBottom: 5,
        borderRadius: "100%"
    }
    , DrawerText: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    HomeTextsize: {
        fontWeight: "bold",
        fontSize: 14,
        textAlign: 'center',
    },
    rowDirection: {
        flexDirection: "row",
        margin: 2

    },
    textInput: {
        textAlign: "justify",
        width: "100%",
        height: 28,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: "white"
    }
})