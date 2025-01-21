import { createContext } from "react";

// Create the context
export const AppContext = createContext();

// Context provider component
export const AppContextProvider = (props) => {
    // Define the value to be shared via context
    const value = { 
        // Add state or methods here to share with children
    };

    // Return the provider
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};
