
import React, { Component } from 'react';
//import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

class TableHeader extends Component {
render() {
    //this.props
    return (
        <thead className="thead-light">
        <tr>
           {/*<th className="text-center"><i className="icon-people"></i></th>*/} 
            <th className="text-center" >Symbol</th>
            <th>Fullname</th>
            <th className="text-center" >Price</th>
            <th className="text-center" >Market Cap</th>
            <th className="text-center" >Volume</th>
            {/*<th >Time</th>*/}
        </tr>
        </thead>
        
    )
}
}

export default TableHeader;
