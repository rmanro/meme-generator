import React, { Component } from 'react';
// import dom2image from 'dom-to-image';
// import fileSaver from 'file-saver';

export default class App extends Component {

  constructor() {
    super();

    this.state = {
      image: null,
      header: null
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

  handleHeaderChange({ target }) {
    this.setState({ header: target.value });
  }

  render() {
    const { image, header } = this.state;

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
          <div>
            <label>
              Header:
              <input
                onChange={event => this.handleHeaderChange(event)}
              />
            </label>
          </div>
        </section>
        <section>
          <div className="image-container"
            ref={node => this.imageExport = node}
          >
            <h1>{header}</h1>
            <img src={image}/>
          </div>
        </section>
      </main>
    );
  }
}