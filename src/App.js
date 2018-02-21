import React, { Component } from 'react';
import GridBox from './GridBox';
import './App.css';

class App extends Component {

  constructor (props) {
    super(props)

    this.state = {
      gridCount: 0,
      showGrid: false
    }

    this.onGridCountChange = this.onGridCountChange.bind(this)
    this.toggleGrid = this.toggleGrid.bind(this)
  }

  onGridCountChange (e) {
    let gridCount = parseInt(e.target.value);

    if(isNaN(gridCount)) {
      gridCount = ''
    }

    this.setState({
      gridCount
    })
  }

  toggleGrid () {
    this.setState(
      prevState => ({
        showGrid: !prevState.showGrid
      })
    )
  }

  render() {

    const {
      gridCount,
      showGrid
    } = this.state;

    return (
      <div className="App">

        {
          showGrid ?

          <GridBox
            gridCount={gridCount}
            toggleGrid={this.toggleGrid}
          />

        : 
          <div className="question-container flex-column-container">
            <h2>How many grids do you wants to play with ?</h2>
            <input
              value={gridCount}
              onChange={this.onGridCountChange}
              type="number"
            />
            {
              gridCount ?
                <a onClick={this.toggleGrid}>
                  Play Game
                </a>
              : null
            }
          </div>
        }

      </div>
    );
  }
}

export default App;
