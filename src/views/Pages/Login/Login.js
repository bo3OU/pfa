import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, UncontrolledAlert, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import request from 'request';
import consts from '../../../consts';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      login: '',
      password: '',
      message:''
    };
  }
  signin() {
    request.post(consts.url + "login", {form:{
      login: this.state.login,
      password: this.state.password
    }}, function (err,httpResponse,body){
      var data = JSON.parse(body);
      this.setState({message: data.error})
      console.log(data);
      if(data.token){
        localStorage.setItem("webToken", data.token)
        console.log(localStorage.getItem("webToken"))
        window.location.replace(consts.myurl + "/pfa");
      }
      
      // if(httpResponse.statusCode == 200) {
      //   console.log("HALLELUJAH");
      //   var token = body.token;
      //   //redirect to login
      //   window.location.replace(consts.myurl + "login");
      // }
    }.bind(this))
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <UncontrolledAlert color="danger" style={{visibility : this.state.message ? 'visible' : 'hidden'}}> 
                      {this.state.message}
                    </UncontrolledAlert>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Login" onChange={event => this.setState({login: event.target.value})}/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" onChange={event => this.setState({password: event.target.value})}/>
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4" onClick={() => this.signin()}>Login</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">Forgot password?</Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Button color="primary" className="mt-3" active href="/register">Register Now!</Button>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
