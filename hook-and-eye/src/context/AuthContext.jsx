import {
    useEffect,
    useState,
    createContext,
    useContext,
} from 'react';
import { supabase } from '../client';

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    const signUpNewUser = async( email, password) => {
        try {
            // Sign up the user
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                email: email,
                password: password,
            });

            if (signUpError) {
                console.error('There was a problem signing up:', signUpError);
                return { success: false, error: signUpError };
            }

            // If session exists, user is automatically signed in
            return { success: true, data: signUpData };
            
        } catch (error) {
            console.error('Unexpected error during sign up:', error);
            return { success: false, error };
        }
    }

    const signInUser = async( email, password ) => {
        try{
            const {data, error} = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
            //make sure to remove all of this before deployment
            //no personal data should be showing up on the cocnsole
            if (error){
                console.log('error occur:', error)
                return {succes: false, error}
            }
            console.log('sign in success', data)
            return{success: true, data}

        }catch(error){
            console.log('Error:', error)
        }
    }

    useEffect(() => {
        supabase.auth.getSession().then(({data: { session }}) => {
            setSession(session);
            setLoading(false);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setLoading(false)
        });
    }, []);

    const signOut =async() => {
        const {error} = await supabase.auth.signOut();

        if(error){
            console.error('There was an error', error)
        }
    }



    return(
        <AuthContext.Provider value={{session, signUpNewUser, signInUser, signOut}}>
            {children}
        </AuthContext.Provider>
    )
};

export const UserAuth = () => {
    return useContext(AuthContext);
};
