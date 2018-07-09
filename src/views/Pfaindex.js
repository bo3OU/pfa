import React from 'react';
import { Container } from 'reactstrap';
import request from 'request';
import consts from '../consts';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import ReactLoading	from 'react-loading';
import CardOfCards from './cardOfCards';
import { Link } from 'react-router-dom'

// import request from 'request';
import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardHeader,
    Col,
    Navbar,
    Row,
    Table,
  } from 'reactstrap';

import Pfaheader from './Pfaheader';

import {Pie} from 'react-chartjs-2';

const pie = {
    labels: [
      'Bitcoin',
      'Ethereum',
      'Bitcoin Cash',
      'Litecoin',
      'Ripple',
      'Dash',
      'NEM',
      'Monero',
      'IOTA',
      'NEO',
      'Others',

    ],
    datasets: [
      {
        data: [42.78,
             17.78,
             4.71,
             1.72,
             6.84,
             0.70,
             0.60,
             0.83,
             1.09,
             0.89,
             22.06],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF6384',
          '#36A2EB'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384',
            '#36A2EB'
        ],
      }],
  };

export default class Pfaindex extends React.Component
{
    constructor(props) {
        super(props);    
        this.state = {
			data : [],
			favs: [],
			dataFull : false,
			precedent: false,
			next: true,
			page: 1,
			limit: 100,
		};
		this.refreshValues = this.refreshValues.bind(this);
		this.nextPage = this.nextPage.bind(this);
		this.previousPage = this.previousPage.bind(this);
	}
	
	getFavs() {
		var options = {
			url: consts.url + "api/favs",
			headers: {
				'Authorization': "Bearer " + localStorage.getItem("webToken")
			}
		};
		request.get(options,function(err, httpResponse, body) {
            if(err || httpResponse.statusCode == 500)
                window.location.replace(consts.myurl + "500");
            else if(httpResponse.statusCode == 404)
                window.location.replace(consts.myurl + "404");
            else if(httpResponse.statusCode == 200) {
                var data = JSON.parse(body);
                this.setState({          
                    favs : data
                })
            }
		}.bind(this)
		);
	}

	getData() {
        
		request.get(consts.url + "api/coins/data?o="+ this.state.page,function(err, httpResponse, body) {
            if(err || httpResponse.statusCode == 500)
                if(this.state.data.length == 0)
                    window.location.replace(consts.myurl + "500");
            else if(httpResponse.statusCode == 404)
                window.location.replace(consts.myurl + "404");
            else if(httpResponse.statusCode == 200) {
			    var data = JSON.parse(body);
                this.setState({          
                    data : data.rows,
                    count: data.count,
                    limit: data.limit,
                    precedent: this.state.page > 1 ,
                    next: 	(this.state.page + 1) * this.state.limit < this.state.count ,
                })
            }
			}.bind(this)); 
	}

    async componentDidMount(){
		this.getData();
		 try {
		 	setInterval(async () => {
				this.getData();	
				this.setState({
					dataFull: true
				});
			}, 2000);
			if (localStorage.getItem("webToken") !== null){
				this.getFavs();
			}
		} catch(e) {
        }
	}

    loadingSpinner() {
		if (this.state.dataFull == false)
		return (
			<div>
				<center><ReactLoading type="bars" color="#1B2" /></center>
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
		var options = {
			url: consts.url + "api/favs",
			headers: {
			'Authorization': "Bearer " + localStorage.getItem("webToken")
			}
		};
		setTimeout(() => {
			request.get(options,(err, httpResponse, body) => {
                if(err || httpResponse.statusCode == 500)
                    window.location.replace(consts.myurl + "500");
                else if(httpResponse.statusCode == 404)
                    window.location.replace(consts.myurl + "404");
                else if(httpResponse.statusCode == 200) {
                    var data = JSON.parse(body);
                    this.setState({          
                        favs : data
                    })
                }
            });
		},1000)
	}

	nextPage() {
		this.setState({
			page:(this.state.page + 1) * this.state.limit > this.state.count ? this.state.page : this.state.page + 1
		},() => { this.getData(); })	
	}

	previousPage() {
		this.setState({
			page:(this.state.page - 1) < 1 ? this.state.page : this.state.page - 1
		},() => { this.getData(); })	
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
									{/*the top movers cards displayed here*/}
									<CardOfCards></CardOfCards>
								</CardBody>
								</Card>  
							</Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card>
                                    <CardHeader>
                                        Market Cap dominance
                                    <div className="card-header-actions">
                                        <a href="http://www.chartjs.org" className="card-header-action">
                                        <small className="text-muted">docs</small>
                                        </a>
                                    </div>
                                    </CardHeader>
                                    <CardBody>
                                    <div className="chart-wrapper">
                                        <Pie data={pie} />
                                    </div>
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
								<Row>
								<Col>
									<ButtonGroup className="float-right">
										<Link to="/">
											<Button  className="page-link" style={{visibility : this.state.precedent ? 'visible' : 'hidden'}} onClick={this.previousPage}> precedent </Button>
										</Link>
										<Link to="/">
											<Button className="page-link" style={{visibility : this.state.next ? 'visible' : 'hidden'}} onClick={this.nextPage}> next</Button>
										</Link>
									</ButtonGroup>
								</Col>
								</Row>
								<Row>
								<Col>
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
											}.bind(this))
										}
										</tbody>
									</Table>
								</Col>
								</Row>
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