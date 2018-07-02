import React, { Component } from 'react';
import { UncontrolledDropdown,  DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import request from 'request';
import consts from '../consts';

class AccountSection extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  componentDidMount() {
  }

  render() {

    return (
        //TODO if he is logged in !!if not simple log in button
         <UncontrolledDropdown nav inNavbar>
           <DropdownToggle nav caret>
             Account
           </DropdownToggle>
           <DropdownMenu right>
             <DropdownItem>
               Favorites
             </DropdownItem>
             <DropdownItem>
               Settings
             </DropdownItem>
             <DropdownItem>
               Log out
             </DropdownItem>
           </DropdownMenu>
         </UncontrolledDropdown>
    );
  }
}

Pfaheader.propTypes = propTypes;
Pfaheader.defaultProps = defaultProps;

export default AccountSection;
