import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js'
import { timers } from 'jquery';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

const BarChart = (props) => {

    let date = new Date();
    let dayArray = [];
    let dateArray = [];
    let dataArray = [];

    for (let i = 0; i<=7; i++) {
        const day = new Date(date.getTime() - (i * 24 * 60 * 60 * 1000))
        dayArray.push(day.getSeconds)
        dateArray.push(`${day.getDate()}/${day.getMonth()+1}/${day.getFullYear()}`)
    }


    for (let i = 0; i<=props.data.length; i++) {

    }

    const data = {
        labels: dateArray,
        datasets: [
            {
                label: props.label,
                data: props.data,
                backgroundColor: props.color,
                borderColor: 'black',
                borderWidth: 1,
            }
        ]
    }

    const options = {
        responsive:true,
        scales:{
            x:{
                type: 'time',
                time: {
                    tooltipFormat: 'DD T',
                },
                title: {
                    display: true,
                    text: props.xlabel
                }
            },
            y:{
                title: {
                    display: true,
                    text: props.ylabel
                },
                tick: {
                    callback: function (value){
                        return '$' + value + 'm'
                    }
                }
            }
        }
    }

    return (
      <div className="relative">
        <Bar 
            data={data}
            options={options}
        />
      </div>
    )
}

export default BarChart;