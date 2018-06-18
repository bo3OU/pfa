import React, { Component } from 'react';
import consts from '../consts';
import request from 'request';
import CoinCard from './coinCard';
import {
    Button,
    Card,
    CardBody,
    Col,
    Row,
  } from 'reactstrap';

class cardOfCards extends Component {
    constructor() {
        super();
        
        this.state = {
            data : []
          };
    }
    
    componentDidMount() {
        request(consts.url + "api/mostchanged", function(err, httpResponse, body) {
            console
            this.setState({
                data: JSON.parse(body)
            })
            console.log(this.state.data);
        }.bind(this))
    }

    render() {
        //
        
        return (
            <Row>
                {     
                    this.state.data.map(function(item,key){
                        return (
                            <Col  xs="12" sm="6" lg="3">
                                <CoinCard 
                                    coin={item.name}
                                    price={item.price}
                                    change24={item.change24}
                                    data={[630, 670, 700, 635, 660, 640, 651]}
                                >
                                </CoinCard>
                            </Col>
                        )
                }.bind(this))}
                
            </Row>
        );
    }
}
  
export default cardOfCards;
  