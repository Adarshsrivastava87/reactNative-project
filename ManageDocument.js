import { StyleSheet, View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
export default function Document() {
    const [image, setImage] = useState(null);
    let [lable, setlabele] = useState('doc')
    //===================================//
    let getDocument = JSON.parse(localStorage.getItem("Document"));
    let users = getDocument ? getDocument : [];
    //======================================//
    let shareDocument = JSON.parse(localStorage.getItem("ShareDocument"));
    let sharedata = shareDocument ? shareDocument : [];
    function Sellect() {
        lable = prompt('Add File name', lable);
        setlabele(lable);
        // if(lable){
        //   return  pickDocument() 
        // }
        return pickDocument()
    }
    const pickDocument = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }

    };
    //=====================================================//
    function uploadDocument() {
        let date = new Date()
        let DocObj = {
            id: date.getSeconds(),
            fileName: lable,
            document: image
        };
        users.push(DocObj);
        localStorage.setItem("Document", JSON.stringify(users));
        alert('Uploading.......')
    }
    //=====================================================//
    function Edit(id) {

        alert(id)
    }
    //=====================================================//
    function Delete(id) {
        let arry = getDocument.filter((value) => {
            if (value.id !== id) {
                return value
            }
        })
        localStorage.setItem("Document", JSON.stringify(arry))
    }
    //=====================================================//
    function share(id) {
        let arry = getDocument.filter((value) => {
            if (value.id == id) {
                return value
            }
        })
        sharedata.push(arry);
        localStorage.setItem("ShareDocument", JSON.stringify(sharedata));

    }
    //=====================================================//
    const DispalyData = (element) => {
        return (
            <View style={styles.FlatListContainer}>
                <Text >{element.item.fileName}</Text>
                <Text>:</Text>
                <TouchableOpacity onPress={() => Edit(element.item.id)}>
                    <Text>Edit</Text>
                </TouchableOpacity>
                <Text>|</Text>
                <TouchableOpacity onPress={() => share(element.item.id)}>
                    <Text>Share</Text>
                </TouchableOpacity>
                <Text>|</Text>
                <TouchableOpacity onPress={() => Delete(element.item.id)}>
                    <Text>Delete</Text>
                </TouchableOpacity>

            </View>

        );
    }
    //=====================================================//
    //   (element)=>{console.log(element.index)}
    const DisplayShareData = (element) => {
        return (
            <View style={styles.FlatListContainer}>
                <Text >File Name :</Text>
                <Text >{element.item[0].fileName}</Text>
                <Text>:</Text>
                <TouchableOpacity onPress={() => Remove(element.item.id)}>
                    <Text>Remove</Text>
                </TouchableOpacity>
            </View>

        );
    }
    //=====================================================//
    function Remove(id) {
        let arry = shareDocument.filter((value) => {
            if (value.id !== id) {
                return value
            }
        })
        localStorage.setItem("ShareDocument", JSON.stringify(arry))
    }
    return (
        <View style={styles.mainContainer}>
            <View style={styles.DocumentContainer}>
                <Text style={styles.text}>Document List</Text>
                <FlatList
                    data={getDocument}
                    renderItem={DispalyData}
                    keyExtractor={(item) => item.id}
                ></FlatList>

            </View>
            <Text style={styles.text}>Share File</Text>
            <View style={styles.shareContainer}>
                <FlatList
                    data={shareDocument}
                    renderItem={DisplayShareData}
                    keyExtractor={(item) => item.id}
                ></FlatList>
            </View>
            <Button title="sellect"
                onPress={Sellect}></Button>
            <Button title="Upload"
                style={styles.button}
                onPress={uploadDocument} />
        </View>);
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    DocumentContainer: {
        height: "54%",
        width: "100%",
        backgroundColor: "rgb(248, 220, 220)"

    },
    shareContainer: {
        height: "30%",
        width: "100%",
        backgroundColor: "paleturquoise"
    },
    FlatListContainer:
    {
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: 5,
        backgroundColor: "rgb(175, 173, 173)",
        borderRadius: 4,
        marginBottom: 4
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 15
    },
    button: {
        color: 'aqua',
        borderWidth: 1
    }
})