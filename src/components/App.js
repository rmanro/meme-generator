import React, { Component } from 'react';
import dom2image from 'dom-to-image';
import fileSaver from 'file-saver';

const fontFamilies = [
  'Arial',
  'Comic Sans MS',
  'Impact',
  'Courier'
];

export default class App extends Component {

  constructor() {
    super();

    this.state = {
      image: null,
      header: null,
      font: 'arial',
      color: '#000000'
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

  handleFontChange({ target }) {
    switch(target.value) {
      case 'Arial':
        this.setState({ font: 'arial' });
        break;
      case 'Comic Sans MS':
        this.setState({ font: 'comic-sans' });
        break;
      case 'Impact':
        this.setState({ font: 'impact' });
        break;
      case 'Courier':
        this.setState({ font: 'courier' });
        break;
    }
  }

  handleColorChange({ target }) {
    this.setState({ color: target.value });
  }

  handleExport() {
    dom2image.toBlob(this.imageExport).then(blob => {
      fileSaver.saveAs(blob, 'meme-image.png');
    });
  }

  render() {
    const { image, header, font, color } = this.state;

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
              <input
                type="color"
                value={color}
                onChange={event => this.handleColorChange(event)}
              />
            </label>
          </div>
          <div>
            <select value={this.state.value} onChange={event => this.handleFontChange(event)}>
              {fontFamilies.map(fonts => <option key={fonts}>{fonts}</option>)}
            </select>
          </div>
          <div>
            <button onClick={() => this.handleExport()}>
              EXPORT
            </button>
          </div>
        </section>
        <section>
          <div className="image-container"
            ref={node => this.imageExport = node}
          >
            <h1 style={{ color }} className={font}>{header}</h1>
            <img src={image}/>
          </div>
        </section>
      </main>
    );
  }
}