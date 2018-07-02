import React, { Component } from 'react';
import { Container } from 'reactstrap';
import request from 'request';
import consts from '../consts';
import { Link } from 'react-router-dom'
import NewsCard from './NewsCard';
// import request from 'request';
import {
    Button,
    ButtonGroup,
    Navbar,
    Row,
    Col,    
  } from 'reactstrap';

import Pfaheader from './Pfaheader';

  
export default class PfaNews extends Component
{
    constructor(props) {
        super(props);
        this.nextPage = this.nextPage.bind(this);
		this.previousPage = this.previousPage.bind(this);    
        this.state = {
          dropdownOpen: false,
          precedent: false,
          next: true,
          page: 1,
          limit: 20,
          count: 100,
          data : [],
        };
    }

    getData () {
        request.get(consts.url + "api/news?o="+ this.state.page,function(err, httpResponse, body) {
            if(err || httpResponse.statusCode == 500)
                window.location.replace(consts.myurl + "500");
            else if(httpResponse.statusCode == 404)
                window.location.replace(consts.myurl + "404");
            else if(httpResponse.statusCode == 200) {
                var data = JSON.parse(body);
                console.log(this.state.count);
                this.setState({          
                    data : data.rows,
                    count: data.count,
                    limit: data.limit,
                    precedent: this.state.page > 1 ? true : false,
					next: 	((this.state.page + 1) * this.state.limit < this.state.count) ? true : false,
                })
            }
        }.bind(this));
    }
    //async componentDidMount(){
    componentDidMount(){
      try {
        //setInterval(async () => {
        this.getData()
        //}, 2000);
      } catch(e) {
        console.log(e);
      }
    //Call THE API 
    }

	nextPage() {
		this.setState({
            //page:(this.state.page + 1) * this.state.limit > this.state.count ? this.state.page : this.state.page + 1
            page:this.state.page + 1
		},() => { this.getData(); })	
	}

	previousPage() {
		this.setState({
            //page:(this.state.page - 1) < 1 ? this.state.page : this.state.page - 1
            page:this.state.page - 1
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
                        <Row >
                            <Col lg="9">
                            </Col>
                            <Col lg="3" style = {{marginBottom: 40 + "px"}}>
                                <ButtonGroup className="float-right">
                                    <Link to="/news">
                                        <Button  className="page-link" style={{visibility : this.state.precedent ? 'visible' : 'hidden'}} onClick={this.previousPage}> precedent </Button>
                                    </Link>
                                    <Link to="/news">
                                        <Button className="page-link" style={{visibility : this.state.next ? 'visible' : 'hidden'}} onClick={this.nextPage}> next</Button>
                                    </Link>
                                </ButtonGroup>
                            </Col>
                        </Row>
                        {     
                            this.state.data.map(function(item,key){
                                return (
                                    <Row>
                                        <NewsCard url={item.url} title={item.title} overview={item.overview} marketcap={item.marketcap} fullname={item.fullname} image={item.image} key={item.id}></NewsCard>
                                    </Row>
                                )
                        })}
                        </Container>
                        </div>
                    </main>
                   
                </div>
            </div>
        );
    }
}