import React, {useState} from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { Chart } from 'components';

const Info = (props) => {
  const [date, setDate] = useState([new Date(), new Date()]);
  const onDateChange = (date) => {
    setDate(date);
  }
  return (
    <React.Fragment>
      <div className="infoContainer">
        <div className="infoContents">
          <div className="userInfo">
            <div className="userLevel">
              Lv.10
            </div>
            <div className="userLevel">
              닉네임
            </div>
          </div>
          <div>
            <DateRangePicker
              onChange={onDateChange}
              value={date}
            />
          </div>
          <div className="chartContainer">
            <Chart/>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Info;
