import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

const kombuchaImg = new Image(20, 30);
kombuchaImg.src = "/media/kombucha.svg";

const kefirImg = new Image(20, 30);
kefirImg.src = "/media/kefir.svg";

const vinegarImg = new Image(20, 30);
vinegarImg.src = "/media/vinegar.svg";

const plantImg = new Image(20, 30);
plantImg.src = "/media/plant.svg";

class AppMap extends React.PureComponent {
  state = {
    lng: 2.349014,
    lat: 48.864716,
    zoom: 12,
  };

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
    this.props.handleSelectItem(selectedItem);
  };

  render() {
    const kombuchas = this.props.items.filter(
      (item) => item.category[0] === "Kombucha"
    );

    const vinegars = this.props.items.filter(
      (item) => item.category[0] === "Vinegar"
    );

    const plants = this.props.items.filter(
      (item) => item.category[0] === "Plant"
    );
    const kefirs = this.props.items.filter(
      (item) => item.category[0] === "Kefir"
    );

    const vinegarLayer = (
      <Layer
        type="symbol"
        id="vinegars"
        images={["vinegar-icon", vinegarImg]}
        layout={{ "icon-image": "vinegar-icon" }}
      >
        {vinegars.map((item, index) => (
          <Feature
            key={index}
            onClick={(event) => this.handleClick(item)}
            coordinates={item.location.coordinates}
          />
        ))}
      </Layer>
    );

    const plantLayer = (
      <Layer
        type="symbol"
        id="plants"
        images={["plant-icon", plantImg]}
        layout={{ "icon-image": "plant-icon" }}
      >
        {plants.map((item, index) => (
          <Feature
            key={index}
            onClick={(event) => this.handleClick(item)}
            coordinates={item.location.coordinates}
          />
        ))}
      </Layer>
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
        layout={{ "icon-image": "kefir-icon" }}
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
        {vinegarLayer}
        {plantLayer}
      </Map>
    );
  }
}

export default AppMap;
