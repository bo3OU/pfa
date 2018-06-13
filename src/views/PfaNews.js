import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import request from 'request';
import consts from '../consts';
import { AppHeader } from '@coreui/react';
// sidebar nav config
import navigation from '../_nav';
// routes config

import NewsCard from './NewsCard';
// import request from 'request';
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
    Row,
    Table,
  } from 'reactstrap';

import Pfaheader from './Pfaheader';

  
export default class Pfaindex extends Component
{
    constructor(props) {
        super(props);
    
        //this.toggle = this.toggle.bind(this);
    
        this.state = {
          dropdownOpen: false,
          data : [{
                    "name": "",
                    "price": "",
					"marketcap": "Loading",
					"image": "",
					"fullname": "",
					"volume": ""
                }]
        };
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
			request.get(consts.url + "api/news",function(err, httpResponse, body) {
                if(body) {
                    var data = JSON.parse(body);
                    this.setState({          
                        data : data
                    })
                }
			}.bind(this));
        //}, 2000);
      } catch(e) {
        console.log(e);
      }
    //Call THE API 
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
                        {     
                            this.state.data.map(function(item,key){
                                return (
                                    <Row>
                                        <NewsCard url={item.url} title={item.title} overview={item.overview} marketcap={item.marketcap} fullname={item.fullname} image={item.image} key={key}></NewsCard>
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