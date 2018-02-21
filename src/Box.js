import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import ItemTypes from './ItemTypes'

const boxSource = {
	beginDrag(props) {
		return {
			id: props.id,
			index: props.index,
		}
	},
}

const boxTarget = {
	drop(props, monitor, component) {
		const dragIndex = monitor.getItem().index
		const hoverIndex = props.index

		if (dragIndex === hoverIndex) {
			return
		}

		props.moveBox(dragIndex, hoverIndex)

		monitor.getItem().index = hoverIndex
	}
}

@DropTarget(ItemTypes.BOX, boxTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop(),
}))
@DragSource(ItemTypes.BOX, boxSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
}))
export default class Box extends Component {
	render() {
		const {
			number,
			isDragging,
			connectDragSource,
			connectDropTarget,
			canDrop,
			isOver
		} = this.props

		const isActive = canDrop && isOver

		return connectDragSource(
			connectDropTarget(<div className={`box ${isDragging ? 'isDragging' : ''} ${isActive ? 'isActive' : ''}`}><p>{number}</p></div>),
		)
	}
}