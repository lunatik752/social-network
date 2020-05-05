import React from 'react';
import style from './Usere.module.css'
import * as axios from 'axios'
import userPhoto from '../../assets/image/user.png'


const Users = (props) => {
    if (props.users.length === 0) {
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
            debugger
            props.setUsers(response.data.items);
        })
    }


// props.setUsers(
//     [
//         {
//             id: 1,
//             photoUrl: 'https://sun9-43.userapi.com/c845322/v845322042/1d433f/CnsL-8jEUjw.jpg',
//             followed: true,
//             firstName: 'Natalia',
//             lastName: 'Kulikova',
//             status: 'I am learning css',
//             location: {city: 'Minsk', country: 'Belarus'}
//         },
//         {
//             id: 2,
//             photoUrl: 'https://sun9-43.userapi.com/c845322/v845322042/1d433f/CnsL-8jEUjw.jpg',
//             followed: false,
//             firstName: 'Maxim',
//             lastName: 'Bely',
//             status: 'I am learning react',
//             location: {city: 'Minsk', country: 'Belarus'}
//         },
//         {
//             id: 3,
//             photoUrl: 'https://sun9-43.userapi.com/c845322/v845322042/1d433f/CnsL-8jEUjw.jpg',
//             followed: true,
//             firstName: 'Aleksey',
//             lastName: 'Bely',
//             status: 'I am study at school',
//             location: {city: 'Minsk', country: 'Belarus'}
//         },
//         {
//             id: 4,
//             photoUrl: 'https://sun9-43.userapi.com/c845322/v845322042/1d433f/CnsL-8jEUjw.jpg',
//             followed: false,
//             firstName: 'Lena',
//             lastName: 'Kulikova',
//             status: 'I go to kindergarten',
//             location: {city: 'Minsk', country: 'Belarus'}
//         },
//     ]

    return (
        <div className={style.usersWrapper}>
            {
                props.users.map(user => <div key={user.id}>
                    <span>
                        <div>
                            <img src={user.photos.small != null ? user.photos.small: userPhoto } alt='photo' className={style.userPhoto}/>
                        </div>
                        <div>
                            {user.followed
                                ? <button onClick={() => {
                                    props.unFollow(user.id)
                                }}>Unfollow</button>
                                : <button onClick={() => {
                                    props.follow(user.id)
                                }}>Follow</button>}

                        </div>
                    </span>
                    <span>
                        <span>
                            <div>
                                <span>{user.name}</span>

                            </div>
                            <div>
                                {user.status}
                            </div>
                        </span>
                        <span>
                            <div>
                                {'user.location.country'}
                            </div>
                            <div>
                            {'user.location.city'}
                           </div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    )
};


export default Users;