import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity} from 'react-native';
import MapView, { Marker } from 'react-native-maps'; 
import axios from "axios";

export default class ISLocation extends React.Component {
    constructor(){
        super();
        this.state = {
            location: {}
        }
    }
    
    componentDidMount(){
        this.getISSLocation();
    }

    getISSLocation =()=>{
        axios
        .get("https://api.wheretheiss.at/v1/satellites/25544")
        .then((response)=>{
            this.setState({
                location: response.data
            })
        })
        .catch((error)=>{
            alert("The error is" + error.message);
        })


    }

    render(){
        if (Object.keys(this.state.location).length === 0){
            return(
                <View style = {styles.container}>
                    <Text style = {styles.loadingText}>
                        Loading...
                    </Text>
                </View>

            )
        }

        else {
            return(
                <View style = {styles.container}>
                    <ImageBackground 
                    source = {require('../assets/iss_bg.jpg')}
                    style = {styles.bgContainer}
                    
                    >
                    <View style = {styles.titleFlex}>
    
                        <Text style = {styles.titleStyle}>
                            ISS Location
                            
                        </Text>
    
                    </View>
    
                    <View style = {styles.mapContainer}>
    
                    <MapView
                        style = {styles.maps}
                        region={{
                        latitude: this.state.location.latitude,
                        longitude: this.state.location.longitude,
                        latitudeDelta: 100,
                        longitudeDelta: 100,
                        }
                    }
                    >
    
                        <Marker
                        coordinate = {{
                            latitude: this.state.location.latitude,
                            longitude: this.state.location.longitude,
    
                        }}
                        >
                            <Image
                            style = {styles.locationIcon} 
                            source = {require("../assets/iss_icon.png")}
                            />
                        </Marker>
    
    
    
    
    
    
    
                    
                    </MapView>
    
    
    
                    </View>

                    <View style = {styles.viewData}>
                        <Text style = {styles.viewText}>

                            Latitude: {this.state.location.latitude}
                            
                        </Text>

                        <Text style = {styles.viewText}>
                        Longitude: {this.state.location.longitude}
                        </Text>

                        <Text style = {styles.viewText}>
                        Velocity: {this.state.location.velocity}
                        </Text>

                        <Text style = {styles.viewText}>
                        Altitude: {this.state.location.altitude}
                        </Text>
                    </View>
    
    
                    </ImageBackground>
    
                </View>
    
                
    
            );

        }
       

    }


} 

const styles = StyleSheet.create({
    container : {
        flex : 1,

    },

    bgContainer : {
        flex: 1,
        resizeMode : "cover"
    },

    titleFlex : {
        flex : 0.25,
        justifyContent: 'center',
        alignItems: 'center'
        
    },

    titleStyle : {
        fontSize: 45,
        fontWeight: 'bold',
        color: "white"

    },

    maps : {
        width: "100%",
        height: "100%"
    },

    mapContainer : {
        flex: 0.5,
    },

    locationIcon : {
        width : 45,
        height : 45
    },

    loadingText : {
        color : "white",
        fontSize : 35,
        fontWeight : "bold"

        
    },

    viewData : {
        flex: 0.25,
        backgroundColor: "white",
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        zIndex: 2

    },

    viewText : {
        fontSize : 20,
        color: "black",
        padding: 18,
        fontWeight: 'bold'


    }


    

})

