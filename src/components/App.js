import React, { Component } from 'react';
// import dom2image from 'dom-to-image';
// import fileSaver from 'file-saver';

export default class App extends Component {

  constructor() {
    super();

    this.state = {
      image: null
    };
  }

  handleImageUrl({ target }) {
    this.setState({ image: target.value });
  }

  handleUpload({ target }) {
    const reader = new FileReader();

    reader.readAsDataURL(target.files[0]);

    reader.onload = () => {
      this.setState({ image: reader.result });
    };
  }

  render() {
    const { image } = this.state;

    return (
      <main>
        <h1>Meme Generator</h1>
        <section>
          <div>
            <label>
              Image URL:
              <input onChange={event => this.handleImageUrl(event)}/>
            </label>
          </div>
          <div>
            <label>
              Upload Image:
              <input
                type="file"
                onChange={event => this.handleUpload(event)}
              />
            </label>
          </div>
        </section>
        <section>
          <img src={image}/>
        </section>
      </main>
    );
  }
}