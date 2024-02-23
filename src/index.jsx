import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './header';
import Main from './main';
import Footer from './footer';
import Downloadsong from './downloadSong';
import { createContext, useState, useEffect } from 'react';

const Audic=()=>{
    const [apiData, setApiData] = useState(null);
    const [currentSong, setCurrentSong]=useState(null);
    const [songIndex, setSongIndex]=useState(0);
    const [listIndex, setListIndex]=useState(0);
    const shuffleData = (data) => {
    const shuffledData = { ...data };
    shuffledData.allLists = shuffledData.allLists.map(array => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    });
    return shuffledData;
    };
    useEffect(() => {
    const fetchData = async () => {
    try{
        await fetch('assets/api.json').then(response=>response.json()).then(jsonData=>shuffleData(jsonData)).then(shuffledData=>setApiData(shuffledData));
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
                <Route path='/audic' element={<Main/>}/>
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
