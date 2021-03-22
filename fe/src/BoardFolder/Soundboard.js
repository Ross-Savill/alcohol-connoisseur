import React, { useEffect, useState } from 'react';
import '../Stylesheets/BoardFolder/Soundboard.css';
import snore from '../MyUtilitiesFolder/SoundEffects/Snore.mp3';
import cider from '../MyUtilitiesFolder/SoundEffects/Cider.mp3';
import cocktail from '../MyUtilitiesFolder/SoundEffects/Cocktail.mp3';
import gin from '../MyUtilitiesFolder/SoundEffects/Gin.mp3';
import rating from '../MyUtilitiesFolder/SoundEffects/Rating.mp3';
import ipa from '../MyUtilitiesFolder/SoundEffects/IPA.mp3';
import prosecco from '../MyUtilitiesFolder/SoundEffects/Prosecco.mp3';
import vodka from '../MyUtilitiesFolder/SoundEffects/Vodka.mp3';
import whiskey from '../MyUtilitiesFolder/SoundEffects/Whiskey.mp3';
import wine from '../MyUtilitiesFolder/SoundEffects/Wine.mp3';
import good from '../MyUtilitiesFolder/SoundEffects/Good.mp3';
import pay from '../MyUtilitiesFolder/SoundEffects/Pay.mp3';
import bubbly from '../MyUtilitiesFolder/SoundEffects/Bubbly.mp3';
import speed from '../MyUtilitiesFolder/SoundEffects/Speed.mp3';

const Soundboard = ({ setDisplaySoundboard }) => {

  const [ stateAudio, setStateAudio] = useState(null)
  const [ currentlyPlaying, setCurrentlyPlaying ] = useState(false)

  const handleCancel = (e) => {
    if(e.target.classList.contains('soundboardDiv') || e.target.classList.contains('soundboardContainer')) {
      setDisplaySoundboard(false)
    }
  }

  const playSound = (chosenSound) => {
    setStateAudio(chosenSound)
  }

  useEffect(() => {
    if(stateAudio) {
      let audio = new Audio(stateAudio)
      audio.play()
      audio.onended = function(){ setStateAudio(null) }
    }
  },[stateAudio])

  return(

  <div className="soundboardDiv" onClick={(e) => handleCancel(e) }>
    <div className="soundboardContainer">
      <div className="soundboardTable">
        <div className="soundboardGrid">
          <h1 className="soundboardTitle">The Drink And Rate Soundboard</h1>
          <button className="snoreButton" onClick={() => playSound(snore)}></button>
          <button className="ciderButton" onClick={() => playSound(cider)}></button>
          <button className="cocktailButton" onClick={() => playSound(cocktail)}></button>
          <button className="ginButton" onClick={() => playSound(gin)}></button>
          <button className="ratingButton" onClick={() => playSound(rating)}></button>
          <button className="proseccoButton" onClick={() => playSound(prosecco)}></button>
          <button className="ipaButton" onClick={() => playSound(ipa)}></button>
          <button className="vodkaButton" onClick={() => playSound(vodka)}></button>
          <button className="whiskeyButton" onClick={() => playSound(whiskey)}></button>
          <button className="wineButton" onClick={() => playSound(wine)}></button>
          <button className="goodButton" onClick={() => playSound(good)}></button>
          <button className="payButton" onClick={() => playSound(pay)}></button>
          <button className="bubblyButton" onClick={() => playSound(bubbly)}></button>
          <button className="speedButton" onClick={() => playSound(speed)}></button>
        </div>
      </div>
    </div>
  </div>
  )

}
export default Soundboard;
