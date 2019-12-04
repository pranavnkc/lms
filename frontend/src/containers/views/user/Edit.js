import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import API from "../../../utils/API";
import UserCreateForm from '../../forms/UserCreateForm';

class EditUser extends Component {
    user = null;
    constructor(props){
        super(props);
        this.userID = this.props.match.params.id;
        this.state = {
            user: this.userID?{}:null,
            submitting:false,
        }
        if(this.userID){
            API.get(`users/${this.userID}/`).then((res)=>{
                this.setState({user:res.data});
            }, (err)=>{
                if(err.response.status===404){
                    this.props.history.push(`/users`);
                }
            })
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        return this.state!==nextState;
    }

    createOrUpdate(data){
        this.setState(
            {
                ...this.state,
                submitting:true,
            }
        )
        let api = this.userID?API.patch(`users/${this.state.user.id}/`, data):API.post(`users/`, data)
        api.then((res)=>{
            this.props.history.push(`/users`);
        });
    }

    render(){
        if((this.state.user && this.state.user.id) || !this.state.user)
            return(
                <UserCreateForm initialValues={this.state.user} onSubmit={(e)=>this.createOrUpdate(e)} submitting={this.state.submitting}/>
            )
        return "";
    }
}
export default (connect(null, null)(EditUser));
