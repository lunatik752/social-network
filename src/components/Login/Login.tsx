import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Input} from "../../common/FormsControl/FormsControl";
import {required} from "../../utils/validators/validators";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/authReduсer";
import {Redirect} from "react-router-dom";
import style from '../../common/FormsControl/FormsControl.module.css';
import {AppRootStateType} from "../../redux/store";

type LoginFormOwnPropsType = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormDataType, LoginFormOwnPropsType> & LoginFormOwnPropsType> = ({
                                                                                                                      handleSubmit,
                                                                                                                      error,
                                                                                                                      captchaUrl
                                                                                                                  }) => {
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

type LoginPropsType = {

}

export type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormDataTypeKeys = GetStringKeys<LoginFormDataType>

export const Login: React.FC<LoginPropsType> = () => {

    const captchaUrl = useSelector<AppRootStateType, string | null>(state => state.auth.captchaUrl)
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth)
    const dispatch = useDispatch()


    const onSubmit = (formData: LoginFormDataType) => {
       dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <div>
        <h2>LOGIN</h2>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
}
