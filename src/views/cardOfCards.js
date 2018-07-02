import React, { Component } from 'react';
import consts from '../consts';
import request from 'request';
import CoinCard from './coinCard';
import {
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
            if(err || httpResponse.statusCode == 500)
                window.location.replace(consts.myurl + "500");
            else if(httpResponse.statusCode == 404)
                window.location.replace(consts.myurl + "404");
            else if(httpResponse.statusCode == 200) {
                this.setState({
                    data: JSON.parse(body)
                })
            }
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
                                    key={key}
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
  