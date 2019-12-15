import React from 'react';
import { Line } from 'react-chartjs-2';
import {getApplyLevel} from '../module/level.js';

const Chart = (props) => {
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: '총 경험치',
        fill: false,
        lineTension: 0.05,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(134,136,138,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#6c5ce7',
        pointHoverBackgroundColor: 'rgba(94,139,242,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 3,
        pointHoverRadius: 6,
        pointRadius: 0,
        data: props.data,
      }
    ]
  };
  const options = {
    maintainAspectRatio: false,
    tooltips: {
      mode: 'nearest',
      intersect: false,
      callbacks: {
        label: function(tooltipItem, data) {
            var label = data.datasets[tooltipItem.datasetIndex].label || '';

            if (label) {
                label += ': ';
            }
            let [level, exp] = getApplyLevel(1, tooltipItem.yLabel);
            label += tooltipItem.yLabel + " Lv." + level + " EXP:" + exp;
            return label;
        },
      }
    },
    layout: {
      padding: {
        top: 40
      }
    },
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        ticks: {      
          callback: function(value, index, values){
            if(value >= 1000)
              return Math.round(parseFloat(value / 1000)) + "K";
            else if(value >= 1000000)
              return Math.round(parseFloat(value / 1000000)) + "M";
            else
              return value;
          },
        },
        gridLines:{
          color: "#CCC",
          lineWidth:1,
        },
      }],
      xAxes: [{
        gridLines:{
          color: "#CCC",
          lineWidth:1,
        },
      }],
    },
    hover: {
      mode: 'nearest',
      intersect: false
    }
  };
  options.scales.yAxes[0].ticks.min = props.data[0] - (props.data[0] / 3);
  return (
    <Line data={data} options={options} />
  );
}
export default Chart;