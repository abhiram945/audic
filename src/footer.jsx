import './index.css';
import './footer.css';
import { Link } from 'react-router-dom';
import { useRef, useState, useContext } from 'react';
import { musicContext } from './index';
const Footer=()=>{
  const seekBarRef= useRef(null);
  const audioRef= useRef(null);
  const {apiData,setApiData,currentSong, setCurrentSong, songIndex, setSongIndex, listIndex, setListIndex}=useContext(musicContext);
  const [width, setWidth]=useState(0);
  const [value, setValue]=useState(0);
  const [isplaying, setIsplaying] = useState(false);
  const handleChange=()=>{
    setWidth(audioRef.current ? `${(audioRef.current.currentTime/(audioRef.current.duration+750) *100)}%`:'0');
    audioRef.current.currentTime= audioRef.current ? seekBarRef.current.value:0;
  }
  const handleTimeUpdate=()=>{
    setValue(audioRef.current? audioRef.current.currentTime:0);
    setWidth(audioRef.current ? `${(audioRef.current.currentTime/audioRef.current.duration *100)}%`:'0');
  }
  const playNext=()=>{
    const nextSongIndex = (songIndex+1)%apiData.allLists[listIndex].length;
    setSongIndex(nextSongIndex);
    setCurrentSong(apiData.allLists[listIndex][nextSongIndex]);
  }
  const playPrevious=()=>{
    const previousSongIndex = (songIndex-1+apiData.allLists[listIndex].length)%apiData.allLists[listIndex].length;
    setSongIndex(previousSongIndex);
    setCurrentSong(apiData.allLists[listIndex][previousSongIndex]);
  }
  return <footer className='flex alignCenter w-100'>
    <audio ref={audioRef} src={currentSong ? `assets/music/${currentSong}.mp3`:null} autoPlay onLoadedMetadata={()=>setWidth(0)} onTimeUpdate={()=>{handleTimeUpdate()}} onPlay={()=>setIsplaying(true)} onEnded={()=>{playNext()}}/>
    <div className='seekBarContainer'>
      <div className='seekBarBackground' style={{width:`${width}`}}></div>
      <input className='seekBar' ref={seekBarRef} type='range' value={value} min={0} max={audioRef.current ? audioRef.current.duration:0} onChange={()=>{handleChange()}}/>
    </div>
    <div className='songImgNameContainer flex alignCenter justifyLeft'>
      {currentSong?<>
        <img src={`assets/music/${currentSong}.jpg`} alt='songThumbnail'/>
        <h2>{currentSong}</h2></>
        : ''}
    </div>
    <div className='middleIconsContainer flex alignCenter spaceBetween'>
      <img src='assets/prevIcon.svg' alt='prevIcon' onClick={()=>playPrevious()}/>
      {isplaying ?
        <img src='assets/pauseIcon.svg' alt='pauseIcon' onClick={()=>{audioRef.current.pause(); setIsplaying(false)}}/>
      : <img src='assets/playIcon.svg' alt='playIcon' onClick={()=>{if(currentSong!=null){audioRef.current.play();setIsplaying(true)}}}/>
      }
      <img src='assets/nextIcon.svg' alt='nextIcon' onClick={()=>playNext()}/>
    </div>
    <div className='downloadIconContainer flex justifyCenter'>
      <Link to={currentSong!=null?`/8d/${currentSong}`:'/8d/'}>
        <img src='assets/downloadIcon.svg' alt='downloadIcon'/>
      </Link>
    </div>
  </footer>
}

export default Footer;