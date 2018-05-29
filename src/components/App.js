import React, { Component } from 'react';
// import dom2image from 'dom-to-image';
// import fileSaver from 'file-saver';

export default class App extends Component {

  constructor() {
    super();

    this.state = {
      name: 'Test'
    };
  }

  handleTest() {
    this.setState({ name: 'Test Worked!' });
  }

  render() {
    const { name } = this.state;

    return (
      <main>
        <h1>Hello {name}</h1>
        <div>
          <button onClick={() => this.handleTest()}>Test</button>
        </div>
      </main>
    );
  }
}