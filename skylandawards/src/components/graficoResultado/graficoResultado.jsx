import React from 'react'
import { Chart as Chartjs, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Colors, scales, Ticks, plugins} from 'chart.js'
import {Bar} from 'react-chartjs-2'

Chartjs.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const GraficoResultado = ({titulos, datos, label}) => {
    var options={
        responsive: true,
        mantainAspectRatio: false,
        color: 'whitesmoke',
        layout:{
            padding:{
                left:-1,
                bottom:10
            }
        },
        scales:{
            x: {
                ticks:{
                    color:'whitesmoke',
                    font:{
                        size:15,
                        family: "VoltaireFrangela"
                    }
                },
            },
            y: {
                ticks:{
                    color:'whitesmoke',
                    font:{
                        size:14,
                        family: "VoltaireFrangela"
                    },
                },
                beginAtZero: true
            }
        },
        plugins:{
            legend:{
                labels:{
                    font:{
                        size: 50,
                        family: "VoltaireFrangela"
                    }
                }
            }
        }
    }
    
    var data={
        labels: titulos,
        datasets: [
            {
                label: label,
                data: datos,
                backgroundColor: '#12633d',
                borderWidth: 1,
            }
        ]
    }
  return (
    <Bar data={data} options={options}></Bar>
  )
}

export default GraficoResultado