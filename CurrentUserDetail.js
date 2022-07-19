import { Image, StyleSheet, Text, View } from "react-native";
import { update, ref } from "firebase/database";
import { db } from "./config";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
export default function WelcomeUser() {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  function Editemail() {
    let newEmai = prompt("Edit Email", newEmai);
    //  update(ref(db,"users/"+currentUser.userPassword),
    update(ref(db, "users/" + currentUser.userPassword),
      {
        userEmail: newEmai
      }).then(() => {
        alert("updated");
      }).catch((error) => {
        alert(error);
      });
  }
  return (
    <View style={styles.mainContainer}>
      <View style={styles.Icons}>
        <FontAwesome5 name="pen" size={15} color="black" onPress={Editemail} />
        {/* <FontAwesome5 name="pen"  size={15} color="black"/> */}
      </View>
      <Text style={styles.text}>Welcome !!</Text>
      <Image source={currentUser.userImage} style={styles.image} resizeMode='center'></Image>
      <Text style={styles.textfirst}>Name: {currentUser.userName}</Text>
      <Text style={styles.textfirst}>Email: {currentUser.userEmail} </Text>
      <Text style={styles.textfirst}>Phone: {currentUser.userPhone}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // height:"100%",
    // width:"100%",
    alignItems: "center",
    backgroundColor: "rgb(206, 245, 223)",

  },
  image: {
    height: "25%",
    width: "25%",
    borderWidth: 1,
    borderRadius: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    margin: 15,
    paddingBottom: 20
  },
  textfirst: {
    fontWeight: "bold",
    fontSize: 20,

    paddingBottom: 20
  },
  Icons: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginLeft: 40,
    padding: 15,

  }
})