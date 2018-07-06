import React, { Component } from 'react';
import { Button } from 'reactstrap';
import approx from 'approximate-number';
import request from 'request';
import consts from '../consts';


class TableRow1 extends Component {


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
                if(err || httpResponse.statusCode == 500)
                    window.location.replace(consts.myurl + "500");
                else if(httpResponse.statusCode == 404)
                    window.location.replace(consts.myurl + "404");
                else if(httpResponse.statusCode == 200) {
                    var data = JSON.parse(body);
                    if (data.created)
                        this.props.refreshValues();
                }
                }.bind(this)
            );
            
            } else {
                //delete favorite
                var options = {
                    url: consts.url + "api/fav/"+this.props.id ,
                    headers: {
                        'Authorization': "Bearer " + localStorage.getItem("webToken")
                    }
                };
                request.delete(options,function(err, httpResponse, body) {
                    if(err || httpResponse.statusCode == 500)
                        window.location.replace(consts.myurl + "500");
                    else if(httpResponse.statusCode == 404)
                        window.location.replace(consts.myurl + "404");
                    else if(httpResponse.statusCode == 200) {
                        var data = JSON.parse(body);
                        if (data.destroyed)
                            this.props.refreshValues();    
                        }
                    }.bind(this)
                );
            }
        } else {
            // TODO show notification or send to login
        }
    }

    getColor(change) {
        return (parseFloat(change) > 0?  {color : '#228B22'} : {color : '#CC1111'})
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
                <td  ><strong><div style={this.getColor(this.props.change24)} > { this.props.fullname }</div></strong></td>
                <td className="text-center" > <div> { parseFloat(this.props.open) } </div></td>
                <td className="text-center" > <div> { parseFloat(this.props.close) } </div></td>
                <td className="text-center" > <div> { parseFloat(this.props.high) } </div></td>
                <td className="text-center" > <div> { parseFloat(this.props.low) } </div></td>
                <td className="text-center" > <div> { approx(this.props.marketcap,{prefix: '$ ', capital: true, round: true}) } </div></td>
                <td className="text-center" > <strong>{ approx(this.props.volume,{prefix: '$ ', capital: true, round: true}) }</strong></td>
                <td className="text-center" > 
                    <Button className={this.props.fav == "true" ? "btn-danger" : "btn-light"} onClick={() => { this.changeStatus() } } >
                        <i className="icon-heart"></i>
                    </Button>
                </td>
            </tr>
        )
    }
}

export default TableRow1;
