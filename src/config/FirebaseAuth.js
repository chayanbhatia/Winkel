import jwt from 'jsonwebtoken'
import firebase from './Firebase'

export const GoogleSignIn = async () => {

    var provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
        .then((result) => {
            const db = firebase.firestore();
            db.collection('users').doc(result.user.uid).set({
                name: result.user.displayName,
                email: result.user.email,
                uid: result.user.uid
            }, { merge: true });
            const resultData = {
                name: result.user.displayName,
                email: result.user.email,
                uid: result.user.uid
            };
            const Token = jwt.sign(resultData, process.env.REACT_APP_SECURE_TOKEN_ACCESS_KEY);
            localStorage.setItem('authToken', Token);

            return result;
        })
        .catch((error) => {
            return error;
        })

}
export const FacebookSignIn = async () => {

    var provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider)
        .then((result) => {
            const db = firebase.firestore();
            db.collection('users').doc(result.user.uid).set({
                name: result.user.displayName,
                email: result.user.email,
                uid: result.user.uid
            }, { merge: true });
            const resultData = {
                name: result.user.displayName,
                email: result.user.email,
                uid: result.user.uid
            };
            const Token = jwt.sign(resultData, process.env.REACT_APP_SECURE_TOKEN_ACCESS_KEY);
            localStorage.setItem('authToken', Token);

            return result;
        })
        .catch((error) => {
            return error;
        })

}

export const logout = async () => {
    localStorage.removeItem('authToken');
    return firebase.auth().signOut().then(() => {
        return "Success";
    }).catch(() => {
        return "Error"
    });
}


export async function verifySecuredToken(token) {

    return jwt.verify(token, process.env.REACT_APP_SECURE_TOKEN_ACCESS_KEY, (err, userData) => {
        if (err)
            return null;
        if (userData.name === (null || undefined) || userData.email === (null || undefined) || userData.uid === (null || undefined))
            return null;

        return userData;
    });
}
