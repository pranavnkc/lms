import React from 'react';
import { InputGroup, Input, InputGroupAddon, InputGroupText, FormText, FormGroup } from 'reactstrap';
export const renderInputField = ({
    input,
    label,
    type,
    icon,
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
    )}

export const renderSelectField = ({
    input,
    label,
    type,
    icon,
    meta: { touched, error, warning }
}) => {
    console.log(input, label, type, icon)
    return (
        <FormGroup className="mb-3">
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        <i className={icon}></i>
                    </InputGroupText>
                </InputGroupAddon>
                <Input type={type} placeholder={label}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Input>
                <br />
            </InputGroup>
            {touched && ((error && <FormText color="danger">{error}</FormText>))}
        </FormGroup>
    )}
