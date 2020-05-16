import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

const kombuchaImg = new Image(20, 30);
kombuchaImg.src = "/media/kombucha.svg";

const kefirImg = new Image(30, 30);
kefirImg.src = "/media/kefir.svg";

class AppMap extends React.PureComponent {
  state = {
    lng: 2.349014,
    lat: 48.864716,
    zoom: 12,
  };

  componentDidUpdate(prevProps, prevState) {}

  componentDidMount() {
    const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      this.setState({ lat: latitude, lng: longitude });
    };

    const error = () => {
      console.log("An error occured geolocating user");
    };

    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  handleClick = (selectedItem) => {
    this.setState({ selectedItem });
  };

  render() {
    const kombuchas = this.props.items.filter(
      (item) => item.category[0] === "Kombucha"
    );

    const kefirs = this.props.items.filter(
      (item) => item.category[0] === "Kefir"
    );

    const kombuchaLayer = (
      <Layer
        type="symbol"
        id="kombuchas"
        images={["kombucha-icon", kombuchaImg]}
        layout={{ "icon-image": "kombucha-icon" }}
      >
        {kombuchas.map((item, index) => (
          <Feature
            key={index}
            onClick={(event) => this.handleClick(item)}
            coordinates={item.location.coordinates}
          />
        ))}
      </Layer>
    );

    const kefirLayer = (
      <Layer
        type="symbol"
        id="kefirs"
        images={["kefir-icon", kefirImg]}
        layout={{ "icon-image": "kombucha-icon" }}
      >
        {kefirs.map((item, index) => (
          <Feature
            key={index}
            onClick={(event) => this.handleClick(item)}
            coordinates={item.location.coordinates}
          />
        ))}
      </Layer>
    );

    return (
      <Map
        // eslint-disable-next-line
        style="mapbox://styles/mapbox/light-v10"
        zoom={[12]}
        containerStyle={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
        }}
        center={[this.state.lng, this.state.lat]}
      >
        {kombuchaLayer}
        {kefirLayer}
      </Map>
    );
  }
}

export default AppMap;
