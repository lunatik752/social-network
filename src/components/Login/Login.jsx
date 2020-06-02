import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../common/FormsControl/FormsControl";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login, logout} from "../../redux/authReduсer";
import {Redirect} from "react-router-dom";



const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder='Email'
                       name='email'
                       component={Input}
                       validate={[required]}/>
            </div>
            <div>
                <Field placeholder='Password'
                       name='password'
                       type='password'
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
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <div>
        <h2>LOGIN</h2>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = (state) => (
    {
        isAuth: state.auth.isAuth
    })



export default connect(mapStateToProps, {login, logout})(Login);