import './index.css';
import './header.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {useContext} from 'react';
import { musicContext } from './index';
const Header=()=>{
    const {apiData, setCurrentSong}=useContext(musicContext);
    const [activeMenu, setActivemenu]=useState(false);
    const [filteredSongs, setFilteredSongs]=useState([]);
    const handleSearch=(event)=>{
        if(event.target.value!=="" && event.target.value!==" "){
            const filteredSongs=apiData.allLists.map((list,listIndex)=>(
                list.filter((song,songIndex)=>song.toLowerCase().includes((event.target.value).toLowerCase()))
            ));
            setFilteredSongs(filteredSongs);
        }
        else{
            setFilteredSongs([]);
        }
    }
    return<header className='flex alignCenter spaceBetween w-100'>
        <div className="logoContainer">
            <Link to='/audic/'>
                <img src="assets/logo.svg" alt="logo"/>
            </Link>
        </div>
        <div className="inputContainer">
            <input type="text" placeholder="search for song" onChange={(event)=>handleSearch(event)}/>
            <img src='assets/searchIcon.svg' alt='seachIcon'/>
            <div className={`searchResultsContainer ${filteredSongs.length>0?'flex':'none'}`}>
                {filteredSongs
                .filter(songList => songList.length > 0) // Filter out empty arrays
                .map((songList, listIndex) => (
                    songList.map((song, index) => (
                        <p key={index} onClick={()=>{setCurrentSong(song); setFilteredSongs([])}}>{song}</p>
                    ))
                ))
                }            
            </div>
        </div>
        <div className='iconsContainer none block'>
            {activeMenu ? <img src='assets/closeIcon.svg' alt='closeIcon' onClick={()=>{setActivemenu(false);document.querySelector('#root aside').classList.remove('asideActive');}}/>:
            <img src='assets/queueIcon.svg' alt='queueIcon' onClick={()=>{setActivemenu(true);document.querySelector('#root aside').classList.add('asideActive');}}/>
            } 
        </div>
    </header>
}
export default Header;