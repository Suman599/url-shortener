import { createContext, useContext, useEffect } from 'react';
import useFetch from './hooks/use-fetch';
import { getCurrentUser } from './db/apiAuth';

const UrlContext = createContext();

const UrlProvider = ({ children }) => {
    const { data: user, loading, fn: fetchUser } = useFetch(getCurrentUser);
    
    // Check if user exists and has the correct role
    const isAuthenticated = user?.role === "authenticated"; // Make sure to match the actual role returned

    useEffect(() => {
        fetchUser().catch(err => {
            console.error("Error fetching user:", err);
        });
    }, []);

    return (
        <UrlContext.Provider value={{ user, fetchUser, loading, isAuthenticated }}>
            {children}
        </UrlContext.Provider>
    );
};

export const UrlState = () => {
    return useContext(UrlContext);
};

export default UrlProvider;
