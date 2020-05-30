import React from 'react';
import styles from './ProfileStatus.module.css';

class ProfileStatus extends React.Component {

    state = {
        editMode: false
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
    }


    render() {
        return (
            <div className={styles.statusWrapper}>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>Здесь будет отображаться статус</span>
                    </div>}
                {this.state.editMode &&
                    <div>
                        <input type="text" value='Здесь будет отображаться статус' onBlur={this.deactivateEditMode} autoFocus={true}/>
                    </div>
                }

            </div>
        )
    }
}

export default ProfileStatus;