import React from 'react';
import s from './Profile.module.css';

const Profile = () => {
    return (
        <div className={s.content}>
            <div>
                My posts
                <div>
                    New posts
                </div>
                <div>
                    <div>
                        post 1
                    </div>
                    <div>
                        post 2
                    </div>
                    <div>
                        post 3
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Profile;