import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Row } from 'reactstrap';
import API from "../../utils/API";
import ProductionForm from "../forms/ProductionForm";

class Production extends Component {
    constructor(props){
        super(props);
        console.log(this);
        this.state = {
            submitting:false,
            connecting:false,
            deviceStatus:'Disconnected',
            deviceInfo:{
                'deviceType':"",
                "deviceMac":"",
                "deviceSerial":"",
                "device_fabrication_date": new Date(),
                "production_notes":"",
                "no_of_channels":0
            }
        }
    }
    shouldComponentUpdate(nextProps, nextState){
        return this.state!==nextState;
    }

    connect(){
        this.setState({connecting:true});
        API.put("mid-way-server/userConnSet/", {"requestConnection":this.state.deviceStatus!='Connected'}).then((res)=>{
            this.setState({connecting:false, deviceStatus:this.state.deviceStatus=='Connected'?"Disconnected":"Connected"});
            setTimeout(() => API.get("mid-way-server/deviceInfo/").then((res)=>{
                this.setState({deviceInfo:res.data.data});
            }), 1000);
        });
    }
    handleChangeInput(event) {
        this.setState({value: event.target.value});
    }
    render(){
        return(
            <div>
                <Row className="align-items-center">
                    <Col col="6"  className="mb-3 mb-xl-0">
                        <Button block color="primary" disabled={this.state.connecting} onClick={(ev)=>this.connect()}>{this.state.connecting?"Connecting ...":this.state.deviceStatus!='Connected'?"Connect":"Disconnect"}</Button>
                    </Col>
                    <Col col="6" className="mb-3 mb-xl-0">
                        <Button block color={this.state.deviceStatus=='Connected'?'success':'danger'} disabled>{this.state.deviceStatus}</Button>
                    </Col>
                </Row>
                <ProductionForm onSubmit={(e)=> null} initialValues={this.state.deviceInfo} deviceInfo={this.state.deviceInfo} submitting={this.state.submitting}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
       user:state.user
    };
}

export default (connect(mapStateToProps, null)(Production));
