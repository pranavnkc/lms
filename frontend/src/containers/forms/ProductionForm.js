import React from 'react';
import { Button, Col, InputGroup, Input, InputGroupAddon, InputGroupText, Row, FormText, FormGroup } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';


const validate = values => {
    const errors = {};
    return errors;
}

const renderField = ({
    input,
    label,
    type,
    icon,
    rows,
    readonly,
    meta: { touched, error, warning }
}) => {
    return (
        <FormGroup className="mb-3">
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        <i className={icon}></i>
                    </InputGroupText>
                </InputGroupAddon>
                <Input {...input} type={type} placeholder={label}/><br />
            </InputGroup>
            {touched && ((error && <FormText color="danger">{error}</FormText>))}
        </FormGroup>
)
    }

let ProductionForm = props => {
    const { handleSubmit, submitting } = props;
    if(props.deviceInfo && props.deviceInfo.deviceType){
        props.change('deviceType', props.deviceInfo.deviceType);
    }
    if(props.deviceInfo && props.deviceInfo.deviceMac){
        props.change('deviceMac', props.deviceInfo.deviceMac);
    }
    if(props.deviceInfo && props.deviceInfo.deviceSerial){
        props.change('deviceSerial', props.deviceInfo.deviceSerial);
    }
    return (
      <form onSubmit={handleSubmit}>
          <h1>Production</h1>
          <p className="text-muted"> Install Licence</p>
          <Field component={renderField} icon="fa fa-user" type="text" label="Device Type" name="deviceType"/>
          <Field component={renderField} icon="fa fa-key" type="text"  label="Device Mac Address" name="deviceMac" />
          <Field component={renderField} icon="fa fa-key" type="text"  label="Device Serial" name="deviceSerial" />
          <Field component={renderField} icon="fa fa-key" type="text" label="Numer Of Channels Licensed" name="no_of_channels" />
          <Field component={renderField} icon="fa fa-key" type="date" label="Device Fabrication Date" name="device_fabrication_date" />
          <Field component={renderField} icon="fa fa-key" type="textarea" rows="4" label="Production Notes" name="production_notes"/>
          <Row>
              <Col xs="6">
                  <Button color="primary" disabled={submitting} type="submit">Login</Button>
              </Col>
          </Row>
      </form>
    );
}


export default reduxForm({
    form: 'productionForm',
    validate
})(ProductionForm);
