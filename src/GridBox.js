import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Box from './Box';

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
class GridBox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      boxes: [],
      dateTime: 0
    }

    this.moveBox = this.moveBox.bind(this)
    this.generateBoxesAndSave = this.generateBoxesAndSave.bind(this)
  }

  generateBoxesAndSave (gridCount) {

  	const gridBoxesCount = gridCount*gridCount; // get grid boxes count
    const boxes = generateBoxes(gridBoxesCount)

    this.setState({
    	boxes,
    	dateTime: new Date().getTime()
    })

  }

  componentWillReceiveProps (nextProps) {
  	if(nextProps.gridCount != this.props.gridCount) {
  		this.generateBoxesAndSave(nextProps.gridCount)
  	}
  }

  componentDidMount () {
  	if(this.props.gridCount) {
  		this.generateBoxesAndSave(this.props.gridCount)
  	}
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
      boxes,
      dateTime
    } = this.state;

    const {
    	gridCount,
    	toggleGrid
    } = this.props;

    const gridBoxStyle = {
      width: gridCount*100,
      height: gridCount*100,
    }

    let isPuzzleSolved = this.isPuzzleSolved(boxes);
    const seconds = (new Date().getTime() - dateTime) / 1000;

    return (
    	<div className="flex-column-container">
			{
				isPuzzleSolved ?
					<div>
						<h1>Welcome to the Team!!!</h1>
						<p className="margin-bottom">You completed this game in {seconds} seconds.</p>
					</div>
				:
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
			}
			<div>
				<a onClick={toggleGrid}>
					Go Back
				</a>
				<a onClick={ () => this.generateBoxesAndSave(gridCount) }>
					{isPuzzleSolved ? 'Play Again' : 'Restart Game'}
				</a>
			</div>
		</div>
    );
  }
}

export default GridBox;
