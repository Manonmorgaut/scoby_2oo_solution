import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import "../styles/Map.css";

class Map extends Component {
  state = {
    lng: 5,
    lat: 34,
    zoom: 2,
    selectedSpot: null,
  };

  mapRef = React.createRef();

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapRef,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });

    map.on("move", () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });

    map.on("click", (x) => {
      console.log("x", x);
    });
  }

  render() {
    return (
      <div>
        <div style={{ zIndex: 99, position: "absolute" }}>
          Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom:{" "}
          {this.state.zoom}
        </div>
        <div ref={(el) => (this.mapRef = el)} className="mapContainer"></div>
      </div>
    );
  }
}

export default Map;
