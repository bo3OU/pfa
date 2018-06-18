import React, { Component } from 'react';
import consts from '../consts';
import request from 'request';
import { Line } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities';
import './cardCoin.css';

import {
    Button,
    Card,
    CardBody,
  } from 'reactstrap';

const brandSuccess = getStyle('--success')
const brandDanger = getStyle('--danger')

    // Card Chart 1
    function cardChartData1(change,data) {
        return {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
            {
                label: 'Price',
                backgroundColor: (parseFloat(change) > 0 ? brandSuccess:brandDanger),
                borderColor: 'rgba(255,255,255,.55)',
                data: data,
            },
            ],
        }
    }


  function cardChartOpts1 (data) {
    return{
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            color: 'transparent',
            zeroLineColor: 'transparent',
          },
          ticks: {
            fontSize: 2,
            fontColor: 'transparent',
          },
  
        }],
      yAxes: [
        {
          display: false,
          ticks: {
            display: false,
            min: Math.min.apply(Math, cardChartData1(0,data).datasets[0].data) - 5,
            max: Math.max.apply(Math, cardChartData1(0,data).datasets[0].data) + 5,
          },
        }],
    },
    elements: {
      line: {
        tension: 0.2,
        borderWidth: 1,
      },
      point: {
        radius: 0,
        hitRadius: 0,
        hoverRadius: 0,
      },
    },
  }};
  

class coinCard extends Component {
    constructor() {
        super();
        this.link = this.link.bind(this);
        console.log("at least called"); 
        this.state = ({
          data: []
        })
    }

    getData() {
      request.get('',function(err,request, body) {
        var data = JSON.parse(body);
        this.setState({
          data: data
        })
      }.bind(this))
    }

    link() {
        window.location.replace(consts.myurl + "coin/" + this.props.coin);
    }

    render() {
        //
        return (
            <Card className={(parseFloat(this.props.change24) > 0 ? "bg-success":"bg-danger") + " text-white CardPointer"} onClick={this.link}>
                <CardBody className="pb-0">
                    <div className=" float-right"> { this.props.price } </div>
                    <div className="text-value"> { this.props.coin } </div>
                    <div>{(parseFloat(this.props.change24) > 0 ? "+ " + this.props.change24 : "- " + this.props.change24.substr(1)) } %</div>
                </CardBody>
                <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                    <Line data={cardChartData1(this.props.change24,this.props.data)} options={cardChartOpts1(this.props.data)} height={70} />
                </div>
            </Card>
        );
    }
}
  
export default coinCard;
  