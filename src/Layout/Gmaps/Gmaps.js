import {Map,GoogleApiWrapper,Marker} from 'google-maps-react';
import React,{Component} from 'react';

class Gmaps extends Component{
        state = {
            stores : [
            {lat:this.props.cardregisteredlatitude,lng:this.props.cardregisteredlongitude},
            {lat:this.props.cardpurchasedlatitude,lng:this.props.cardpurchasedlongitude}
            ]
        }
        displayMarkers = ()=>{
            return this.state.stores.map((store,index)=>{
                return this.state.stores.map((store, index) => {
                    return <Marker key={index} id={index} position={{
                     lat: store.lat,
                     lng: store.lng
                   }} />
                  })
            })
        }
    render(){
        return(
            <Map
            google = {this.props.google}
            zoom={6}
            style = {{ width: '70%', height: '50%',}}
            initialCenter={{lat:this.props.cardregisteredlatitude,lng:this.props.cardregisteredlongitude}}>
                {this.displayMarkers()}
                </Map>
                
        )
    }
}
export default GoogleApiWrapper({apiKey:'AIzaSyCqJuDdcEkwuoQQd6d_vxXP7eCz-s0Z9e4'})(Gmaps);