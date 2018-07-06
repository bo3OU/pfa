import React from 'react';
import { Container } from 'reactstrap';
import request from 'request';
import consts from '../consts';
import TableRow1 from './TableRow1';
import TableHeader1 from './TableHeader1';
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

  
export default class PfaFavs extends React.Component
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
        this.getData = this.getData.bind(this);
	}
	
	getFavs() {
		var options = {
			url: consts.url + "api/fullfavs",
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
                var data = JSON.parse(body);
                this.setState({          
                    data : data.rows,
                    count: data.count,
                    limit: data.limit,
                    precedent: this.state.page > 1 ,
                    next: 	(this.state.page + 1) * this.state.limit < this.state.count ,
                })
			}.bind(this)); 
	}
    //async
     componentDidMount(){
		this.getData();
		//  try {
		//  	setInterval(async () => {
				this.getData();	
				this.setState({
					dataFull: true
				});
			// }, 2000);
			if (localStorage.getItem("webToken") !== null){
				this.getFavs();
			}
		// } catch(e) {
        // }
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
			url: consts.url + "api/fullfavs",
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
							<Card> 
							<CardHeader>	
								Favorites
							</CardHeader> 
								<CardBody>
								<Row>
								<Col>
									<Table hover responsive borderless className="table-outline">
										<TableHeader1></TableHeader1>
										<tbody>		
										{     
											this.state.favs.map(function(item,key){
												return (
													<TableRow1 name={item.name} 
																fav={(this.state.favs.filter(e => e.id == item.id).length > 0) ? "true" : "false"} 
																image={item.image} 
                                                                low={item.low} 
                                                                open={item.open}
                                                                close ={item.close}
                                                                high={item.high}
																marketcap={item.marketcap} 
																fullname={item.fullname} 
																volume={item.volume} 
                                                                id={item.id} 
                                                                change24={item.change24} 
																key={item.id}
																refreshValues={ this.refreshValues }
																>
													</TableRow1>
												)
											}.bind(this))
										}
										</tbody>
									</Table>
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