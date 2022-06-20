import './StartScreen.css'

const StartScreen = ({start}) => {
  return (
    <div className="startContainer">
      <h1>Secret Words</h1>
      <p>Clique no Botão Abaixo para Começar a Jogar</p>
      <button onClick={start}>Iniciar Jogo</button>
      <p className='author'>by: Gabriel Rojo</p>
    </div>
  )
}

export default StartScreen

