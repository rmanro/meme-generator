import React, { Component } from 'react';
import dom2image from 'dom-to-image';
import fileSaver from 'file-saver';

const fontFamilies = [
  'Arial',
  'Comic Sans MS',
  'Impact',
  'Courier'
];

const fontSizes = [
  'Small',
  'Large',
  'Larger',
  'Huge'
];

export default class App extends Component {

  constructor() {
    super();

    this.state = {
      image: null,
      header: null,
      font: 'arial',
      color: '#000000',
      fontSize: 'Small'
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

  handleSizeChange({ target }) {
    switch(target.value) {
      case 'Small':
        this.setState({ fontSize: 'small' });
        break;
      case 'Large':
        this.setState({ fontSize: 'large' });
        break;
      case 'Larger':
        this.setState({ fontSize: 'larger' });
        break;
      case 'Huge':
        this.setState({ fontSize: 'huge' });
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
    const { image, header, font, color, fontSize } = this.state;

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
            <select onChange={event => this.handleFontChange(event)}>
              {fontFamilies.map(fonts => <option key={fonts}>{fonts}</option>)}
            </select>
          </div>
          <div>
            <select onChange={event => this.handleSizeChange(event)}>
              {fontSizes.map(sizes => <option key={sizes}>{sizes}</option>)}
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
            <h1 style={{ color }} className={`${font} ${fontSize}`}>{header}</h1>
            <img src={image}/>
          </div>
        </section>
      </main>
    );
  }
}