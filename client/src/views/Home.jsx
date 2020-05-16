import React from "react";
// import Map from "../components/Map";
import Footer from "../components/Footer";
import AppMap from "../components/AppMap";
import ItemDisplay from "../components/ItemDisplay";

class Home extends React.Component {
  state = {
    selectedItem: null,
  };

  onSelectItem = (index) => {
    this.setState({ selectedItem: index });
  };

  handleClose = () => {
    this.setState({ selectedItem: null });
  };

  render() {
    return (
      <React.Fragment>
        {/* <Map items={props.items} /> */}

        {this.state.selectedItem !== null && (
          <ItemDisplay
            item={this.props.items[this.state.selectedItem]}
            handleClose={this.handleClose}
          />
        )}
        <AppMap items={this.props.items} handleSelectItem={this.onSelectItem} />
        <Footer />
      </React.Fragment>
    );
  }
}

export default Home;
