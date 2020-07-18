import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import DragHandle from '@material-ui/icons/DragIndicator';
import Delete from '@material-ui/icons/Delete';
import styled from 'styled-components';

const Container = styled.div`
	min-height: 24px;
	border: 1px solid
		${(props) => (props.isDragging ? 'rgba(16, 209, 214)' : props.selected ? 'black' : 'rgb(200, 200, 200)')};
	border-radius: 4px;
	padding: 4px;
	margin-bottom: 2px;
	background: rgb(250, 250, 250);
	display: flex;
	justify-content: space-between;
	cursor: pointer;
`;

const Handle = styled.div`
	width: 20px;
	height: 20px;
	cursor: move;
	margin-right: 8px;
`;

const getItemStyle = (isDragging, { transform, ...draggableStyle }) => {
	const styles = {
		boxShadow: isDragging ? '0 0 10px rgba(0, 0, 0, 0.11111)' : 'none',
		...draggableStyle,
	};
	if (!transform) {
		return styles;
	}
	return {
		...styles,
		transform: `translate(0, ${transform.split(',')[1].slice(0, -1)})`,
	};
};

class Instruction extends Component {
	render() {
		return (
			<Draggable draggableId={this.props.instruction.id} index={this.props.index}>
				{(provided, snapshot) => (
					<Container
						{...provided.draggableProps}
						style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
						ref={provided.innerRef}
						isDragging={snapshot.isDragging}
						onClick={() => this.props.handleSelectInstruction(this.props.instruction.id)}
						selected={this.props.selected}>
						<Handle {...provided.dragHandleProps}>
							<DragHandle />
						</Handle>
						<div style={{ alignSelf: 'center', flexGrow: 1 }}>
							{`${this.props.index + 1}) ` + (this.props.instruction.title || 'Untitled instruction')}
							{this.props.instruction.required && <span style={{ color: 'red', paddingLeft: 4 }}>*</span>}
						</div>
						<div>
							<Delete
								onClick={(event) => {
									event.stopPropagation();
									this.props.handleDeleteInstruction(this.props.instruction.id);
								}}
							/>
						</div>
					</Container>
				)}
			</Draggable>
		);
	}
}

export default Instruction;
