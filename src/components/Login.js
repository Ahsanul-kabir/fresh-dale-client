import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../App';
const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                var credential = result.credential;
                var token = credential.accessToken;
                var user = result.user;
                const { displayName, email } = user;
                const signedInUser = { name: displayName, email }
                setLoggedInUser(signedInUser);
                history.replace(from);
                // console.log(user)
            }).catch((error) => {
                var errorMessage = error.message;
                console.log(errorMessage)

            });
    }

    const styleDiv = {
        color: "orange",
        backgroundColor: "lightYellow"
    }

    const styleButton = {
        margin: "20px 0px 20px 0px",
        padding: "0.5rem",
        backgroundColor: "greenYellow",
        borderRadius: "10px"
    }
    return (
        <div class="container" style={styleDiv}>
            <div class="row">
                <div class="col-sm">
                    <h1>Please Login To Continue</h1>
                    <button style={styleButton} onClick={handleGoogleSignIn}>
                        Continue with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;