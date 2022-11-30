import '../signup/Signup.css';
import { Link } from 'react-router-dom';

export const Login = () => {
    return (
        <div className="info-card">
            <img alt='user icon' src='https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png' />
            <h1>Sign In</h1>
            <div>
                <form action='http://localhost:4000/login' method="POST">
                    <input placeholder='Email Address' name='email'></input><br/>
                    <input placeholder='Password' type='password' name='password'></input><br />
                    <span className='small-text'>Don't have an account? <Link to='/signup'>Click here</Link></span>
                    <button type='submit' name='submit'>Sign In</button>
                </form>
            </div>
        </div>
    )
};