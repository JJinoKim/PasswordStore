import React,{createContext,useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';


const defaultContext : UserData = {
    userData : undefined,
    deleteData : async (title : string) => {},
    saveData : async (title : string,url : string, urlId : string, urlPassword : string) => {},
    updateData : async (title : string,url : string, urlId : string, urlPassword : string) => {},
    getData : async () => {},
}

const UserDataContext = createContext(defaultContext);

interface Props {
    children : JSX.Element | Array<JSX.Element>;
};

const UserDataContextProvider = ({children} : Props) => {
    const [userData, setUserData] = useState<IPasswordData[]>([]);
    const [tempData, setTempData] = useState<IPasswordData[]>();
    
    const getData = async (): Promise<void> => {


        await AsyncStorage.getItem('userData').then((value) => {
            if(value){
                setUserData(JSON.parse(value));
            }            
        })
    } 
    // data 저장
    const saveData = async (title : string, url : string, urlId : string, urlPassword : string): Promise<void>  => {
        const newData = [
            ...userData,
            {
            title : title,
            url : url ,
            urlId : urlId,
            urlPassword : urlPassword
        }]
        await AsyncStorage.setItem('userData',JSON.stringify(newData)).then(() => {
            setUserData([
                ...userData,
                {
                    title : title,
                    url : url ,
                    urlId : urlId,
                    urlPassword : urlPassword
                }
            ]);
        }).catch((e)=>{
            console.log(e);
        }) ;  
    }

    const updateData = async (title : string, url : string, urlId : string, urlPassword : string): Promise<void> => {
        const tempData = userData.filter(r => r.title !== title);
        const newData = [
            ...tempData,
            {
                title : title,
                url : url ,
                urlId : urlId,
                urlPassword : urlPassword            
            }
        ];
        await AsyncStorage.setItem('userData', JSON.stringify(newData)).then(() => {
            setUserData(newData);
        });
    }

    const deleteData = async (title : string) : Promise<void> => {        
        const tempData = userData.filter(r => r.title !== title);
        await AsyncStorage.setItem('userData', JSON.stringify(tempData)).then(() => {
            setUserData(tempData);
        });
    }



    useEffect(() => {        
        getData();
    }, [])

    return (
        <UserDataContext.Provider
            value={{
                getData,
                saveData,
                userData,
                deleteData,
                updateData,
            }}
        >
            {children}
        </UserDataContext.Provider>
    );
};

export  {UserDataContextProvider, UserDataContext};