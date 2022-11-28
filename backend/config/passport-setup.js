const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { pool, query } = require('../db'); 

passport.use(new LocalStrategy({ 
    usernameField: 'email',
    passwordField: 'password' 
    }, (email, password, done) => {
    console.log('Local strat is being executed...');
    pool.query(
        'SELECT id, username, password FROM users WHERE email = $1',
        [ email ],
        (error, results) => {
            if (error) {return done(error)};        
            if (results.rows.length > 0) {
                const user = results.rows[0];
                bcrypt.compare(password, user.password, (err, res) => {
                    if(res) { 
                        console.log(`Successfully logged in as ${user.username}`);
                        return done(null, {
                            id: user.id,
                            username: user.username
                    }); 
                    } else {
                        return done(err, false);
                    }
                })
            } else {
                return done(null, false);
            }
        }

    )
}));

passport.serializeUser((user, done) => {
    console.log('Serialize user is running...');
    return done(null, user.id);
});

passport.deserializeUser((id, done) => {
    pool.query(
        'SELECT id, username, email, firstname, lastname FROM users WHERE id = $1',
        [id],
        (error, results) => {
            if (error) return error;
            console.log('DeserializeUser is running...');
            return done(null, results.rows[0]);
        }
    )
});