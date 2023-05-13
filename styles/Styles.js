import { StyleSheet } from "react-native";
export default StyleSheet.create({
    formComponent:{
       margin: 5,
    },
    mainContainer:{
        backgroundColor: "#000000",
        alignContent:"center",
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    container:{
        backgroundColor: "#000000",
        flexDirection: 'row',
        margin: 5 ,
        
    },
    text:{
        textAlign:"center",
    },
    roll:{
        fontSize: 20,
        textAlign:"center",
        color:"black",
    },
    button:{
        backgroundColor: "lime",
        width: 200,
        borderColor: "lime",
        borderWidth: 5,
        borderRadius: 10,
    },
    top:{
        fontSize: 25,
        textAlign:"center",
        color:"green",
    },
    rules:{
        width: 350,
    },
    input:{
        width: 300,
    }
});
