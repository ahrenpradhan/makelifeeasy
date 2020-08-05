import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
// import FastfoodIcon from '@material-ui/icons/Fastfood';
// import LaptopMacIcon from '@material-ui/icons/LaptopMac';
// import HotelIcon from '@material-ui/icons/Hotel';
// import RepeatIcon from '@material-ui/icons/Repeat';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: '6px 16px',
	},
	secondaryTail: {
		backgroundColor: theme.palette.secondary.main,
	},
}));

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

const SinglePaperInstruction = ({
	instruction,
	handleSelectInstruction,
	handleTitleChange,
	handleTimeChange,
	handleRequiredChange,
	selectedId,
	t,
	index,
}) => {
	const myRef = useRef(null);
	if (selectedId === t) {
		setTimeout(() => {
			scrollToRef(myRef);
		}, 3000);
	}
	const classes = useStyles();

	return (
		<Paper
			ref={myRef}
			style={{ padding: 16 }}
			elevation={selectedId === t ? 3 : 0}
			className={classes.paper}
			onClick={() => t != selectedId && handleSelectInstruction('column-1', t)}>
			{/* <Typography variant='h6' component='h1'> */}
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<TextField
						id='title'
						name='title'
						label={'Step ' + (index + 1)}
						onChange={(event) => handleTitleChange(event, instruction)}
						value={instruction.title}
						multiline={true}
						fullWidth
						variant='outlined'
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						type='number'
						id='time'
						name='time'
						label='Time taken in minuites'
						type='number'
						onChange={(event) => handleTimeChange(event, instruction)}
						value={instruction.time}
						fullWidth
						variant='outlined'
						// onChange={this.handleTimeChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControlLabel
						onChange={() => handleRequiredChange(instruction)}
						checked={instruction.required || false}
						control={<Checkbox color='secondary' name='saveAddress' value='yes' />}
						label='Required'
					/>
				</Grid>
			</Grid>
			<Typography>dummy data</Typography>
		</Paper>
	);
};

const CustomizedTimeline = ({ order, instruction, handleUpdateInstruction, handleSelectInstruction, selectedId }) => {
	const handleTitleChange = (event, value) => {
		const title = event.target.value;
		handleUpdateInstruction(value.id, {
			...value,
			title,
		});
	};
	const handleTimeChange = (event, value) => {
		const time = event.target.value;
		handleUpdateInstruction(value.id, {
			...value,
			time,
		});
	};
	const handleRequiredChange = (value) => {
		const required = !value.required;
		handleUpdateInstruction(value.id, {
			...value,
			required,
		});
	};
	return (
		<div
			style={{
				border: '1px solid rgb(240,240,240)',
				background: 'rgb(250,250,250)',
			}}>
			<Timeline align='alternate'>
				{order.map((t, index) => (
					<TimelineItem key={index}>
						{/* <TimelineOppositeContent>
							<Paper elevation={1} className={classes.paper}>
								<Typography variant='body2' color='textSecondary'>
									{instruction[t].time || '00'}
								</Typography>
							</Paper>
						</TimelineOppositeContent> */}
						<TimelineSeparator>
							<TimelineDot
								onClick={() => handleRequiredChange(instruction[t])}
								style={{
									height: 16,
									width: 16,
									justifyContent: 'center',
									...(instruction[t].required ? { background: 'red' } : {}),
								}}>
								{index + 1}
							</TimelineDot>
							{index < order.length - 1 && <TimelineConnector />}
						</TimelineSeparator>
						<TimelineContent>
							<SinglePaperInstruction
								handleSelectInstruction={handleSelectInstruction}
								selectedId={selectedId}
								handleTitleChange={handleTitleChange}
								handleTimeChange={handleTimeChange}
								handleRequiredChange={handleRequiredChange}
								instruction={instruction[t]}
								t={t}
								index={index}
							/>
						</TimelineContent>
					</TimelineItem>
				))}
			</Timeline>
		</div>
	);
};
export default CustomizedTimeline;
