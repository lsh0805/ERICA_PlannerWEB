import React, {useState} from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Chart } from 'components';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    backgroundColor: '#A5F2F3',
  },
  fixedHeight: {
    height: 240,
  },
}));

const Info = (props) => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [date, setDate] = useState([new Date(), new Date()]);
  const onDateChange = (date) => {
    setDate(date);
  }
  return (
    <React.Fragment>
      <div>
        <DateRangePicker
          onChange={onDateChange}
          value={date}
        />
      </div>
      <Grid item xs={12} md={12} lg={8}>
        <Paper className={fixedHeightPaper}>
          <Chart/>
        </Paper>
      </Grid>
    </React.Fragment>
  );
};

export default Info;
