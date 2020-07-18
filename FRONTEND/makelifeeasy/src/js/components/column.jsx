import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
// var ScrollArea = require('react-scrollbar');
import Instruction from './instruction';

const Container = styled.div`
	// flex-grow: 1;
	height: 250px;
	// max-height: 250px;
	padding: 8px;
	border: 1px solid rgb(200, 200, 200);
	border-radius: 4px;
	min-height: 100px;
	display: flex;
	flex-direction: column;
	margin-bottom: 4px;
`;
const Title = styled.h3`
	margin-top: 0;
	margin-bottom: 4px;
`;
const InstructionList = styled.div`
	padding: 4px 0px;
	border-radius: 4px;
	transition: background 200ms ease;
	background: ${(props) => (props.isDraggingOver ? 'rgb(236,236,236)' : 'rgb(255,255,255)')};
	border: ${(props) => (props.isDraggingOver ? '1px dotted rgb(200, 200, 200)' : '1px dotted rgb(200, 200, 200, 0)')};
	flex-grow: 1;
	// max-height: 250px;
	overflow-y: auto;
`;

class Column extends Component {
	render() {
		return (
			<Container>
				<Title>{this.props.column.title}</Title>
				<Droppable droppableId={this.props.column.id}>
					{(provided, snapshot) => (
						<>
							<InstructionList
								ref={provided.innerRef}
								{...provided.droppableProps}
								isDraggingOver={snapshot.isDraggingOver}>
								{this.props.instructions.map((instruction, index) => (
									<Instruction
										key={instruction.id}
										instruction={instruction}
										index={index}
										handleSelectInstruction={this.props.handleSelectInstruction}
										handleDeleteInstruction={this.props.handleDeleteInstruction}
										selected={this.props.selected.instructionId == instruction.id}
									/>
								))}
								{provided.placeholder}
							</InstructionList>
							{/* </ScrollArea> */}
							{this.props.instructions.length == 0 &&
								(this.props.column.id === `column-1` ? (
									<span style={{ color: 'rgb(200,0,0)' }}>At least one instruction...</span>
								) : (
									<span style={{ color: 'rgb(150,150,150)' }}>No pending instruction...</span>
								))}
						</>
					)}
				</Droppable>
			</Container>
		);
	}
}

export default Column;
