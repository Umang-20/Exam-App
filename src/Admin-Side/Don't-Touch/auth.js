import { createSlice } from '@reduxjs/toolkit'


const authentiction=createSlice({
    name:'auth',
    initialState:{
    token: '',
    email:'',
    isLoggedIn: false,
    isAdmin:false,
   
    },
reducers:{

  async signup(state,action){
    const maketoken=()=> {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 50; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
      charactersLength));
       }
       return result;
      }
      
      const data=action.payload
      await fetch('https://react-http-4c723-default-rtdb.asia-southeast1.firebasedatabase.app/user.json',
        {
        method: 'POST',
        body:JSON.stringify({
          email:data.email,
          password:data.password,
          Admin:data.isAdmin,
          idToken:maketoken()
        }),
        headers: {
            'Content-Type': 'application/json'
        }
      })  
  } ,
      async login(state,action){
        const response= await fetch('https://react-http-4c723-default-rtdb.asia-southeast1.firebasedatabase.app/user.json')
        
        
        try{
          if(!response.ok){
            throw new Error('Failed')
          }
          const data=await response.json()
          
          // const matched=data.find(key=>data[key].email === action.payload.email)
          // console.log(matched)
         
          for(let key in data){
              if(data[key].email === action.payload.email && data[key].password === action.payload.password ){
                state.email=action.payload.email
                state.token=data[key].idToken
                state.isLoggedIn=true
                state.isAdmin=data[key].Admin
                localStorage.setItem('token',state.token)
                localStorage.setItem('email',state.email)
              }
          }
          
            

        }catch(error){
              alert(error.message)
          }

      }, 
  logout(){
     
  }
}
    
})

export const authfn=authentiction.actions
export default authentiction.reducer