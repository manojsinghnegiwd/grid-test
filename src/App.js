import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import logo from './logo.svg';
import './App.css';

const ItemTypes = {
  BOX: 'box'
}

const gridCount = 3;

@DragDropContext(HTML5Backend)  
class App extends Component {

  constructor(props) {
    super(props);

    const gridBoxesCount = gridCount*gridCount; // get grid boxes count

    const boxes = [];

    for ( let i = 1; i <= gridBoxesCount; i++ ) {

      boxes.push({
        id: new Date().getTime(),
        number: i
      })

    }

    this.state = {
      boxes
    }

    this.moveCard = this.moveCard.bind(this);
  }

  moveCard(dragIndex, hoverIndex) {
    const { cards } = this.state
    const dragCard = cards[dragIndex]

    // this.setState(
    //   update(this.state, {
    //     cards: {
    //       $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
    //     },
    //   }),
    // )
  }

  render() {

    const {
      boxes
    } = this.state;

    return (
      <div className="App">

        <div className="grid-box">
          {
            boxes.map(
              (box, index) =>
                <Box
                  key={index}
                  id={box.id}
                  number={box.number}
                />
            )
          }
        </div>

      </div>
    );
  }
}

const Box = ({number}) => <div>{number}</div>

export default App;
