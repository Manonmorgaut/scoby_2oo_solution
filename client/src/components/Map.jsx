import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import "../styles/Map.css";

class Map extends Component {
  state = {
    lng: 2.349014,
    lat: 48.864716,
    zoom: 12,
    selectedSpot: null,
    markers: [],
    isLoaded: false,
  };

  mapRef = React.createRef();

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapRef,
      style: "mapbox://styles/mapbox/light-v10",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });

    this.map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    const { items } = this.props;
    let newMarkers = [];
    const features = [];
    items.forEach((item) => {
      const copy = JSON.parse(JSON.stringify(item));
      delete copy.location.formattedAddress;
      const feat = {
        type: "Feature",
        geometry: copy.location,
      };
      features.push(feat);
    });
    // this.map.addSource("places", {
    //   type: "geojson",
    //   data: {
    //     type: "FeatureCollection",
    //     features: features,
    //   },
    // });
    // this.map.addLayer({
    //   id: "places",
    //   type: "symbol",
    //   source: "places",
    //   layout: {
    //     "icon-image": "{icon}-15",
    //     "icon-allow-overlap": true,
    //   },
    // });
    items.forEach((item) => {
      const marker = new mapboxgl.Marker()
        .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello</h1>"))
        .setLngLat(item.location.coordinates)
        .addTo(this.map);
      // marker.on("click", () => {
      //   console.log(item);
      // });
      marker.style.background = "/media/kombucha.svg";
      newMarkers.push(marker);
    });
    this.setState({ markers: newMarkers });
    this.map.on("click", "places", (x) => {
      console.log("x", x.features[0].properties.itemIndex);
    });

    this.map.on("load", () => {
      this.map.loadImage("/media/kombiucha.png", (error, image) => {
        if (error) throw error;
        this.map.addImage("pute", image);
      });
      this.intervalid = setInterval(() => {
        const isLoaded = this.map.isStyleLoaded();
        if (isLoaded) {
          clearInterval(this.intervalid);
          this.setState({ isLoaded: true });
        }
      }, 500);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isLoaded) {
      if (this.props.items.length) {
        const features = [];
        this.props.items.forEach((item, index) => {
          const copy = JSON.parse(JSON.stringify(item));
          delete copy.location.formattedAddress;
          const feat = {
            type: "Feature",
            geometry: copy.location,
            properties: {
              icon: "music",
              itemIndex: index,
              itemName: item.name,
            },
          };
          features.push(feat);
        });
        const geoJSON = {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: features,
          },
        };

        // this.map.addImage("/media/avatar.png")
        this.map.addSource("places", geoJSON);
        this.map.addLayer({
          id: "places",
          type: "symbol",
          source: "places",
          layout: {
            "icon-image": "pute",
            "icon-allow-overlap": true,
            "icon-size": 0.05,
          },
        });
      }
      if (prevProps.items !== this.props.items) {
        const { items } = this.props;
        let newMarkers = [];
        items.forEach((item) => {
          const marker = new mapboxgl.Marker()
            .setLngLat(item.location.coordinates)
            .setPopup(new mapboxgl.Popup().setHTML("<h1>Hello</h1>"))
            .addTo(this.map);
          marker.style.background = "/media/kombucha.svg";
          newMarkers.push(marker);
        });
        this.setState({ markers: newMarkers });
      }
    }
  }

  render() {
    return (
      <div>
        {!this.state.isLoaded && (
          <div className="LoadingPreview">LOADING MAP</div>
        )}
        <div ref={(el) => (this.mapRef = el)} className="mapContainer"></div>
      </div>
    );
  }
}

export default Map;
