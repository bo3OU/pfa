import React from 'react';
import { Container } from 'reactstrap';
import request from 'request';
import consts from '../consts';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import CoinCard from './coinCard';
// import request from 'request';
import {
    Button,
    ButtonDropdown,
    ButtonGroup,
    Card,
    CardBody,
    CardHeader,
    Col,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Navbar,
    Row,
    Table,
  } from 'reactstrap';

import { Line } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities';

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
        this.state = {
		  data : [],
		  favs: [],
          dataFull : false
		};
		this.refreshValues = this.refreshValues.bind(this);
	}
	
    getCard() {
        return (
            <div></div>
        )
	}
	
    //async componentDidMount(){
    componentDidMount(){
		try {
			//setInterval(async () => {
				request.get(consts.url + "api/coin/data",function(err, httpResponse, body) {
					var data = JSON.parse(body);
					this.setState({          
						data : data
					})
					this.setState({dataFull: false});
					}.bind(this)
				);
							//}, 10000);
				if (localStorage.getItem("webToken") !== null){
					var options = {
						url: consts.url + "api/favs",
						headers: {
							'Authorization': "Bearer " + localStorage.getItem("webToken")
						}
					};
					request.get(options,function(err, httpResponse, body) {
						var data = JSON.parse(body);
						this.setState({          
							favs : data
						})
						}.bind(this)
					);
				}
		} catch(e) {
			console.log(e);
		}
	}

    loadingSpinner() {
		if (this.state.dataFull)
		return (
			<div>
				<strong>LOL</strong>
			</div>
		);
		else {
			return (
				<div>
					
				</div>
			);
		}
    }

    refreshValues() {
		console.log("refresing values");
		var options = {
			url: consts.url + "api/favs",
			headers: {
			'Authorization': "Bearer " + localStorage.getItem("webToken")
			}
		};
		setTimeout(() => {
			request.get(options,(err, httpResponse, body) => {	
					console.log("requestion refresh query");
					var data = JSON.parse(body);
					this.setState({          
						favs : data
					})
				}
			);
		},1000)
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
								<Col  xs="12" sm="6" lg="3">
									<CoinCard 
										coin={"IOS"}
										price={"6500"}
										change24={"-38.54"}
										data={[630, 670, 600, 635, 660, 640, 651]}>
									</CoinCard>
								</Col>
								<Col  xs="12" sm="6" lg="3">
									<CoinCard 
										coin={"BTC"}
										price={"6500"}
										change24={"3.54"}
										data={[630, 670, 600, 635, 660, 640, 651]}>
									</CoinCard>
								</Col>
								<Col  xs="12" sm="6" lg="3">
									<CoinCard 
										coin={"ETH"}
										price={"6500"}
										change24={"-3.54"}
										data={[630, 670, 600, 635, 660, 640, 651]}>
									</CoinCard>
								</Col>
								<Col  xs="12" sm="6" lg="3">
									<CoinCard 
										coin={"FUK"}
										price={"2500"}
										change24={"3.54"}
										data={[630, 670, 700, 635, 660, 640, 651]}>
									</CoinCard>
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
                                Coins List
                            </CardHeader> 
                                <CardBody>
                                <Table hover responsive borderless className="table-outline">
                                    <TableHeader></TableHeader>
                                    <tbody>		
                                   {     
                                        this.state.data.map(function(item,key){
                                            return (
												<TableRow name={item.name} 
															fav={(this.state.favs.filter(e => e.id == item.id).length > 0) ? "true" : "false"} 
															image={item.image} 
															price={item.price} 
															marketcap={item.marketcap} 
															fullname={item.fullname} 
															volume={item.volume} 
															id={item.id} 
															key={item.id}
															refreshValues={ this.refreshValues }
															>
												</TableRow>
                                            )
                                    }.bind(this))}
                                    </tbody>
                                </Table>
                                { this.loadingSpinner()}
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