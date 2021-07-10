import React from 'react';
import { StyleSheet, Text, View, FlatList, ImageBackground, Image } from 'react-native';
import axios from "axios";


export default class Meteor extends React.Component {
    constructor(){
        super();
        this.state = {
            meteors: {}
        }
    }

    componentDidMount(){
        this.getMeteors();

    }

    getMeteors=()=>{
        axios
        .get("https://api.nasa.gov/neo/rest/v1/feed?api_key=Z8gkhqBNhqmjqXtTV27CiZRLS3r0gnSAmyn7KDIp")
        .then((response)=>{
            this.setState({
                meteors: response.data.near_earth_objects
            })
        })
        .catch((error)=>{
            alert("The error is" + error.message);
        })

    }

    renderItem=({item})=>{
        let meteor = item;
        let bg_image, speed, size;
        if (meteor.threat_score <= 30){
            bg_image = require("../assets/meteor_bg1.png");
            speed = require("../assets/meteor_speed1.gif");
            size = 100
        }

        else if (meteor.threat_score <=75){
            bg_image = require("../assets/meteor_bg2.png");
            speed = require("../assets/meteor_speed2.gif");
            size = 150;

        }

        else {
            bg_image = require("../assets/meteor_bg3.png");
            speed = require("../assets/meteor_speed3.gif");
            size = 200

        }

        return(
            <View>
            <ImageBackground
            source = {require("../assets/meteor_bg1.png")} 
            style = {styles.meteorBG}
            >
                <View style = {styles.gifContainer}>
                    <Image 
                    source = {speed}
                    style = {{width: size, height: size}}
                    />



                <View>
                    <Text style = {[styles.meteorTitle, {marginTop: 300}]}>
                        Closest To the Earth: {item.close_approach_data[0].close_approach_date_full}
                        

                    </Text>

                    <Text style = {styles.meteorTitle}>
                        Minimum Diameter (km): {item.estimated_diameter.kilometers.estimated_diameter_min}

                    </Text>

                    <Text style = {styles.meteorTitle}>
                        Maximum Diameter (km): {item.estimated_diameter.kilometers.estimated_diameter_max}

                    </Text>

                    <Text style = {styles.meteorTitle}>
                        Velocity (kmph): {item.close_approach_data[0].relative_velocity.kilometers_per_hour}

                    </Text>

                    <Text style = {styles.meteorTitle}>
                        Missed Earth By (km): {item.close_approach_data[0].miss_distance.kilometers}

                    </Text>
                </View>

                </View>


            </ImageBackground>
            </View>

        );

    }

    keyExtractor=(item, index)=>index.toString();

    render(){
        if (Object.keys(this.state.meteors).length === 0){
            return(
                <View style = {styles.container}>
                    <Text style = {styles.loadingText}>
                        Loading...
                    </Text>
                </View>

            )
        }

        else {
            let meteorArray = Object.keys(this.state.meteors)
            .map((meteorDate)=>{
                return this.state.meteors[meteorDate]
                
            })

            let meteors = [].concat.apply([], meteorArray)
            meteors.forEach(function (element) { 
                let diameter = ( element.estimated_diameter.kilometers.estimated_diameter_min + element.estimated_diameter.kilometers.estimated_diameter_max) / 2 
                let threatScore = (diameter / element.close_approach_data[0].miss_distance.kilometers) * 1000000000 
                element.threat_score = threatScore; 
            });

            meteors.sort((a, b)=>{
                return b.threat_score - a.threat_score
                

            })

            meteors.slice(0, 5)

            return(
                
                <View>
                    <FlatList
                    
                    data = {meteors}

                    keyExtractor = {this.keyExtractor}

                    renderItem = {this.renderItem}

                    horizontal = {true}
                    
                    
                    
                    
                    />
                    

                </View>
    
            );



        }



    }


} 

const styles = StyleSheet.create({
    container : {
        flex : 1

    },

    loadingText : {
        color : "white",
        fontSize : 35,
        fontWeight : "bold"

        
    },

    meteorBG: {
        flex: 1,
        resizeMode: 'center'
    },

    gifContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        flex: 1
    },

    meteorTitle: {
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: "white",
        marginBottom: 20

    }
})


