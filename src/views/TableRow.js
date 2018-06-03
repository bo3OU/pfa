import React, { Component } from 'react';
//import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

class TableRow extends Component {
render() {
    //this.props
    return (
            <tr className="clickable-row" >
            <td className="text-center" ><strong>{ this.props.name }</strong>
            </td>
            <td> <div> { this.props.price } </div>
            </td>
            <td className="text-center"> <div> { this.props.marketcap } </div>
            </td>
            <td> <strong><div style={{ color : '#228B22' }} > + 2.01</div></strong>
            </td>
            <td className="text-center">
                <i className="fa fa-cc-mastercard" style={{ fontSize: 24 + 'px' }}></i>
            </td>
            <td>
                <div className="small" >5 minutes ago</div>
            </td>
            </tr>
    )
}
}

export default TableRow;
