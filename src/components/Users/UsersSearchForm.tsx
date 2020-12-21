import React from 'react';
import style from './UsereSearchForm.module.css'
import {Field, Form, Formik} from 'formik';


type PropsTypes = {
}

const usersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}
type UsersSearchFormObjectType = {
    term: string
}


export const UsersSearchForm: React.FC<PropsTypes> = () => {

    const submit = (values: UsersSearchFormObjectType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
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


