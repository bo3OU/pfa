import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import { AppHeader } from '@coreui/react';
// sidebar nav config
import navigation from '../_nav';
// routes config

import {
    Badge,
    Button,
    ButtonDropdown,
    ButtonGroup,
    ButtonToolbar,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Navbar,
    Progress,
    Row,
    Table,
  } from 'reactstrap';

import { Line } from 'react-chartjs-2';
import DefaultHeader from '../containers/DefaultLayout/DefaultHeader';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';

import Pfaheader from './Pfaheader';
const brandSuccess = getStyle('--success')
const brandDanger = getStyle('--danger')
const brandInfo = getStyle('--info')

//Random Numbers
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  var elements = 27;
  var data1 = [];
  var data2 = [];
  var data3 = [];
  
  for (var i = 0; i <= elements; i++) {
    data1.push(random(50, 200));
    data2.push(random(80, 100));
    data3.push(65);
  }

const mainChart = {
    labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: hexToRgba(brandInfo, 10),
        borderColor: brandInfo,
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: data1,
      },
      {
        label: 'My Second dataset',
        backgroundColor: 'transparent',
        borderColor: brandSuccess,
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: data2,
      },
      {
        label: 'My Third dataset',
        backgroundColor: 'transparent',
        borderColor: brandDanger,
        pointHoverBackgroundColor: '#fff',
        borderWidth: 1,
        borderDash: [8, 5],
        data: data3,
      },
    ],
  };
  
  const mainChartOpts = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
      intersect: true,
      mode: 'index',
      position: 'nearest',
      callbacks: {
        labelColor: function(tooltipItem, chart) {
          return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
        }
      }
    },
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            drawOnChartArea: false,
          },
        }],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 5,
            stepSize: Math.ceil(250 / 5),
            max: 250,
          },
        }],
    },
    elements: {
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      },
    },
  };
export default class Pfamoreinfo extends React.Component
{
    constructor(props) {
        super(props);
    
        //this.toggle = this.toggle.bind(this);
    
        this.state = {
          dropdownOpen: false,
          data : []
        };
    }
    getCard() {
        return (
            <div></div>
        )
    }
    render () {
        
        return (
            <div>
                <div className="app">
                    <Navbar color="light" light expand="sm">
                        <Pfaheader />
                    </Navbar>
                    
                  
                    <main className="main">
                        <div className="animated fadeIn">
                        <Container style = {{marginTop: "40px"}} >
                        <Row>
                        <Col>
                        <Card >  
                        <CardHeader>
                            <strong>BTC</strong>
                        </CardHeader>
                            <CardBody>
                            <Row>
                            <Col>
                              <Card>
                                <CardBody>
                                  <Row>
                                    <Col sm="5">

                                    </Col>
                                    <Col sm="7" className="d-none d-sm-inline-block">
                                      <Button color="danger" className="float-right"><i className="fa fa-heart"></i></Button>
                                      <ButtonToolbar className="float-right" aria-label="Toolbar with button groups">
                                        <ButtonGroup className="mr-3" aria-label="First group">
                                          <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(1)} active={this.state.radioSelected === 1}>Day</Button>
                                          <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(2)} active={this.state.radioSelected === 2}>Month</Button>
                                          <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(3)} active={this.state.radioSelected === 3}>Year</Button>
                                        </ButtonGroup>
                                      </ButtonToolbar>
                                    </Col>
                                  </Row>
                                  <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                                    <Line data={mainChart} options={mainChartOpts} height={300} />
                                  </div>
                                </CardBody>
                                <CardFooter>
                                  <Row className="text-center">
                                    <Col sm={12} md className="mb-sm-2 mb-0">
                                      <div className="text-muted">Market Cap</div>
                                      <strong>29.703 Users (40%)</strong>
                                      <Progress className="progress-xs mt-2" color="success" value="40" />
                                    </Col>
                                    <Col sm={12} md className="mb-sm-2 mb-0">
                                      <div className="text-muted">Volume 24h</div>
                                      <strong>24.093 Users (20%)</strong>
                                      <Progress className="progress-xs mt-2" color="info" value="20" />
                                    </Col>
                                    <Col sm={12} md className="mb-sm-2 mb-0">
                                      <div className="text-muted">Circulating supply</div>
                                      <strong>78.706 Views (60%)</strong>
                                      <Progress className="progress-xs mt-2" color="warning" value="60" />
                                    </Col>
                                    <Col sm={12} md className="mb-sm-2 mb-0">
                                      <div className="text-muted">Max supply</div>
                                      <strong>22.123 Users (80%)</strong>
                                      <Progress className="progress-xs mt-2" color="danger" value="80" />
                                    </Col>
                                    <Col sm={12} md className="mb-sm-2 mb-0">
                                      <div className="text-muted">First Announced</div>
                                      <strong>Average Rate (40.15%)</strong>
                                      <Progress className="progress-xs mt-2" color="primary" value="40" />
                                    </Col>
                                  </Row>
                                </CardFooter>
                              </Card>
                            </Col>
                          </Row>
                            </CardBody>
                            
                            </Card>  
                            </Col>
                        </Row>
                        </Container>
                        </div>
                    </main>
                   
                </div>
            </div>
        );
    }
}