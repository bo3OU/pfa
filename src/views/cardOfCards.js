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
            <Col  xs="12" sm="6" lg="3">
                <CoinCard
                    coin="SBTC"
                    price="6.5"
                    change24="-14.47"
                    data={[7.66,8.99,7.66,7.66,7.66,6.5,6.5]}
                    key={1}
                >
                </CoinCard>
            </Col>
            <Col  xs="12" sm="6" lg="3">
                <CoinCard
                    coin="GO"
                    price="0.09817"
                    change24="23.57"
                    data={[11.93, 11.52, 12.62, 13.61, 13.79, 13.73, 13.83]}
                    key={3}
                >
                </CoinCard>
            </Col>


            <Col  xs="12" sm="6" lg="3">
                <CoinCard
                    coin="RCT"
                    price="0.0001017"
                    change24="-10.95"
                    data={[11.57, 11.12, 10.63, 11.00, 10.56, 9.69, 10.57]}
                    key={4}
                >
                </CoinCard>
            </Col>
            <Col  xs="12" sm="6" lg="3">
                <CoinCard
                    coin="KICK"
                    price="0.063"
                    change24="22.04"
                    data={[5.2,5.2,5.2,5.2,6.3,6.3,6.3]}
                    key={2}
                >
                </CoinCard>
            </Col>

            </Row>
        );
    }
}
  
export default cardOfCards;
  