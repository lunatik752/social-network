import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Input} from "../../common/FormsControl/FormsControl";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/authReduсer";
import {Redirect} from "react-router-dom";
import style from '../../common/FormsControl/FormsControl.module.css';
import {AppRootStateType} from "../../redux/store";

type LoginFormOwnPropsType = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormDataType, LoginFormOwnPropsType> & LoginFormOwnPropsType> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormDataTypeKeys>('Email', 'email', Input, [required])}
            {createField<LoginFormDataTypeKeys>('Password', 'password', Input, [required], {type: 'password'})}
            {createField<LoginFormDataTypeKeys>(undefined, 'rememberMe', Input, [], {type: 'checkbox'}, 'rememberMe')}

            {captchaUrl && <img src={captchaUrl} alt='captcha'/>}
            {captchaUrl && createField<LoginFormDataTypeKeys>('Symbols from image', 'captcha', Input, [required])}

            {error && <div className={style.formSummeryControl}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>)
}


const LoginReduxForm = reduxForm<LoginFormDataType, LoginFormOwnPropsType>({form: 'loginForm'})(LoginForm)

type LoginMapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null
}

type LoginMapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}


type LoginPropsType = LoginMapStatePropsType & LoginMapDispatchPropsType

export type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormDataTypeKeys = GetStringKeys<LoginFormDataType>

const Login: React.FC<LoginPropsType> = (props) => {


    const onSubmit = (formData: LoginFormDataType) => {
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
