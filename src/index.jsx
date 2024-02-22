import React, { createContext, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './header';
// import Main from './main';
import Footer from './footer';
import Downloadsong from './downloadSong';
const Main = React.lazy(()=> import("./main.jsx")); //lazyload should be at last

const Audic=()=>{
  const [apiData, setApiData] = useState(null);
  const [currentSong, setCurrentSong]=useState(null);
  const [songIndex, setSongIndex]=useState(0);
  const [listIndex, setListIndex]=useState(0);
    useEffect(() => {
        const fetchData = async () => {
        try{
            await fetch('https://raw.githubusercontent.com/abhiram945/api/main/api.json').then(response=>response.json()).then(jsonData=>setApiData(jsonData));
        }
        catch(error){
            console.error();
        }
        };
        fetchData();
    }, []);
    return <>
        <musicContext.Provider value={{apiData, setApiData, currentSong, setCurrentSong, songIndex, setSongIndex, listIndex, setListIndex}}>
          <BrowserRouter>
            <Header/>
            <Routes>
              <Route path='/audic' element={
                <React.Suspense fallback={
                  <main className='flex justifyCenter alignCenter w-100 loadingContainer'>
                    <img src='assets/logo.svg' alt='logo'/>
                    <p>Loading...</p>
                  </main>
                }>
                  <Main/>
                </React.Suspense>
              }/>
              <Route path='/audic/:song' element={<Downloadsong/>}/>
            </Routes>
            <Footer/>
          </BrowserRouter>
      </musicContext.Provider>
    </>
}

const musicContext = createContext();
ReactDOM.createRoot(document.getElementById('root')).render(
  <Audic/>
)
export {musicContext};
