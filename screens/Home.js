import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity} from 'react-native';



export default class Home extends React.Component {
    render(){
        return(
            <View style = {styles.container}>
                <ImageBackground 
                source = {require('../assets/bg_image.png')}
                style = {styles.bgContainer}
                >
                    <View style = {styles.titleFlex}>

                    <Text style = {styles.titleStyle}>
                        ISS Tracker App
                        
                    </Text>

                    </View>
                    

                    <TouchableOpacity onPress = {()=>{
                        this.props.navigation.navigate("ISLocation")
                    }}
                    
                    style = {styles.card}
                    
                    >
                        <Text style = {styles.cardText}>

                            ISLocation
                            
                        </Text>

                        <Text style = {styles.knowMore}>

                            Know More
                            
                        </Text>

                        <Image 
                        source = {require('../assets/iss_icon.png')}
                        style = {styles.imageStyle}
                        />

                        
                    </TouchableOpacity>

                    <TouchableOpacity onPress = {()=>{
                        this.props.navigation.navigate("Meteor")
                    }}
                    
                    style = {styles.card}

                    >
                        <Text style = {styles.cardText}>

                            Meteor
                            
                        </Text>

                        <Text style = {styles.knowMore}>
                            Know More
                        </Text>



                        <Image 
                        source = {require('../assets/meteor_icon.png')}
                        style = {styles.imageStyle}
                        />
                    </TouchableOpacity>

                </ImageBackground>
            </View>

        );

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

    card: {
        flex: 0.25,
        backgroundColor: "white",
        borderRadius: 20,
        marginBottom: 60,
        padding: 20,
        marginLeft: 50,
        marginRight: 50
    },

    cardText: {
        fontSize: 45,
        fontWeight: "bold",
        marginTop: 50,
        paddingLeft: 30
        
        

    },

    titleStyle : {
        fontSize: 45,
        fontWeight: 'bold',
        color: "white"

    },

    titleFlex : {
        flex : 0.25,
        justifyContent: 'center',
        alignItems: 'center'
        
    },

    imageStyle : {
        position: 'absolute',
        height : 220,
        width: 220,
        resizeMode : 'contain',
        right: 25,
        top: -90
    },

    knowMore : {
        color : "red",
        fontSize : 20,
        fontWeight: "normal",
        paddingLeft: 30
    } 




})