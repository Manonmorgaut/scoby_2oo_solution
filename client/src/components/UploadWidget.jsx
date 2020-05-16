import React from "react";
import "../styles/UploadWidget.css";

class UploadWidget extends React.Component {
  inputRef = React.createRef();

  focusInput = () => {
    this.inputRef.current.click();
  };

  handleFile = (event) => {
    event.stopPropagation();
    const tmpUrl = URL.createObjectURL(event.target.files[0]);
    const file = event.target.files[0];
    this.props.onFileSelect({ tmpUrl, file });
  };

  render() {
    const { name } = this.props;
    return (
      <React.Fragment>
        <label
          onClick={this.focusInput}
          className="UploadWidget label"
          htmlFor={name}
        >
          {this.props.children}
        </label>
        <input
          onChange={this.handleFile}
          ref={this.inputRef}
          className="input"
          id={name}
          type="file"
          name={name}
        />
      </React.Fragment>
    );
  }
}

export default UploadWidget;
