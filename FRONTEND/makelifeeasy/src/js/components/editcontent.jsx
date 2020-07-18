import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
}));

class EditContent extends Component {
	constructor(props) {
		super(props);
		this.state = { ...props };
	}
	handleTitleChange = (event) => {
		const title = event.target.value;
		this.setState(
			(prevState) => ({
				instruction: {
					...prevState.instruction,
					title,
				},
			}),
			() => this.props.handleUpdateInstruction(this.state.instruction),
		);
	};
	handleRequiredChange = (event) => {
		const required = event.target.checked;
		this.setState(
			(prevState) => ({
				instruction: {
					...prevState.instruction,
					required,
				},
			}),
			() => this.props.handleUpdateInstruction(this.state.instruction),
		);
	};
	handleTimeChange = (event) => {
		const time = event.target.value;
		this.setState(
			(prevState) => ({
				instruction: {
					...prevState.instruction,
					time,
				},
			}),
			() => this.props.handleUpdateInstruction(this.state.instruction),
		);
	};
	render() {
		return (
			<div>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Typography variant='h6' gutterBottom>
							Edit Mode :
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							id='title'
							name='title'
							label='Title'
							onChange={this.handleTitleChange}
							value={this.state.instruction.title}
							multiline={true}
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							type='number'
							id='time'
							name='time'
							label='Time'
							type='number'
							value={this.state.instruction.time}
							fullWidth
							onChange={this.handleTimeChange}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							required
							id='column'
							name='column'
							label='Status'
							variant='outlined'
							disabled={true}
							fullWidth
							value={
								this.state.selected.columnId === 'column-1'
									? 'Placed Instruction'
									: 'Pending Instruction'
							}
						/>
					</Grid>
					<Grid item xs={12}>
						<Divider />
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							id='subInstruction'
							name='subInstruction'
							label='Sub Instruction'
							fullWidth
						/>
					</Grid>
					<Grid item xs={12}>
						<FormControlLabel
							onChange={this.handleRequiredChange}
							checked={this.state.instruction.required}
							control={<Checkbox color='secondary' name='saveAddress' value='yes' />}
							label='Required'
						/>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default EditContent;
