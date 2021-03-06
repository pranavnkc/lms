import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom'
import { Table, Button } from 'reactstrap';
import { login } from '../../../actions/index';
import API from "../../../utils/API";

class UserList extends Component {
    constructor(){
        super();
        this.getUsers();
        this.state = {
            users:[],
            userTable:[]
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        return this.state!==nextState || this.props!==nextProps;
    }

    getUsers(){
        API.get('users/').then((res)=>{
            this.setState({ users: res.data.results, userTable:this.getTableData(res.data.results) });
        });
    }

    edit(user){
        this.props.history.push(`/users/${user.id}/`);
    }
  delete(userID){
    API.delete(`users/${userID}`).then((res)=>{
      this.getUsers();
    });
  }
    create(){
        console.log(this);
        this.props.history.push(`/users/create/`);
    }
    getTableData(users){
        let table = [];
        for(let user of users){
            table.push(<tr key={user.id}>
                       <th scope="row">{user.id}</th>
                       <td>{user.first_name}</td>
                       <td>{user.last_name}</td>
                       <td>{user.username}</td>
                       <td>{user.email}</td>
                <td>{user.groups.map(g=>g.name.toUpperCase()).join(",")}</td>
                       <td><i className="fa fa-pencil-square-o fa-2x cursor pr-2" onClick={() =>this.edit(user)}></i><i className="fa fa-trash fa-2x cursor" onClick={() =>this.delete(user.id)}></i></td>
            </tr>)
        }
        return table;
    }
    render() {
        return (
            <div>
            <Button onClick={()=>this.create()} color="primary" className="pull-right mb-3">Create User</Button>
            <br/>
            <br/>
            <Table striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
            <th>Username</th>
            <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.userTable}
                </tbody>
            </Table>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        login
    }, dispatch);
}


function mapStateToProps(state) {
    console.log(state);
    return {
        error: state.user? state.user.error:null
    };
}

export default (connect(mapStateToProps, mapDispatchToProps)(UserList));
