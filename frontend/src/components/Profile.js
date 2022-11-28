import { useSelector } from 'react-redux';
import { selectIsLoadingUser, selectUser } from '../app/features/userSlice';
import { clearCart } from '../app/features/cartSlice';
import './Profile.css';

export const Profile = () => {

    const user = useSelector(selectUser);
    console.log('User in profile: ', user);
    const isLoadingUser = useSelector(selectIsLoadingUser);

    if (isLoadingUser) {
        return (
            <div>
                <h1>User is loading...</h1>
            </div>
        )
    } else {
        return (
            <div className='profile-card'>
                <img alt='user icon' src='https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png' />
                <h1>User Information</h1>
                <h3>Email Address:</h3>
                <p>{user.email}</p>
                <h3>Username:</h3>
                <p>{user.username}</p>
                <h3>Full Name:</h3>
                <p>{user.firstname} {user.lastname}</p>
                <form action="http://localhost:4000/logout" method="POST">
                    <button type="submit" name="logout" value="Log Out" onClick={clearCart}>Logout</button>
                </form>
            </div>
        )
    }
};