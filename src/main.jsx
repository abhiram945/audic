import './main.css';
import './index.css';
import {useContext} from 'react';
import { musicContext } from './index';
const Main=()=>{
    const {apiData, setApiData, currentSong, setCurrentSong, songIndex, setSongIndex, listIndex, setListIndex}=useContext(musicContext);
    return<>
        <aside className='flex justifyCenter alignCenter'>
            <p className='useHeadphones'>Use Headphones 🎧<br/> to experience the<br/> 8D Immersive Multi Dimensional Music</p>
        </aside>
        {apiData ? (
            <main>
                {apiData.allLists.map((eachListName, eachListIndex) => (
                    <div key={eachListIndex} className='categoryContainer'>
                        <h2>{apiData.allListnames[eachListIndex]}</h2>
                        <div className='grid'>
                            {eachListName.map((eachSongName, eachSongIndex) => (
                                <div key={eachSongIndex} className='songThumbnailContainer'>
                                    <img src={`assets/music/${eachSongName}.jpg`} alt={eachSongName} onClick={()=>{
                                        setListIndex(eachListIndex);
                                        setSongIndex(eachSongIndex);
                                        setCurrentSong(apiData.allLists[eachListIndex][eachSongIndex]);
                                    }}/>
                                    <div className='flex songNamePlus spaceBetween alignCenter'>
                                        <p>{eachSongName}</p>
                                        <img src='assets/plusIcon.svg' alt='plusIcon'/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </main>
            ) :
            (<main className='flex justifyCenter alignCenter loadingContainer'>
                <img src='assets/logo.svg' alt='logo'/>
                <p>Loading...</p>
                <p className='mNone'>Use Headphones 🎧 to experience the Immersive 8D effect</p>
            </main>)
        }
    </>
}
export default Main;