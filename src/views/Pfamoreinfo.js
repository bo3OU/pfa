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

import consts from '../consts';
import request from 'request';
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

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
}

function mainChart(){
	return ({
		labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
		datasets: [
			{
				label: 'My First dataset',
				backgroundColor: hexToRgba(brandInfo, 10),
				borderColor: brandInfo,
				pointHoverBackgroundColor: '#fff',
				borderWidth: 2,
				data: data1,
			}
		],
})};

function mainChartOpts(){
  	return ({
		tooltips: {
		enabled: false,
		custom: CustomTooltips,
		intersect: true,
		mode: 'index',
		position: 'nearest',
		callbacks: {
			labelColor: function (tooltipItem, chart) {
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
		}
  })};

function getSmallCard(name, value){
  return (
    <Col sm={12} md className="mb-sm-2 mb-0">
      <div className="text-muted">{name}</div>
      <strong>{value}</strong>
    </Col>
  )
}

export default class Pfamoreinfo extends React.Component {

  coin = this.props.location.pathname.split("/")[2];

  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      data: []
    };
    // this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.getData()
  }

  getData() {
    request.get(consts.url + "api/coin/" + this.coin,function(err, httpResponse, body){
      // check if coin exists before anything
      body = JSON.parse(body);
      if(!err && httpResponse.statusCode == 404)
        window.location.replace(consts.myurl + "404");
      else if(!err && httpResponse.statusCode == 500)
        window.location.replace(consts.myurl + "500");
      else if(!err && httpResponse.statusCode == 200) {
        this.setState({
          id: body.id,
          marketcap : body.marketcap,
          volume: body.volume,
          image: body.image,
          prooftype: body.prooftype,
          algorithm: body.algorithm,
          fullname: body.fullname,
          price: body.price,
          change24: body.change24,
          radioSelected: 1,
        });
      }
      else
        window.location.replace(consts.myurl + "500");
    }.bind(this))

  }

  onRadioBtnClick(number,coin,time) {
    this.setState({
      radioSelected: number,
    })
    request.get( consts.url +'api/hist/'+ coin +'/'+ time +'/',function(error,response,body) {
      if(error) {
        if(this.state.data == []) {
          window.location.replace(consts.myurl + "500");
        }
      }
      body = JSON.parse(body);
      this.setState({
        data: body,
      });
    }.bind(this))
  }

  render() {

    return (
      <div>
        <div className="app"  >
          <Navbar color="light" light expand="sm">
            <Pfaheader />
          </Navbar>


          <main className="main" style={{ backgroundColor: "#ffffff" }} >
            <div className="animated fadeIn">
              <Container style={{ marginTop: "40px" }} >
                <Row>
                  <Col>
                  <Card >
                    <CardHeader>
                      <strong>{this.coin.toUpperCase()}</strong>
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
                                      <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(1,this.coin,"day")} active={this.state.radioSelected === 1}>Day</Button>
                                      <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(2,this.coin,"week")} active={this.state.radioSelected === 2}>Week</Button>
                                      <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(3,this.coin,"month")} active={this.state.radioSelected === 3}>Month</Button>
                                    </ButtonGroup>
                                  </ButtonToolbar>
                                </Col>
                              </Row>
                              <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                                <Line data={mainChart()} options={mainChartOpts()} height={300} />
                              </div>
                            </CardBody>
                            <CardFooter>
                              <Row className="text-center">
                              { getSmallCard("Market Cap",this.state.marketcap)}
                              { getSmallCard("Volume",this.state.volume) }
                              { getSmallCard("Price",parseFloat(this.state.price)) }
                              { getSmallCard("Change in 24H",parseFloat(this.state.change24)) }
                              { getSmallCard("Algorithm",this.state.algorithm) }
                              { getSmallCard("Proof type",this.state.prooftype) }
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