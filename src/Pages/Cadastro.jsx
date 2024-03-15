import { useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import { Numeros} from "../Components/Numeros"
import { Button } from "../Components/Button"


export const Cadastro = () => {
  const [escolhas, mudaEscolhas] = useState([])
  const [counter, setCounter] = useState(0)
  console.log(escolhas)

  const remove = (e) => {
    var x = escolhas.filter((item) => item != e)   
    mudaEscolhas(x)
  }
  

  setTimeout(
    () => setCounter(counter + 1),
    1000
  )
  console.log(2)
  
  
  return (
    <div>
        <h1>MEGA SENA DELL {counter}</h1>
      <div>
        <form>
          <label>NOME:</label>
          <input type='text'></input>
        </form>
        <form>
          <label>CPF:</label>
          <input type='numbers'></input>
        </form>
        <form>
          <label>Aposta</label>
          <input type='numbers'></input>
          <input type='submit' value='Cadastrar aposta' readOnly="readonly"/>
        </form>
        
      </div>
      {/* <Button value = {1} array = {escolhas} func = {remove}> </Button>
      <Button value = {2} array = {escolhas} func = {remove}> </Button>
      <Button value = {3} array = {escolhas} func = {remove}> </Button> */}
      <Numeros escolhas = {escolhas} func = {remove}/>

    </div>
  )
}


