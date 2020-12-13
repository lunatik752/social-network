import React from "react";
import {reduxForm} from "redux-form";
import {createField, Input} from "../../common/FormsControl/FormsControl";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/authReduсer";
import {Redirect} from "react-router-dom";
import style from '../../common/FormsControl/FormsControl.module.css';
import {AppRootStateType} from "../../redux/redux-store";

type LoginFormPropsType = {
    handleSubmit: () => void
    error: string
    captchaUrl: string
}

const LoginForm: React.FC<LoginFormPropsType> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Email', 'email', Input, [required])}
            {createField('Password', 'password', Input, [required], {type: 'password'})}
            {createField(null, 'rememberMe', Input, [], {type: 'checkbox'}, 'rememberMe')}

            {captchaUrl && <img src={captchaUrl} alt='captcha'/>}
            {captchaUrl && createField('Symbols from image', 'captcha', Input, [required])}

            {error && <div className={style.formSummeryControl}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>)
}


const LoginReduxForm = reduxForm<any, any>({form: 'loginForm'})(LoginForm)

type LoginMapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null
}

type LoginMapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginPropsType = LoginMapStatePropsType & LoginMapDispatchPropsType

const Login: React.FC<LoginPropsType> = (props) => {


    const onSubmit = (formData: FormDataType) => {
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

const mapStateToProps = (state: AppRootStateType): LoginMapStatePropsType => (
    {
        captchaUrl: state.auth.captchaUrl,
        isAuth: state.auth.isAuth
    })


export default connect<LoginMapStatePropsType, LoginMapDispatchPropsType, {}, AppRootStateType>(mapStateToProps, {login})(Login);
