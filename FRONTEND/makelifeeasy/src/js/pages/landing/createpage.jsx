import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Column from '../../components/column';
import Timeline from '../../components/timeline';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import EditContent from '../../components/editcontent';
import Grid from '@material-ui/core/Grid';

const Container = styled.div`
	flex-grow: 1;
	padding-top: 8px;
	height: 100%;
	// display: flex;
	// flex-direction: column;
`;

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#343e4a',
		},
		secondary: {
			main: '#00D096',
		},
	},
});

class Createpage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editMode: true,
			instructions: {
				'instruction-1': {
					id: 'instruction-1',
					title: '',
					required: false,
					time: 0,
					tasksIds: [],
				},
			},
			tasks: {},
			columns: {
				'column-1': {
					id: 'column-1',
					title: 'Positioned Instruction',
					instructionsIds: ['instruction-1'],
				},
				'column-2': {
					id: 'column-2',
					title: 'Pending Instruction',
					instructionsIds: [],
				},
			},
			columnOrder: ['column-1', 'column-2'],
			selected: {
				columnId: null,
				instructionId: null,
			},
		};
	}
	componentDidMount = () => {
		this.setState((prevState) => ({ count: Object.keys(prevState.instructions).length }));
	};
	onDragEnd = (result) => {
		const { destination, source, draggableId } = result;
		if (!destination) {
			return;
		}
		if (destination.droppableId === source.droppableId && destination.droppableId === source.index) {
			return;
		}
		const start = this.state.columns[source.droppableId];
		const finish = this.state.columns[destination.droppableId];
		if (start === finish) {
			const newInstructionIds = Array.from(start.instructionsIds);
			newInstructionIds.splice(source.index, 1);
			newInstructionIds.splice(destination.index, 0, draggableId);
			const newColumn = {
				...start,
				instructionsIds: newInstructionIds,
			};
			const newState = {
				...this.state,
				columns: {
					...this.state.columns,
					[newColumn.id]: newColumn,
				},
			};
			this.setState(newState);
			return;
		}
		const startInstructionIds = Array.from(start.instructionsIds);
		startInstructionIds.splice(source.index, 1);
		const newStart = {
			...start,
			instructionsIds: startInstructionIds,
		};
		const finishInstructionIds = Array.from(finish.instructionsIds);
		finishInstructionIds.splice(destination.index, 0, draggableId);
		const newFinish = {
			...finish,
			instructionsIds: finishInstructionIds,
		};
		const newState = {
			...this.state,
			columns: {
				...this.state.columns,
				[newStart.id]: newStart,
				[newFinish.id]: newFinish,
			},
		};
		this.setState(newState, () => {
			if (
				this.state.selected.instructionId === draggableId &&
				this.state.selected.columnId !== destination.droppableId
			) {
				this.handleSelectInstruction(destination.droppableId, draggableId);
			}
		});
	};
	handleUpdateInstruction = (id, value) => {
		this.setState((prevState) => {
			prevState.instructions[id] = value;
			return prevState;
		});
	};
	handleSelectInstruction = (columnId, instructionId) => {
		if (this.state.selected.instructionId === instructionId && this.state.selected.columnId === columnId) {
			this.setState({ selected: { columnId: null, instructionId: null } });
			return;
		}
		this.setState({ selected: { columnId, instructionId } });
	};
	handleDeleteInstruction = (columnId, instructionId) => {
		this.setState((prevState) => {
			delete prevState.instructions[instructionId];
			const pos = prevState.columns[columnId].instructionsIds.indexOf(instructionId);
			prevState.columns[columnId].instructionsIds.splice(pos, 1);
			if (prevState.selected.instructionId === instructionId) {
				prevState.selected = {
					columnId: null,
					instructionId: null,
				};
			}
			return prevState;
		});
	};
	handleCreateInstruction = () => {
		this.setState((prevState) => {
			prevState.count++;
			const id = 'instruction-' + prevState.count;
			prevState.instructions[id] = {
				id,
				title: ``,
				required: false,
				time: 0,
				tasksIds: [],
			};
			if (prevState.editMode === true) {
				prevState.columns['column-2'].instructionsIds.push(id);
				prevState.selected = {
					columnId: 'column-2',
					instructionId: id,
				};
			} else {
				prevState.columns['column-1'].instructionsIds.push(id);
				prevState.selected = {
					columnId: 'column-1',
					instructionId: id,
				};
			}
			return prevState;
		});
	};
	handleEditMode = () => {
		this.setState((prevState) => ({ editMode: !prevState.editMode }));
	};
	render() {
		return (
			<ThemeProvider theme={theme}>
				<div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
					<div
						style={{
							// flexGrow: 1,
							margin: 4,
							padding: 4,
							border: '1px solid rgb(240,240,240)',
							borderRadius: 4,
							minHeight: 64,
							// background: 'rgb(252,252,252)',
						}}>
						Menu
					</div>
					<div
						style={{
							flexGrow: 1,
							margin: 4,
							padding: 8,
							border: '1px solid rgb(240,240,240)',
							borderRadius: 4,
							// background: 'rgb(252,252,252)',
							display: 'flex',
						}}>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								minWidth: 300,
								maxWidth: 300,
								// flexGrow: 1,
							}}>
							<Grid container>
								<Grid item xs={12}>
									<Button
										variant='contained'
										color='primary'
										fullWidth
										onClick={this.handleCreateInstruction}
										style={{ flexGrow: 1 }}>
										Publish
									</Button>
								</Grid>
								<Grid item xs={12}>
									<Button
										variant='contained'
										color='secondary'
										fullWidth
										style={{ marginTop: 8 }}
										onClick={this.handleCreateInstruction}>
										Add new instruction
									</Button>
								</Grid>
								<Grid item xs={12}>
									<Button
										variant='contained'
										color='default'
										fullWidth
										style={{ marginTop: 8 }}
										onClick={this.handleEditMode}>
										<span
											style={
												this.state.editMode
													? { fontWeight: 400, fontSize: 10 }
													: { fontWeight: 700 }
											}>
											Timeline Mode
										</span>
										<span style={{ padding: '0px 12px' }}>||</span>
										<span
											style={
												this.state.editMode
													? { fontWeight: 700 }
													: { fontWeight: 400, fontSize: 10 }
											}>
											Edit Mode
										</span>
									</Button>
								</Grid>
							</Grid>

							<DragDropContext onDragEnd={this.onDragEnd}>
								<Container>
									{this.state.columnOrder.map((columnId) => {
										const column = this.state.columns[columnId];
										const instructions = column.instructionsIds.map(
											(instructionId) => this.state.instructions[instructionId],
										);
										return (
											<Column
												key={columnId}
												column={column}
												instructions={instructions}
												handleSelectInstruction={this.handleSelectInstruction.bind(
													this,
													columnId,
												)}
												handleDeleteInstruction={this.handleDeleteInstruction.bind(
													this,
													columnId,
												)}
												selected={this.state.selected}
											/>
										);
									})}
								</Container>
							</DragDropContext>
						</div>
						<div
							style={{
								borderLeft: '1px solid rgb(210,210,210)',
								margin: '0 0 0 8px',
								padding: '0 0 0 8px',
								flexGrow: 1,
								display: 'flex',
								flexDirection: 'column',
							}}>
							{this.state.editMode ? (
								this.state.selected.instructionId ? (
									<div style={{ paddingBottom: 8 }}>
										<EditContent
											key={this.state.selected.instructionId + this.state.selected.columnId}
											instruction={this.state.instructions[this.state.selected.instructionId]}
											selected={this.state.selected}
											tasks={this.state.tasks}
											handleUpdateInstruction={this.handleUpdateInstruction.bind(
												this,
												this.state.selected.instructionId,
											)}
										/>
									</div>
								) : (
									<div style={{ display: 'flex' }}>no instruction selected</div>
								)
							) : (
								<Timeline
									handleUpdateInstruction={this.handleUpdateInstruction.bind(this)}
									instruction={this.state.instructions}
									handleSelectInstruction={this.handleSelectInstruction.bind(this)}
									order={this.state.columns['column-1'].instructionsIds}
									selectedId={this.state.selected.instructionId}
								/>
							)}
						</div>
					</div>
				</div>
			</ThemeProvider>
		);
	}
}
export default Createpage;
