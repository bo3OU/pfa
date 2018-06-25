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
    ButtonDropdown,
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
			page: 1
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
			var data = JSON.parse(body);
			this.setState({          
				favs : data
			})
			}.bind(this)
		);
	}

	getData() {
		request.get(consts.url + "api/coins/data?o="+ this.state.page,function(err, httpResponse, body) {
			var data = JSON.parse(body);
			if(data != ''){
				this.setState({          
					data : data,
					precedent: this.state.page > 1 ? true : false,
					next:this.state.page < 9 ? true : false,
				})
			}
			// if (this.state.data == [] && )
			// check for 500 status :/
			}.bind(this));	
	}

    //async componentDidMount(){
	 componentDidMount(){
		this.getData();
		// try {
		// 	setInterval(async () => {
				this.getData();	
				this.setState({
					dataFull: true
				});
			// }, 1000);
			if (localStorage.getItem("webToken") !== null){
				this.getFavs();
			}
		// } catch(e) {
		// 	console.log(e);
		//}
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
					console.log("requestion refresh query");
					var data = JSON.parse(body);
					this.setState({          
						favs : data
					})
				}
			);
		},1000)
	}

	nextPage() {
		this.setState({
			page:(this.state.page + 1) > 9 ? this.state.page : this.state.page + 1
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
								Coins List
							</CardHeader> 
								<CardBody>
								<Row>
								<Col>
								<ButtonGroup className="float-right">
									<Link to="/pfa">
										<Button  className="page-link" style={{visibility : this.state.precedent ? 'visible' : 'hidden'}} onClick={this.previousPage}> precedent </Button>
									</Link>
									<Link to="/pfa">
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