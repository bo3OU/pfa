import React, { Component } from 'react';
import { Button } from 'reactstrap';
import approx from 'approximate-number';
import request from 'request';
import consts from '../consts';


class TableRow extends Component {


    changeStatus() {
        if (localStorage.getItem("webToken") !== null) {
            if(this.props.fav == "false") {
                //add favorite
            var options = {
                url: consts.url + "api/fav/"+this.props.id ,
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem("webToken")
                }
            };
            console.log("sending request " +this.props.id );
            request.post(options,function(err, httpResponse, body) {
                var data = JSON.parse(body);
                //test if it was really created
                }.bind(this)
            );
            this.props.refreshValues();
        } else {
            //delete favorite
            var options = {
                url: consts.url + "api/fav/"+this.props.id ,
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem("webToken")
                }
            };
            console.log("sending request " +this.props.id );
            request.delete(options,function(err, httpResponse, body) {
                console.log("sending delete query");
                var data = JSON.parse(body);
                //test if it was deleted
                }.bind(this)
            );
            this.props.refreshValues();
        }
    }
    }

    render() {
        //this.props
        return (
            <tr className="clickable-row" >
                <td className="text-center">
                    <div className="avatar" >
                        <img src={"http://www.cryptocompare.com/" + this.props.image} className="img-avatar" alt="" />
                    </div>
                </td>
                <td  ><strong>{ this.props.fullname }</strong></td>
                <td className="text-center" > <div> { parseFloat(this.props.price) } </div></td>
                <td className="text-center" > <div> { approx(this.props.marketcap,{prefix: '$ ', capital: true, round: true}) } </div></td>
                <td className="text-center" > <strong><div style={{ color : '#228B22' }} > { approx(this.props.volume,{prefix: '$ ', capital: true, round: true}) }</div></strong></td>
                <td className="text-center" > 
                    <Button className={this.props.fav == "true" ? "btn-danger" : "btn-light"} onClick={() => { this.changeStatus() } } >
                        <i className="icon-heart"></i>
                    </Button>
                </td>
            </tr>
        )
    }
}

export default TableRow;
