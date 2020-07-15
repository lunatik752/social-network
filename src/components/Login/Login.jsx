import React from "react";
import {Field, reduxForm} from "redux-form";
import {createField, Input} from "../../common/FormsControl/FormsControl";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login, logout} from "../../redux/authReduсer";
import {Redirect} from "react-router-dom";
import style from '../../common/FormsControl/FormsControl.module.css';


const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Email', 'email', Input, [required])}
            {createField('Password', 'password', Input, [required], {type: 'password'})}
            {createField(null, 'rememberMe', Input, [], {type: 'checkbox'}, 'rememberMe')}

            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField('Symbols from image', 'captcha', Input, [required])}

            {error && <div className={style.formSummeryControl}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>)
}


const LoginReduxForm = reduxForm({form: 'loginForm'})(LoginForm)

const Login = (props) => {

    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <div>
        <h2>LOGIN</h2>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}

const mapStateToProps = (state) => (
    {
        captchaUrl: state.auth.captchaUrl,
        isAuth: state.auth.isAuth
    })


export default connect(mapStateToProps, {login, logout})(Login);