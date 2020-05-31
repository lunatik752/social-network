import React from 'react';
import styles from './ProfileStatus.module.css';

class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        });
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (e) => {
        this.setState(
            {status: e.currentTarget.value}
        )
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
          if (prevProps.status !== this.props.status) {
              this.setState({
                  status: this.props.status
              })
          }
    }

    render() {
        return (
            <div className={styles.statusWrapper}>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || 'edit status'}</span>
                    </div>}
                {this.state.editMode &&
                    <div>
                        <input type="text"
                               value={this.state.status}
                               onBlur={this.deactivateEditMode}
                               autoFocus={true}
                        onChange={this.onStatusChange}/>
                    </div>
                }

            </div>
        )
    }
}

export default ProfileStatus;