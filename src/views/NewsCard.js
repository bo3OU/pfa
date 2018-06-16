import React, { Component } from 'react';
import {     
    Card,
    CardBody,
    Row, 
    Col,
} from 'reactstrap';


class NewsCard extends Component {
  	constructor(props) {
		super(props)
		this.state = {
			searchValue: ""
		}
  	}

	render() {
		return (
            // { this.props.title }
            // { this.props.url }
            // { this.props.image }
            // { this.props.body }
            // { this.props.overview }
            <Row>
            <Col xs="12" sm="12" lg="12">
                <Card>
                    <CardBody>
                        <Row>
                            <Col lg="3">
                            <img src={this.props.image}></img>
                            </Col>
                            <Col lg="9">
                                <Row>
                                    <strong>
                                        <a href={this.props.url}>{ this.props.title }</a> 
                                    </strong>
                                </Row>
                                <Row>
                                    { this.props.overview }
                                </Row>
                            </Col>
                        </Row>
                    </CardBody>
                </Card> 
                </Col>
            </Row>
		);
	}
}
export default NewsCard;
