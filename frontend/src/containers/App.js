import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReduxToastr from 'react-redux-toastr';
import Home from './Home';
import Login from './Login';
import  LocalStorageService from '../utils/LocalStorageService';
import AuthService from '../services/authService.js';
import API from "../utils/API";
import {me, fetchConfig} from '../actions';
const localStorageService = LocalStorageService.getService();
const authService = AuthService.getService();
class App extends Component {
    constructor(props){
        super(props);
        this.props.me();
        this.props.fetchConfig();
    }
    render() {
        const { userData } = this.props;
        return (
            <div>
                <ReduxToastr />
                <BrowserRouter>
                    <Switch>
                        {
                            userData && userData.user && userData.user.id ? <Route path="/" name="Home" component={Home} /> : <Route path="/" name="Login Page" component={Login} />
                        }
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userData:state.userData
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        me,
        fetchConfig,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
