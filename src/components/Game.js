import { useState, useRef } from 'react'
import './Game.css'

const Game = ({verify, tries, score, pickedCategory, guessedLetters, wrongLetters, letters}) => {
  const [letter, setLetter] = useState("")
  const refInput = useRef(null)

  const handleForm = (e) => {
    e.preventDefault()
    verify(letter)
    refInput.current.focus()
    setLetter("")
    
  }

  return (
    <div className="gameContainer">
      <p className="score">Pontuação: <span>{score}</span></p>
      <h1>Adivinhe a Palavra</h1>
      <h3 className='tip'>A palavra sorteada pertence a seguinte categoria: <span>{pickedCategory}</span></h3>
      <p className="tries">Você tem <span>{tries}</span> changes para acertar</p>
      <div className="letterContainer">
        {letters.map(letter => (
          guessedLetters.includes(letter) ? (<span className="letter">{letter}</span>) : (<span className="blankSpace"></span>)
        ))}
      </div>
      <div className='formContainer'>
        <form className='form' onSubmit={handleForm}>
          <input ref={refInput} value={letter} onChange={e => setLetter(e.target.value)} type="text" required maxLength={1}/>
          <button>Enviar</button>
        </form>
        <h3>Tentativas Incorretas:</h3>
        <span>{wrongLetters}</span>
      </div>
    </div>
  )
}

export default Game