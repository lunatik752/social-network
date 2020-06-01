import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../common/FormsControl/FormsControl";
import {required} from "../../utils/validators/validators";


const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder='Login'
                       name='login'
                       component={Input}
                       validate={[required]}/>
            </div>
            <div>
                <Field placeholder='Password'
                       name='password'
                       component={Input}
                       validate={[required]}/>
            </div>
            <div>
                <Field type='checkbox'
                       component={Input
                       } name='rememberMe'
                       validate={[required]}/> remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>)
}


const LoginReduxForm = reduxForm({form: 'loginForm'})(LoginForm)


const Login = (props) => {

    const onSubmit = (formData) => {
        console.log(formData)
    }

    return <div>
        <h2>LOGIN</h2>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}


export default Login;