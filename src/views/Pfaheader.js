import React, { Component } from 'react';
import { Container, Collapse, UncontrolledDropdown, NavbarToggler, Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, NavbarBrand } from 'reactstrap';
import PropTypes from 'prop-types';
import consts from '../consts.js'
import SearchCoin2 from './SearchCoin2';
const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class Pfaheader extends Component {
	constructor(props) {
		super(props)

		this.toggle = this.toggle.bind(this);
		this.state = {
		isOpen: false
		};
	}

	logout() {
		localStorage.removeItem("webToken");
		window.location.replace(consts.myurl + "login");
	}

	toggle() {
		this.setState({
		isOpen: !this.state.isOpen
		});
	}

	getItem() {
		if (localStorage.getItem("webToken")===null)
		return (
		<NavItem>
			<NavLink href="/login">Login</NavLink>
			</NavItem>
		);
		
		else {
		return (
			<UncontrolledDropdown nav inNavbar>
			<DropdownToggle nav caret>
			Account
			</DropdownToggle>
			<DropdownMenu right>
			<DropdownItem>
				Favorites
			</DropdownItem>
			<DropdownItem onClick={this.logout}>
				Log out
			</DropdownItem>
			</DropdownMenu>
			</UncontrolledDropdown>
		);
		}
	}

  componentWillMount() {
    
  }
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        {/*<AppSidebarToggler className="d-lg-none" display="md" mobile />*/}
		<Container>
        <NavbarBrand href="/pfa"><div style={{ fontSize: '18px', color: '#777555' }}>PFA</div></NavbarBrand>
       {/* <AppSidebarToggler className="d-md-down-none" display="lg" /> */}
       <SearchCoin2></SearchCoin2>
       <NavbarToggler onClick={this.toggle} />
       <Collapse isOpen={this.state.isOpen} navbar>
       <Nav className="ml-auto" navbar>
       {/*<SearchCoin></SearchCoin>*/}

         <NavItem>
           <NavLink href="/pfa">Home</NavLink>
         </NavItem>
         <NavItem>
           <NavLink href="/news">News</NavLink>
         </NavItem>
			  {this.getItem()}
       </Nav>
     </Collapse>
     </Container>


        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

Pfaheader.propTypes = propTypes;
Pfaheader.defaultProps = defaultProps;

export default Pfaheader;
