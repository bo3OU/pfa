import React from 'react';
import { Container } from 'reactstrap';
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
  Col,
  Navbar,
  Row,
} from 'reactstrap';

import { Line } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';

import consts from '../consts';
import request from 'request';
import Pfaheader from './Pfaheader';
const brandInfo = getStyle('--info')

function mainChart(labels,data){
  console.log(labels.length);
	return ({
    labels: labels,
    datasets: [
			{
				label: 'Price :',
				backgroundColor: hexToRgba(brandInfo, 10),
				borderColor: brandInfo,
				pointHoverBackgroundColor: '#fff',
				borderWidth: 2,
				data: data,
			}
		],
})};

function mainChartOpts(min,max){
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
				beginAtZero: false,
				maxTicksLimit: 100,
				stepSize: Math.ceil((max -min)/ 10),
				min: min - (max - min) / 20,
				max: max + (max - min) / 20,
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
      data: [],
      labels: [],
	  prices:[],
	  fav: false,
	};
	this.changeStatus = this.changeStatus.bind(this);
    // this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.getData()
  }

  	getData() {
		request.get(consts.url + "api/coin/" + this.coin,function(err, httpResponse, body){
			if(err || httpResponse.statusCode == 500)
				window.location.replace(consts.myurl + "500");
			else if(httpResponse.statusCode == 404)
				window.location.replace(consts.myurl + "404");
			else if(httpResponse.statusCode == 200) {
				body = JSON.parse(body);
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
		this.onRadioBtnClick(1,this.coin,"hour")
  	}

  	onRadioBtnClick(number,coin,time) {
    this.setState({
      radioSelected: number,
    })
    request.get( consts.url +'api/hist/'+ coin +'/'+ time +'/',function(err,httpResponse,body) {

        if(err || httpResponse.statusCode == 500)
            window.location.replace(consts.myurl + "500");
        else if(httpResponse.statusCode == 404)
            window.location.replace(consts.myurl + "404");
        else if(httpResponse.statusCode == 200) {
            body = JSON.parse(body);

            var prices = [];
            var labels = [];


            body.forEach(v => {
                prices.push(v.close)
                labels.push(v.time)
            });

            var minValue= Math.min.apply(Math,prices);
            var maxValue= Math.max.apply(Math,prices);

            this.setState({
                prices: prices,
                labels: labels,
                min: minValue,
                max: maxValue,
            });
        }
    }.bind(this))
  	}

  	changeStatus() {
		if (localStorage.getItem("webToken") !== null) {
			if(!this.state.fav) {
					//add favorite
					var options = {
						url: consts.url + "api/fav/"+this.state.id ,
						headers: {
							'Authorization': "Bearer " + localStorage.getItem("webToken")
						}
					};
					request.post(options,function(err, httpResponse, body) {
                        if(err || httpResponse.statusCode == 500)
                            window.location.replace(consts.myurl + "500");
                        else if(httpResponse.statusCode == 404)
                            window.location.replace(consts.myurl + "404");
                        else if(httpResponse.statusCode == 200) {
                            var data = JSON.parse(body);
                            if(data.created == true)
                            {
                                this.setState({
                                    fav: true	
                                })
                            }
                        }
						//test if it was really created
						}.bind(this)
					);

			} else {
				//delete favorite
				var options = {
					url: consts.url + "api/fav/"+this.state.id ,
					headers: {
						'Authorization': "Bearer " + localStorage.getItem("webToken")
					}
				};
				request.delete(options,function(err, httpResponse, body) {
                    if(err || httpResponse.statusCode == 500)
                        window.location.replace(consts.myurl + "500");
                    else if(httpResponse.statusCode == 404)
                        window.location.replace(consts.myurl + "404");
                    else if(httpResponse.statusCode == 200) {
                        var data = JSON.parse(body);
                        if(data.destroyed == true) {
                            this.setState({
                                fav: false	
                            })
                        }
                    }
					}.bind(this)
				);
				this.setState({
					fav: false
				})
			}
		} else {
			// TODO send to login
			window.location.replace(consts.myurl + "login");
		}
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
									<Button className={ this.state.fav == true ? "btn-danger float-right" : "btn-light float-right"} onClick={() => { this.changeStatus() }}>
										<i className="fa fa-heart"></i>
									</Button>
                                  	<ButtonToolbar className="float-right" aria-label="Toolbar with button groups">
										<ButtonGroup className="mr-3" aria-label="First group">
											<Button color="outline-secondary" onClick={() => this.onRadioBtnClick(1,this.coin,"hour")} active={this.state.radioSelected === 1}>Hour</Button>
											<Button color="outline-secondary" onClick={() => this.onRadioBtnClick(2,this.coin,"day")} active={this.state.radioSelected === 2}>Day</Button>
											<Button color="outline-secondary" onClick={() => this.onRadioBtnClick(3,this.coin,"week")} active={this.state.radioSelected === 3}>Week</Button>
											<Button color="outline-secondary" onClick={() => this.onRadioBtnClick(4,this.coin,"month")} active={this.state.radioSelected === 4}>Month</Button>
											<Button color="outline-secondary" onClick={() => this.onRadioBtnClick(5,this.coin,"year")} active={this.state.radioSelected === 5}>Year</Button>
										</ButtonGroup>
                                    </ButtonToolbar>
                                </Col>
                              </Row>
                              <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                                <Line data={mainChart(this.state.labels,this.state.prices)} options={mainChartOpts(this.state.min,this.state.max)} height={300} />
                              </div>
                            </CardBody>
                            <CardFooter>
                              <Row className="text-center">
                              { getSmallCard("Market Cap",this.state.marketcap)}
                              { getSmallCard("Volume",this.state.volume) }
                              { getSmallCard("Price",parseFloat(this.state.price).toString()) }
                              { getSmallCard("Change in 24H",parseFloat(this.state.change24).toString()) }
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