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
        </section>
        <section>
          <img src={image}/>
        </section>
      </main>
    );
  }
}