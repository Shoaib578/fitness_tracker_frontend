import  Axios  from 'axios'
import React from 'react'
import Chart from 'react-apexcharts'
import base_url from '../base_url'
const user = localStorage.getItem('user')
const parse = JSON.parse(user)

export default class Charts extends React.Component {
  state = {
    
    series:[{
      name: "strength",
      data: [
        {
          x:0,
          y:0
        },
        {
          x:30,
          y:20
        }
      ]
    }],
    options: {
      chart: {
        type: 'bar',
        height: 380,
        
        
       
      },
     
  plotOptions: {
    bar: {
        
        borderRadius: 0,
        borderRadiusApplication: 'around',
        borderRadiusWhenStacked: 'last',
        columnWidth: '85%',
       
    }
},

    
    
      xaxis: {
        type: 'time in minutes',
       
        group: {
          style: {
            fontSize: '10px',
            fontWeight: 700,
           
           
          },
          
        }
      },
      title: {
          text: 'Fitness Sessions  Analysis',
      },
     
    },
  
  
  }


  get_chart_data = ()=>{
    let temp_data = [{
      x:0,
      y:0
     }]
     this.props.sessions?.map(session=>{
      
        temp_data.push(...temp_data,{
          x:session.workout_length,
          y:session.strength
        })

      })
      
      this.setState({
        series:[{
          name: "strength",
          data: temp_data
        }]
      })

  }

  
    componentDidMount(){
      setTimeout(()=>{
        this.get_chart_data()

      },300)
      
      

    
    }
  

  render(){
    
    return <Chart options={this.state.options}  series={this.state?.series}  type="bar" width={'90%'} height={520} />

  }
 
 
  
}