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
    options,
    meta: { touched, error, warning }
}) => {
    let getOptions = ()=>{
        let optionFields = [];
        for(let option of options){
            console.log(option);
            optionFields.push(<option key={option.name+option.id} value={option.name}>{option.name.toUpperCase()}</option>);
        }
        return optionFields;
    }
    return (
        <FormGroup className="mb-3">
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        <i className={icon}></i>
                    </InputGroupText>
                </InputGroupAddon>
                <Input {...input} type={type} placeholder={label}>
                    {getOptions()}
                </Input>
                <br />
            </InputGroup>
            {touched && ((error && <FormText color="danger">{error}</FormText>))}
        </FormGroup>
    )}
