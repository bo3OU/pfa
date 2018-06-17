import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, UncontrolledAlert } from 'reactstrap';
import consts from '../../../consts';
import request from 'request';

class Register extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("webToken") !== null) {
			window.location.replace(consts.myurl + "pfa");
		}
    this.state = {
      login: '',
      password: '',
      passwordver: '',
      email: '',
      message: '',
    };
}
register() {
  request.post(consts.url + "/register", {form:{
    login: this.state.login,
    password: this.state.password,
    email: this.state.email,
    passwordver: this.state.passwordver,
  }}, function (err,httpResponse,body){
    var data = JSON.parse(body);
    this.setState({message: data.error})
    if(httpResponse.statusCode == 201) {
      window.location.replace(consts.myurl + "login");
    }
  }.bind(this))
}
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <UncontrolledAlert color="danger" style={{visibility : this.state.message ? 'visible' : 'hidden'}}> 
                    {this.state.message}
                  </UncontrolledAlert>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="login" onChange={event => this.setState({login: event.target.value})}/>
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>@</InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="Email" onChange={event => this.setState({email: event.target.value})}/>
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" placeholder="Password" onChange={event => this.setState({password: event.target.value})}/>
                  </InputGroup>
                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" placeholder="Repeat password" onChange={event => this.setState({passwordver: event.target.value})}/>
                  </InputGroup>
                  <Button color="success" block onClick={() => this.register()}>Create Account</Button>
                </CardBody>
                <CardFooter className="p-2">
                    <center><Button color="link" className="px-0" href="/login">Already have an account?</Button></center>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
