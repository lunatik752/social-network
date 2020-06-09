import React, {useState} from 'react';
import styles from './ProfileStatus.module.css';

const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    const activateEditMode = () => {
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }



    return (
        <div className={styles.statusWrapper}>
            {!editMode &&
            <div>
                <span onDoubleClick={activateEditMode}>{props.status || 'edit status'}</span>
            </div>}
            {editMode &&
            <div>
                <input type="text"
                       onBlur={deactivateEditMode}
                       autoFocus={true}
                       value={status}
                       onChange={onStatusChange}/>
            </div>
            }

        </div>
    )
}


export default ProfileStatusWithHooks;