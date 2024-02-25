import './main.css';
import './index.css';
import {useContext} from 'react';
import { musicContext } from './index';
const Main=()=>{
    const {apiData, setApiData, currentSong, setCurrentSong, songIndex, setSongIndex, listIndex, setListIndex, queue, setQueue,queueIndex,setQueueIndex}=useContext(musicContext);
    return<>
        <aside className='flex alignCenter justifyCenter'>
            <div className={`flex queueSongs ${queue.length===0?'':'alignTop'}`}>
            {
                queue.length>=1 ? queue.map((indexes,index) => <p key={index} className={index===queueIndex?'queueSong activeHover':'queueSong'} onClick={()=>{setCurrentSong(apiData.allLists[queue[index][0]][queue[index][1]]); setQueueIndex(index)}}>{apiData.allLists[indexes[0]][indexes[1]]}</p>):<p className='useHeadphones'>Use Headphones 🎧<br/> to experience the<br/> 8D Immersive Multi Dimensional Music</p>
            }
            </div>
            <button className='queueButton' onClick={()=>setQueue([])}>{queue.length===0?'Click on + to add to queue':'clear queue'}</button>
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
                                        <img src='assets/plusIcon.svg' alt='plusIcon'
                                        onClick={()=>{setQueue([...queue,[eachListIndex,eachSongIndex]])}}
                                        />
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