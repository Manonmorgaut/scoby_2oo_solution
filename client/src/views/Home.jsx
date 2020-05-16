import React from "react";
import AppMap from "../components/AppMap";
import ItemDisplay from "../components/Items/ItemDisplay";

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
        {this.state.selectedItem !== null && (
          <ItemDisplay
            item={this.props.items[this.state.selectedItem]}
            handleClose={this.handleClose}
          />
        )}
        <AppMap items={this.props.items} handleSelectItem={this.onSelectItem} />
      </React.Fragment>
    );
  }
}

export default Home;
