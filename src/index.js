import React, { Component, Fragment } from "react";
import { render } from "react-dom";

//Old Package
//import S3Client, { deleteFile, uploadFile } from "react-s3";

//New Package
import S3Client, { deleteFile, uploadFile } from "aws-s3";

class App extends Component {
  state = {
    file: ""
  };
  handleInputChange = e => {
    this.setState({
      [e.target.name]: [e.target.files[0]]
    });
  };
  handleUpload = () => {
    const file = this.state.file[0];
    const params = {
      bucketName: "",
      albumName: "photos" /* Now is optional */,
      region: "eu-west-2",
      accessKeyId: " ",
      secretAccessKey: ""
    };
    S3Client.uploadFile(file, params)
      .then(({ location }) => this.setState({ link: location }))
      .catch(err => console.error(err));
  };
  render = () => {
    return (
      <Fragment>
        <input type="file" name="file" onChange={this.handleInputChange} />
        <button onClick={this.handleUpload}>Upload</button>
        <img src={this.state.link} alt="Uploaded Image Will Appear Here" />
      </Fragment>
    );
  };
}

render(<App />, document.getElementById("root"));
