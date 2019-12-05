import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { logout } from '../../actions/index';
import EditUser from '../views/user/Edit.js';
class UserMenu extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            modal: false
        };
        this.toggleModel = this.toggleModel.bind(this);
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });
    }
    toggleModel() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        const { userData, logout } = this.props;
        return (
            <div>
                <Dropdown nav className="d-md-down-none" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle nav>
                        <span className="text-avatar bg-info"> {userData.user.name[0]}</span>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-lg" right>
                        <DropdownItem onClick={this.toggleModel}><i className="fa fa-user"></i>Edit Profile</DropdownItem>
                        <DropdownItem><i className="fa fa-key"></i> <a href="/">Change Password</a></DropdownItem>
                        <DropdownItem onClick={() => logout()}><i className="fa fa-sign-out"></i> Logout</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <div>
                    <Modal isOpen={this.state.modal} toggle={this.toggleModel} className={this.props.className}>
                        <ModalHeader toggle={this.toggleModel}>Update Profile</ModalHeader>
                        <ModalBody>
                            <EditUser profile={this.props.userData.user}/>
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ userData }) {
    return {
        userData
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        logout
    }, dispatch);
}


export default (connect(mapStateToProps, mapDispatchToProps)(UserMenu));
