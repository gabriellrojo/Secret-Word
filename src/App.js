//CSS
import './App.css';

//Components
import StartScreen from './components/StartScreen.js'
import Game from './components/Game.js'
import GameOver from './components/GameOver.js'

//data
import { wordList } from './data/words.js'

//Hooks
import { useEffect, useState } from 'react';

function App() {

  const stages = [
    {id:1, name:'home'},
    {id:2, name:'start'},
    {id:3, name:'end'}
  ]

  const [gameStage, setGameStage] = useState(stages[0].name)
  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState("")
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [tries, setTries] = useState(3)
  const [score, setScore] = useState(0)

  const pickCategoryAndWord = () => {
    const categories = Object.keys(wordList)
    const category = categories[Math.floor(Math.random()*categories.length)]
    const word = wordList[category][Math.floor(Math.random()*wordList[category].length)]

    let arrayLetters = word.split("")
    arrayLetters = arrayLetters.map(letter => letter.toLowerCase())

    console.log(category)
    console.log(word)
    console.log(arrayLetters)

    return { category, word, arrayLetters }

  }

  const start =  () => {
    setGameStage(stages[1].name)

    const { category, word , arrayLetters} = pickCategoryAndWord()

    setPickedCategory(category)
    setPickedWord(word)
    setLetters(arrayLetters)
    
  }

  const verify = (letter) => {
    console.log(letter)
    const normLetter = letter.toLowerCase()

    if(guessedLetters.includes(normLetter) || wrongLetters.includes(normLetter)){
      return;
    }

    if(letters.includes(normLetter)){
      setGuessedLetters(prevGuessedLetters => [
        ...prevGuessedLetters,
        normLetter
      ])
    }else{
      setWrongLetters(prevWrongLetters => [
        ...prevWrongLetters,
        normLetter.toUpperCase(),
        ", "
      ])

      setTries(prevTries => prevTries - 1)
    }
  
  }

  useEffect( () => {
    if(tries<1){
      setGameStage(stages[2].name)
      

    }
  }, [tries])

  useEffect( () => {
    const normLetters = [...new Set (letters)]
    if(normLetters.length === guessedLetters.length && gameStage === "start"){
      setScore(prevScore => prevScore += 100)
      setWrongLetters([])
      setGuessedLetters([])
      start()
    }

  },[guessedLetters])


  const retry = () => {
    setGameStage(stages[0].name)
    setScore(0)
    setTries(3)
    setGuessedLetters([])
    setWrongLetters([])
  }

  return (
    <div className='App'>
      {gameStage === "home" && <StartScreen 
      start={start}/>}
      {gameStage === "start" && <Game 
      verify={verify}
      letters={letters}
      score={score}
      tries={tries}
      pickedCategory={pickedCategory}
      guessedLetters={guessedLetters}
      wrongLetters={wrongLetters}/>}
      {gameStage === "end" && <GameOver 
      retry={retry}
      score={score}/>}
    </div>
  );
}

export default App;
