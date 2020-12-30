import React, { useEffect } from 'react';
import ReactWordcloud from 'react-wordcloud';
import { __esModule } from 'reactstrap/lib/Container';
import { select } from "d3-selection";
import 'tippy.js/dist/tippy.css';

const RatingWordCloud = (props) => {

  let ratingWords = []
  useEffect(() => {
    if(props.sortedUniqueWords) {
      props.sortedUniqueWords.map((wordAndCount) => {
        ratingWords.push({ "text": wordAndCount[0], "value": wordAndCount[1]})
      })
    }
  },[props])

  const options = {
    rotations: 2,
    rotationAngles: [0, 45, 90],
    fontFamily: "impact",
    enableTooltip: true,
    spiral: "archimedean",
    fontSizes:[20, 100],
  };

  function getCallback(callback) {
    return function (word, event) {
      const isActive = callback !== "onWordMouseOut";
      const element = event.target
      const text = select(element);
      text.on("click", () =>  {
        if (isActive) {
          props.handleClickedWordChange(word.text)
        }
      })
    }
  }

  const callbacks = {
    onWordClick: getCallback("onWordClick"),
    onWordMouseOut: getCallback("onWordMouseOut"),
    onWordMouseOver: getCallback("onWordMouseOver")
  }

  return(
    <ReactWordcloud
      words={ratingWords}
      options={options}
      callbacks={callbacks}
    />
  )
}


export default RatingWordCloud;