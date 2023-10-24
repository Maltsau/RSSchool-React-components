import './App.css';
import { Component, ReactNode } from 'react';

class App extends Component {
  state = {
    url: 'https://swapi.dev/api/people/',
    data: null,
  };

  componentDidMount(): void {
    fetch(this.state.url)
      .then((response) => response.json())
      .then((data) => this.setState({ data }));
    console.log(this.state.data);
  }

  render(): ReactNode {
    return <>Hello</>;
  }
}

export default App;
