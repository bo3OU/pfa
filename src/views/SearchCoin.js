import React, { Component } from 'react';
import { Collapse, UncontrolledDropdown, NavbarToggler, Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, NavbarBrand } from 'reactstrap';
import PropTypes from 'prop-types';
import request from 'request';
import consts from '../consts';
import Select from 'react-select';
class SearchCoin extends Component {
  	constructor(props) {
		super(props)
		this.state = {
			searchValue: ""
		}
  	}

	Search() {
		//TODO
		request.get(consts.url + "search/");
		this.setState({
			Data: []
		});
	}
	Change() {
		
	}
	render() {
		return (
			<React.Fragment>
			<input onChange={event => this.setState({searchValue: event.target.value})}>

			</input>
<Select>

</Select>
			</React.Fragment>
		);
	}
}
export default SearchCoin;
