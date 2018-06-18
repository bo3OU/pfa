import React from 'react';
import { Container } from 'reactstrap';
import request from 'request';
import consts from '../consts';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import CoinCard from './coinCard';
import CardOfCards from './cardOfCards';
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

import Pfaheader from './Pfaheader';

  
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