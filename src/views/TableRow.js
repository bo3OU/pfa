import React, { Component } from 'react';
//import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

class TableRow extends Component {
render() {
    //this.props
    return (
            <tr className="clickable-row" >
            <td className="text-center">
                <div className="avatar" >
                    <img src={"http://www.cryptocompare.com/" + this.props.image} className="img-avatar" alt="" />
                    <strong>{ this.props.name }</strong>
                </div>
            </td>
            <td  ><strong>{ this.props.fullname }</strong></td>
            <td className="text-center" > <div> { this.props.price } </div></td>
            <td className="text-center" > <div> { this.props.marketcap } </div></td>
            <td className="text-center" > <strong><div style={{ color : '#228B22' }} > { this.props.volume }</div></strong></td>
            </tr>
    )
}
}

export default TableRow;
