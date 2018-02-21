import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Box from './Box';
import logo from './logo.svg';
import './App.css';

const gridCount = 4;

const shuffleNumbers = (numbers) => {

  const copiedNumbers = numbers.slice();

  for (var i = copiedNumbers.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = copiedNumbers[i];
      copiedNumbers[i] = copiedNumbers[j];
      copiedNumbers[j] = temp;
  }

  return copiedNumbers;
}

const generateRandomNumbers = (gridBoxesCount) => {
  let numbers = [];

  for ( let i = 1; i <= gridBoxesCount; i++ ) {

    numbers.push(i)

  }

  return shuffleNumbers(numbers);
}

const generateBoxes = (gridBoxesCount) => {
  const boxes = [];
  const randomNumbers = generateRandomNumbers(gridBoxesCount);

  for ( let i = 0; i < gridBoxesCount; i++ ) {

    boxes.push({
      id: i,
      number: randomNumbers[i]
    })

  }

  return boxes
}

@DragDropContext(HTML5Backend)  
class App extends Component {

  constructor(props) {
    super(props);

    const gridBoxesCount = gridCount*gridCount; // get grid boxes count
    const boxes = generateBoxes(gridBoxesCount)

    this.state = {
      boxes
    }

    this.moveBox = this.moveBox.bind(this);
  }

  moveBox(dragIndex, hoverIndex) {
    const { boxes } = this.state
    const dragBox = boxes[dragIndex]
    const hoverBox = boxes[hoverIndex]

    let updatedBoxes = boxes.map(
      (box, index) => {

        if(index == dragIndex) {
          return hoverBox
        }

        if(index == hoverIndex) {
          return dragBox
        }

        return box

      }
    )

    this.setState({
      boxes: updatedBoxes
    })

  }

  isPuzzleSolved (boxes) {

    let solved = true;

    for ( let i = 0; i < boxes.length; i++ ) {
      if((i+1) != boxes[i].number) {
        solved = false;
        break;
      }
    }

    return solved

  }

  render() {

    const {
      boxes
    } = this.state;

    const gridBoxStyle = {
      width: gridCount*100
    }

    let isPuzzleSolved = this.isPuzzleSolved(boxes);

    return (
      <div className="App">

        <div className="grid-box" style={gridBoxStyle}>
          {
            boxes.map(
              (box, index) =>
                <Box
                  key={index}
                  index={index}
                  id={box.id}
                  number={box.number}
                  moveBox={this.moveBox}
                />
            )
          }
        </div>

      </div>
    );
  }
}

export default App;
