import React from "react";

const AuthContext = React.createContext ({
    
        token: "",
        isLoggedIn: false,
        login: () => {},
        
    });

export default AuthContext;