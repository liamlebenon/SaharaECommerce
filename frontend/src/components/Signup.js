import './Signup.css';
import { Link } from 'react-router-dom';

export const Signup = () => {
    return (
        <div className='info-card'>
            <img alt='user icon' src='https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png' />
            <h1>Create an Account!</h1>
            <form action='http://localhost:4000/signup' method='POST'>            
                <input placeholder='Username' name='username'  required />< br />
                <input placeholder='Email address' name='email' type='email' required /> <br />
                <input placeholder='Password' type='password' name='password' required /> <br />
                <input placeholder='Confirm Password' type='password' name='confirmPassword' required /> <br />
                <input placeholder='First Name' name='firstname' required /> <br />
                <input placeholder='Last Name' name='lastname' required /> <br />
                <span className='small-text'>Already have an account? <Link to='/login'>Sign in</Link></span>
                <button type='submit' name='submit-button' id='submit_signup'>Create Account</button>

                
            </form>            
        </div>
    )
};