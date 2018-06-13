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
                <Card>
                    <CardBody>
                        <Row>
                            <Col>
                                <img />
                            </Col>
                            <Col>
                                <Row>
                                    salam
                                </Row>
                                <Row>
                                    <strong>
                                    { this.props.url }
                                    </strong>
                                </Row>
                                <Row>
                                    something
                                </Row>
                            </Col>
                        </Row>
                    </CardBody>
                </Card> 
            </Row>
		);
	}
}
export default NewsCard;
