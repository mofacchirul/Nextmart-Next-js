import { getCurrentUser } from "@/services/AuthServices/indes";
import { IUser } from "@/types";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface IUserProviderValues {
  user: IUser | null;
  isLoading: boolean;
  setuser: (user: IUser | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}


const Usercontext = createContext <IUserProviderValues | undefined>(undefined);
const UserProvider = ({children}:{children:React.ReactNode})=>{
    const [user,setuser]= useState<IUser | null> (null)
    const [isLoading, setIsLoading] = useState(true);

 const HandleUser = async()=>{
    const user = await getCurrentUser();
    setuser(user)
    setIsLoading(false)
 }
 useEffect(()=>{
      HandleUser()
 },
[isLoading])
    return (
        <Usercontext.Provider value={{user,setuser,isLoading,setIsLoading}}>
            {children}
        </Usercontext.Provider>
    )
}

export const useUser=()=>{
    const context = useContext(Usercontext)
    if(context === undefined){
        throw new Error("useUser must be used within a UserProvider");
    }
}

export default UserProvider
