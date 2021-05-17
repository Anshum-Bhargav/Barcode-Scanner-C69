import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component {
    constructor(){
        super();
        this.state={
            hasCameraPermissions: null,
            scanned: false,
            scannedData:'',
            buttonState:'normal',
        }
    }

    getCameraPermissions = async(id)=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);

        this.setState({
            hasCameraPermissions:status==="granted",
            buttonState:id,
            scanned:false,
        });
    }

    handleBarCodeScanned = async({type, data})=>{
        const {buttonState} = this.state
  
        if(buttonState==="scannedData"){
          this.setState({
            scanned: true,
            scannedBookId: data,
            buttonState: 'normal'
          });
        }
        
    }

    render() {
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;

        if(buttonState!=="normal" && hasCameraPermissions) {
            return(
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            );
        }

        else if(buttonState==="normal") {
            return(
                <View style={styles.container}>
                    <TouchableOpacity 
                      onPress={()=>{
                        this.getCameraPermissions("scannedData")
                    }}
                      style={styles.button}>
                        <Text style={styles.buttonText}>SCAN QR/BAR CODE</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container:{ 
        flex: 1,
        justifyContent: 'center', 
        alignItems:'center'
    },
    button:{
        backgroundColor:'#3280E9',
        padding:10,
        borderWidth:4,
        borderColor:'#293BA2',
        borderRadius:5,
    },
    buttonText:{
        fontSize:15,
        textDecorationLine:'underline',
        alignSelf:'center',
    }
});