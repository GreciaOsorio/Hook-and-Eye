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

    const signUpNewUser = async( email, password, display_name) => {
        try {
            // Sign up the user
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                       display_name: display_name, 
                    }
                }
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
