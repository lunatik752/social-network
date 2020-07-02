import React from 'react';
import styles from './FormsControl.module.css'
import {Field} from "redux-form";


const FormControl = ({input, meta: {touched, error}, children}) => {

    const hasError = touched && error;

    const classForTextarea = styles.formControl + ' ' + (hasError ? styles.error : '')

    return (
        <div className={classForTextarea}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}

        </div>
    )
}


export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}

export const createField = (placeholder, name, component, validate, props = {}, text = '') => (
    <div>
    <Field placeholder={placeholder}
           name={name}
           component={component}
           validate={validate}
        {...props}/>{text}
</div>)
