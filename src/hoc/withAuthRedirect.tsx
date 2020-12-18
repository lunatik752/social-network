import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppRootStateType} from "../redux/store";


export const withAuthRedirect = (Component: any) => {

    class RedirectComponent extends React.Component {
        render() {
            if (!this.props) return <Redirect to={'/login'}/>;

            return <Component {...this.props}/>
        }
    }

    let mapStateToProps = (state: AppRootStateType) => {
        return {
            isAuth: state.auth.isAuth
        }
    }


    return connect(mapStateToProps)(RedirectComponent);
}
