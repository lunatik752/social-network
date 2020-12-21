import React from 'react';
import style from './UsereSearchForm.module.css'
import {Field, Form, Formik} from 'formik';
import { FilterType } from '../../redux/usersReduсer';


type PropsTypes = {
    onFilterChanged: (filter: FilterType) => void

}

const usersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}


export const UsersSearchForm: React.FC<PropsTypes> = ({onFilterChanged}) => {

    const submit = (values: FilterType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        onFilterChanged(values)
        setSubmitting(false)
    }

    return (


        <div className={style.searchFormWrapper}>
            <Formik
                initialValues={{ term: '' }}
                validate={usersSearchFormValidate}
                onSubmit={submit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="term" />
                        <button type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
};


