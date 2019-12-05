import React from 'react';
import { Button, Col, InputGroup, Input, InputGroupAddon, InputGroupText, Row, FormText, FormGroup } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import API from "../../utils/API";
import { renderInputField, renderSelectField } from '../../utils/utils';
const validate = values => {
    const errors = {};
    if (!values.first_name) {
        errors.first_name = "Please enter the First Name";
    }
    if (!values.last_name) {
        errors.last_name = "Please enter the Last Name";
    }
    if (!values.username) {
        errors.username = "Please enter the Username";
    }
    if (!values.password) {
        errors.password = "Please enter the Password";
    }
    if (!values.confirm_password ) {
        errors.confirm_password = '"Please enter the Confirm Password";' ;
    } else if (values.confirm_password !== values.password) {
        errors.confirm_password = 'Password mismatched' ;
    }
    return errors;
}

const usernameValidator = (values, a,form) => {
    let params ={username:values.username};
    if(form.initialValues && form.initialValues.id){
        params['current_id'] = form.initialValues.id;
    }
    return API.get('users/validate-username/', {params:params})
              .then((res) => {
              }, (err)=>{
                  throw { username: err.response.data.username[0] }
              })
}

let UserCreateForm = props => {
    const { handleSubmit, submitting, groupOptions, hideRoleField } = props;
    return (
        <form onSubmit={handleSubmit}>
        <h1>{props.initialValues && props.initialValues.id?"Edit User":"Create User"}</h1>
        <Field component={renderInputField} icon="fa fa-user" type="text" label="First Name" name="first_name"/>
        <Field component={renderInputField} icon="fa fa-user" type="text" label="Last Name" name="last_name"/>
        <Field component={renderInputField} icon="fa fa-user" type="text" label="Username" name="username"/>
        {props.hideRoleField?<p></p>:<Field component={renderSelectField} icon="fa fa-users" type="select" label="Role" name="role" options={groupOptions}/>}
        {props.initialValues && props.initialValues.id?<p></p>:
         <span>
             <Field component={renderInputField} icon="fa fa-key" type="password" label="Password" name="password" />
             <Field component={renderInputField} icon="fa fa-key" type="password" label="Confirm Password" name="confirm_password"/>
         </span>
        }
        <Row>
            <Col xs="6">
                <Button color="primary" disabled={submitting} type="submit">Save</Button>
            </Col>
        </Row>
        </form>
    );
}

export default reduxForm({
    form: 'userCreationForm',
    validate,
    asyncValidate:usernameValidator,
    asyncBlurFields: ['username']

})(UserCreateForm);
