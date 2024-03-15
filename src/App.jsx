import { useState } from 'react'

const App = () => {

  const [ counter, setCounter ] = useState(0)
  const [ num_escolhas, setEscolha ] = useState(0)
  const max_escolhas = 5
  const [escolhas, mudaEscolhas] = useState([])

  const updateEscolhas = (a) => {
    mudaEscolhas(escolhas => escolhas.filter((item) => {
      return item != a
    }))
  }
   

  console.log(escolhas)

  setTimeout(
    () => setCounter(counter + 1),
    1000
  )
  return (

    <div>
      <div>
        <h1>MEGA SENA DELL {counter}</h1>
      </div>
    <div>
    <form>
      <label>Número da aposta:
        <input type="number" />
      </label>
    </form>
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th>Número apostado</th>
            <th>Quantidade apostas {counter}</th>
          </tr>
        </thead>
      </table>
      <ButtonC value ={1} escolhas = {escolhas} updateEscolhas = {updateEscolhas}/> 
      <ButtonC value ={2} escolhas = {escolhas} updateEscolhas = {updateEscolhas}/>
      <ButtonC value ={3} escolhas = {escolhas} updateEscolhas = {updateEscolhas}/> 
    </div>  
    </div>
  )
}

const  ButtonC = (props) => {
  const [ clicked, setclick ] = useState(false)
  const value = props.value

  const handleClick = () =>{
    console.log(value)
    setclick(!clicked)
    if(!clicked){
      props.escolhas.push(value)
    }else{
      props.escolhas.pop()
    }
  }
  
  return(
    <div>
      <button
        onClick={handleClick}
        style={{ backgroundColor: clicked ? "green" : "red" }}
      >
        {props.value}
      </button>
    </div>
  )
}



export default App