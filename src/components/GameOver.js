import './GameOver.css'

const GameOver = ({retry, score}) => {
  return (
    <div className="gameOverContainer">
      <h1>Fim de Jogo</h1>
      <h3>Sua Pontuação foi de: <span>{score}</span> pontos</h3>
      <button onClick={retry}>Jogar Novamente</button>
    </div>
  )
}

export default GameOver