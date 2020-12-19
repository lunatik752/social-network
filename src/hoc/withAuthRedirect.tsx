import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppRootStateType} from "../redux/store";

type MapStateToPropsType = {
    isAuth: boolean
}
type DispatchToPropsType = {}

export function withAuthRedirect<WCP> (WrappedComponent: React.ComponentType<WCP>)  {

    const RedirectComponent: React.FC<MapStateToPropsType & DispatchToPropsType> = (props) => {
        let {isAuth, ...restProps} = props
            if (!props.isAuth) return <Redirect to={'/login'}/>;
            return <WrappedComponent {...restProps  as WCP}/>
    }

    let mapStateToProps = (state: AppRootStateType) => {
        return {
            isAuth: state.auth.isAuth
        }
    }


    return connect<MapStateToPropsType, {}, WCP, AppRootStateType>(mapStateToProps)(RedirectComponent);
}
