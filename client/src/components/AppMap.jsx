import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

class AppMap extends React.PureComponent {
  state = {
    lng: 2.349014,
    lat: 48.864716,
    zoom: 12,
  };

  componentDidUpdate(prevProps, prevState) {}

  handleClick = (selectedItem) => {
    // this.setState({ selectedItem });
    console.log("I am here");
  };

  render() {
    // const markers = this.props.items.map((item, index) => (
    //   <Marker
    //     key={item._id}
    //     onClick={() => this.props.handleSelectItem(index)}
    //     coordinates={item.location.coordinates}
    //     offset={[-2 * index, 10]}
    //   >
    //     <img
    //       style={{ cursor: "pointer" }}
    //       src="/media/kombucha.svg"
    //       alt="kombucha"
    //     />
    //   </Marker>
    // ));

    const toto = new Image(20, 30);
    toto.src = "/media/kombucha.svg";

    const image2 = new Image(30, 30);
    image2.src = "/media/kefir.svg";
    const images = ["toto-icon", toto];
    const imagesl = ["popo-icon", image2];

    const items1 = this.props.items.slice(0, 3);
    const items2 = this.props.items.slice(3, 5);

    const features2 = items2.map((item, index) => (
      <Feature key={index} coordinates={item.location.coordinates} />
    ));

    const features = items1.map((item, index) => (
      <Feature key={index} coordinates={item.location.coordinates} />
    ));

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
        <Layer
          type="symbol"
          id="marker"
          images={images}
          layout={{ "icon-image": "toto-icon" }}
        >
          {features}
        </Layer>
        <Layer
          type="symbol"
          id="marker2"
          images={imagesl}
          layout={{ "icon-image": "popo-icon" }}
        >
          {features2}
        </Layer>
      </Map>
    );
  }
}

export default AppMap;
