import { createContext, useState } from "react";

export const AppContext=createContext()


const Appcontextprovider=({children})=>{

    const BackendURL=import.meta.env.VITE_BACKENDURL
    const [atoken,setatoken]=useState(localStorage.getItem('atoken')?localStorage.getItem('atoken'):'')


   
       const  value={
        BackendURL,
        atoken,
        setatoken

      
        }

    

    return(
        <AppContext.Provider value={value}>
            {children}

        </AppContext.Provider>
    )


}


export default Appcontextprovider