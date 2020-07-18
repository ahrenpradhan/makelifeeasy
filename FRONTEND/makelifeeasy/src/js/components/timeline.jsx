import React from 'react';
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

const CustomizedTimeline = ({ order, instruction, handleUpdateInstruction, handleSelectInstruction, selectedId }) => {
	const classes = useStyles();
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
							<TimelineDot style={instruction[t].required ? { background: 'red' } : {}} />
							{index < order.length - 1 && <TimelineConnector />}
						</TimelineSeparator>
						<TimelineContent>
							<Paper
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
											onChange={(event) => handleTitleChange(event, instruction[t])}
											value={instruction[t].title}
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
											onChange={(event) => handleTimeChange(event, instruction[t])}
											value={instruction[t].time}
											fullWidth
											variant='outlined'
											// onChange={this.handleTimeChange}
										/>
									</Grid>
								</Grid>
								{/* {instruction[t].title || 'untitled'}
									{instruction[t].time || '00'} */}
								{/* </Typography> */}
								<Typography>dummy data</Typography>
							</Paper>
						</TimelineContent>
					</TimelineItem>
				))}
			</Timeline>
		</div>
	);
};
export default CustomizedTimeline;
