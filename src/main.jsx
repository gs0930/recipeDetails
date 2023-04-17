import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Layout from './routes/Layout';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailView from './routes/DetailView';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}

   <BrowserRouter>
   <Routes>
     <Route path="/" element={<Layout />}>
       <Route index={true} element={<App />} />
       <Route index={false} path="/foodDetails/:title" element={<DetailView />} />
       {/* <Route index={false} path="/foodDetails/:recipe.title" element={<DetailView />} /> */}

     </Route>
   </Routes>
 </BrowserRouter>
 </React.StrictMode>
)
