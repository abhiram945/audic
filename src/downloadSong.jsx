import { useParams } from 'react-router-dom';
import {useState} from 'react';
import './index.css';
import './downloadSong.css';
const Downloadsong = () => {
    const {song} = useParams();
    const [countdown, setCountdown]=useState(16);
    const [displayItem, setDisplayItem]=useState(true);
    const handleCOuntDown=()=>{
        const interval = setInterval(()=>{setCountdown(prevCountdown => prevCountdown>0 ? prevCountdown-1 : 0)},1000);
        setTimeout(()=>{clearInterval(interval)}, 16000);
    }
    return<main className='downloadPageMain flex justifyCenter alignCenter'>
        <div className='songInfoContainer'>
            <p>Song name : <b>{song}</b></p>
            <p>Downoad {song} <span>8D song</span> here</p>
            <img src={`assets/music/${song}.jpg`} alt={song}/>
        </div>
        <div className='generateButtonContainer' style={{display : displayItem ? 'block':'none'}}>
            <button className='clickToGenerateLink' onClick={()=>{setDisplayItem(false); handleCOuntDown();}}>Click to generate link</button>
        </div>
        <div className='countDownDisplayContainer' style={{display :countdown<=15 ? 'block':'none'}}>
            <p>Link is being generated</p>
            <p>Wait for <b>{countdown}</b> more seconds</p>
        </div>
        <div className='downloadButtonContainer' style={{display:countdown===0 ? 'block':'none'}}>
            <a className='downloadButton' href={`assets/music/${song}.mp3`} download={`${song}-8dworld.mp3`} onClick={()=>{setCountdown(16); setDisplayItem(true)}}>Download</a>
        </div>
    </main>
};

export default Downloadsong;