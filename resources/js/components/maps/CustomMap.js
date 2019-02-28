import React , {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactMapGL, {NavigationControl} from 'react-map-gl';
import Geocode from "react-geocode";

export default class CustomMap extends Component {

  state = {
    viewport: {
      width: 300,
      height: 300,
      latitude: 6.73977094233536,
      longitude: 124.76579357401828,
      zoom: 10
    }

  };

  // componentDidUpdate(prevProps){
  //   // if (prevProps.coordinate !== this.props.coordinate) {
  //   //   this.setState( prevState => ({
  //   //     viewport: {
  //   //       width: prevState.width,
  //   //       height: prevState.height,
  //   //       zoom: prevState.zoom,
  //   //       latitude: this.props.coordinate.latitude,
  //   //       longitude: this.props.coordinate.longitude,
  //   //     }
  //   //   }));
  //   // }
  // }

  // componentDidMount(){
    // Geocode.setApiKey("AIzaSyC8JuRON7U4X0JTjY8Df186rFWBawIsXOU");
    // Geocode.enableDebug();
    // Geocode.fromAddress(this.props.address).then(
    //   response => {
    //     const { lat, lng } = response.results[0].geometry.location;
    //     console.log(lat, lng);
    //     this.setState( prevState => {
    //       return {
    //         viewport: {
    //           width: prevState.width,
    //           height: prevState.height,
    //           zoom: prevState.zoom,
    //           latitude: lat,
    //           longitude: lng,
    //         }
    //       }
    //     });
    //   },
    //   error => {
    //     console.error(error);
    //   }
    // );
  // }

  render() {
    const token = 'pk.eyJ1Ijoia25lZGlvIiwiYSI6ImNqc2x5YXFmZDA4bHY0M3M2dDJ6cno1dWMifQ.dcetWRAiTbj1tN23iZUQwg';
    return (
      <ReactMapGL
        mapStyle="mapbox://styles/mapbox/streets-v10"
        {...this.state.viewport} mapboxApiAccessToken={token}
        onViewportChange={(viewport) => this.setState({viewport})}
      >
        <div className="nav">
          <NavigationControl onViewportChange={(viewport) => this.setState({ viewport })} />
        </div>
      </ReactMapGL>
    );
  }
}