import React from 'react';

import UserList from './userList';

import { BrowserRouter, Routes, Route } from "react-router-dom";
function App(){
    return (
        <BrowserRouter>
           
            <Routes>
               <Route path ='/' element={<UserList/>}></Route>
        
            </Routes>
        </BrowserRouter>
      
     
    );
}
export default App;