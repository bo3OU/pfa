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

// Card Chart 2
const cardChartData2 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Price',
        backgroundColor: brandSuccess,
        borderColor: 'rgba(255,255,255,.55)',
        data: [1, 18, 9, 17, 34, 22, 11],
      },
    ],
  };


  const cardChartOpts2 = {
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
            min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
            max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5,
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
  };
  

  // Card Chart 1
const cardChartData1 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Price',
        backgroundColor: brandDanger,
        borderColor: 'rgba(255,255,255,.55)',
        data: [1, 18, 9, 17, 34, 22, 11],
      },
    ],
  };


  const cardChartOpts1 = {
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
            min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
            max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5,
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
  };
  
export default class Pfaindex extends React.Component
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
                        <Container style = {{marginTop: 40 + "px"}} >
                        <Row>
                        <Col>
                        <Card >  
                        <CardHeader>
                            Top Movers
                        </CardHeader>
                            <CardBody>
                            <Row>
                            <Col xs="12" sm="6" lg="3">
                            <Card className="text-white bg-danger">
                            <CardBody className="pb-0">
                            <ButtonGroup className="float-right">
                                <ButtonDropdown id='card1' isOpen={this.state.card1} toggle={() => { this.setState({ card1: !this.state.card1 }); }}>
                                <DropdownToggle caret className="p-0" color="transparent">
                                    <i className="icon-settings"></i>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>Action</DropdownItem>
                                    <DropdownItem>Another action</DropdownItem>
                                    <DropdownItem disabled>Disabled action</DropdownItem>
                                    <DropdownItem>Something else here</DropdownItem>
                                </DropdownMenu>
                                </ButtonDropdown>
                            </ButtonGroup>
                            <div className="text-value">93.854</div>
                            <div>Members online</div>
                            </CardBody>
                            <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                            <Line data={cardChartData1} options={cardChartOpts1} height={70} />
                            </div>
                            </Card>
                            </Col>
                            <Col   xs="12" sm="6" lg="3">
                            <Card className="text-white bg-success">
                            <CardBody className="pb-0">
                            <ButtonGroup className="float-right">
                                <ButtonDropdown id='card1' isOpen={this.state.card1} toggle={() => { this.setState({ card1: !this.state.card1 }); }}>
                                <DropdownToggle caret className="p-0" color="transparent">
                                    <i className="icon-settings"></i>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>Action</DropdownItem>
                                    <DropdownItem>Another action</DropdownItem>
                                    <DropdownItem disabled>Disabled action</DropdownItem>
                                    <DropdownItem>Something else here</DropdownItem>
                                </DropdownMenu>
                                </ButtonDropdown>
                            </ButtonGroup>
                            <div className="text-value">93.854</div>
                            <div>Members online</div>
                            </CardBody>
                            <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                            <Line data={cardChartData2} options={cardChartOpts2} height={70} />
                            </div>
                            </Card>
                            </Col>
                            <Col  xs="12" sm="6" lg="3">
                            <Card className="text-white bg-danger">
                            <CardBody className="pb-0">
                            <Button className="float-right btn-danger">
                                    <i className="icon-heart"></i>
                            </Button>
                            <div className="text-value">AAPL</div>
                            <div>+ 3.56 %</div>
                            </CardBody>
                            <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                            <Line data={cardChartData1} options={cardChartOpts1} height={70} />
                            </div>
                            </Card>
                            </Col>
                            <Col xs="12" sm="6" lg="3">
                            <Card className="text-white bg-success">
                            <CardBody className="pb-0">
                            <ButtonGroup className="float-right">
                                <ButtonDropdown id='card1' isOpen={this.state.card1} toggle={() => { this.setState({ card1: !this.state.card1 }); }}>
                                <DropdownToggle caret className="p-0" color="transparent">
                                    <i className="icon-settings"></i>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>Action</DropdownItem>
                                    <DropdownItem>Another action</DropdownItem>
                                    <DropdownItem disabled>Disabled action</DropdownItem>
                                    <DropdownItem>Something else here</DropdownItem>
                                </DropdownMenu>
                                </ButtonDropdown>
                            </ButtonGroup>
                            <div className="text-value">93.854</div>
                            <div>Members online</div>
                            </CardBody>
                            <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                            <Line data={cardChartData2} options={cardChartOpts2} height={70} />
                            </div>
                            </Card>
                            </Col>
                            </Row>
                            </CardBody>
                            
                            </Card>  
                            </Col>
                        </Row>
                            <Row>
                            <Col>
                            <Card> 
                            <CardHeader>
                                Watchlist
                            </CardHeader> 
                                <CardBody>
                                <Table hover responsive borderless className="table-outline">
                                    <thead className="thead-light">
                                        <tr>
                                           {/*<th className="text-center"><i className="icon-people"></i></th>*/} 
                                            <th className="text-center" >Name</th>
                                            <th>Price</th>
                                            <th className="text-center" >Change</th>
                                            <th>Change%</th>
                                            <th className="text-center" >Volume</th>
                                            <th >Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <tr className="clickable-row" >
                                    <td className="text-center" ><strong>AAPL</strong>
                                    </td>
                                    <td> <div> 5426.356 </div>
                                    </td>
                                    <td className="text-center"> <div> 5.65 </div>
                                    </td>
                                    <td> <strong><div style={{ color : '#228B22' }} > + 2.01</div></strong>
                                    </td>
                                    <td className="text-center">
                                        <i className="fa fa-cc-mastercard" style={{ fontSize: 24 + 'px' }}></i>
                                    </td>
                                    <td>
                                        <div className="small" >5 minutes ago</div>
                                    </td>
                                    </tr>

                                    <tr>
                                    <td className="text-center" ><strong>AAPL</strong>
                                    </td>
                                    <td> <div> 5426.356 </div>
                                    </td>
                                    <td className="text-center"> <div> 5.65 </div>
                                    </td>
                                    <td> <strong><div style={{ color : '#228B22' }} > + 2.01</div></strong>
                                    </td>
                                    <td className="text-center">
                                        <i className="fa fa-cc-mastercard" style={{ fontSize: 24 + 'px' }}></i>
                                    </td>
                                    <td>
                                        <div className="small" >5 minutes ago</div>
                                    </td>
                                    </tr>
                                    <tr>
                                    <td className="text-center" ><strong>AAPL</strong>
                                    </td>
                                    <td> <div> 5426.356 </div>
                                    </td>
                                    <td className="text-center"> <div> 5.65 </div>
                                    </td>
                                    <td> <strong><div style={{ color : '#228B22' }} > + 2.01</div></strong>
                                    </td>
                                    <td className="text-center">
                                        <i className="fa fa-cc-mastercard" style={{ fontSize: 24 + 'px' }}></i>
                                    </td>
                                    <td>
                                        <div className="small" >5 minutes ago</div>
                                    </td>
                                    </tr>
                                    <tr>
                                    <td className="text-center" ><strong>AAPL</strong>
                                    </td>
                                    <td> <div> 5426.356 </div>
                                    </td>
                                    <td className="text-center"> <div> 5.65 </div>
                                    </td>
                                    <td> <strong><div style={{ color : '#228B22' }} > + 2.01</div></strong>
                                    </td>
                                    <td className="text-center">
                                        <i className="fa fa-cc-mastercard" style={{ fontSize: 24 + 'px' }}></i>
                                    </td>
                                    <td>
                                        <div className="small" >5 minutes ago</div>
                                    </td>
                                    </tr>
                                    <tr>
                                    <td className="text-center" ><strong>AAPL</strong>
                                    </td>
                                    <td> <div> 5426.356 </div>
                                    </td>
                                    <td className="text-center"> <div> 5.65 </div>
                                    </td>
                                    <td> <strong><div style={{ color : '#228B22' }} > + 2.01</div></strong>
                                    </td>
                                    <td className="text-center">
                                        <i className="fa fa-cc-mastercard" style={{ fontSize: 24 + 'px' }}></i>
                                    </td>
                                    <td>
                                        <div className="small" >5 minutes ago</div>
                                    </td>
                                    </tr>
                                    <tr>
                                    <td className="text-center" ><strong>AAPL</strong>
                                    </td>
                                    <td> <div> 5426.356 </div>
                                    </td>
                                    <td className="text-center"> <div> 5.65 </div>
                                    </td>
                                    <td> <strong><div style={{ color : '#228B22' }} > + 2.01</div></strong>
                                    </td>
                                    <td className="text-center">
                                        <i className="fa fa-cc-mastercard" style={{ fontSize: 24 + 'px' }}></i>
                                    </td>
                                    <td>
                                        <div className="small" >5 minutes ago</div>
                                    </td>
                                    </tr>
                                    </tbody>
                                </Table>
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