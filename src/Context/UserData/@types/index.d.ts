interface IPasswordData {
    title : string;
    url : string;
    urlId : string;
    urlPassword : string;
}

interface UserData {
    userData : IPasswordData[] | undefined;
    saveData : (title : string,url : string, urlId : string, urlPassword : string) => void;    
    updateData : (title : string,url : string, urlId : string, urlPassword : string ) => void;    
    deleteData : (title : string) => void ;
    getData : () => void;
}