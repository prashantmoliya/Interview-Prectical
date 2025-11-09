import React, { useContext } from 'react';

import { FirebaseAuthContext } from '../context/FirebaseAuthContext';


const useFirebaseAuth = () => {

    const { firebaseCurrentUser } = useContext(FirebaseAuthContext);

    return firebaseCurrentUser;
}

export default useFirebaseAuth;