import React, { Component } from 'react';
import {     
    Card,
    CardBody,
    Row, 
    Col,
    Container,
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
                        <Container>
                            <Row>
                                <Col lg="2" md="5">
                                    <img src={this.props.image} style={{height: "150px",width: "150px"}}></img>
                                </Col>
                                <Col lg="10" md="7">
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
                        </Container>
                    </CardBody>
                </Card> 
                </Col>
            </Row>
		);
	}
}
export default NewsCard;
