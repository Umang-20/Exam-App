import React,{useState} from 'react'

 const AuthContext=React.createContext({
    token: '',
    email:'',
    isLoggedIn: false,
    login:(token)=>{},
    logout: ()=>{}

})


export function AuthProvider(props) {
const intialtoken=localStorage.getItem('token')
const intialemail=localStorage.getItem('email')
const [token, setToken] = useState(intialtoken)
const [email,setEmail] = useState(intialemail)
// const [loading,setLoading]=useState(true)
  const userIsLoggedIn=!!token;
  const loginHandler=(token,email)=>{
    localStorage.setItem('token',token)
    localStorage.setItem('email',email)
    setToken(token)
    setEmail(email)
  }  
  const logoutHandler=()=>{
      setToken(null)
      localStorage.removeItem('token')
      localStorage.removeItem('email')
  }
const contextValue={
    token: token,
    email:email,
    isLoggedIn: userIsLoggedIn,
    login:loginHandler,
    logout: logoutHandler

}



    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext
