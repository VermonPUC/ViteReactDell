import { useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import { Numeros} from "../Components/Numeros"
import { Button } from "../Components/Button"
import axios from 'axios'


export const Cadastro = () => {
  const [escolhas, mudaEscolhas] = useState([])
  const [counter, setCounter] = useState(0)
  console.log(escolhas)

  

  const remove = (e) => {
    var x = escolhas.filter((item) => item != e)   
    mudaEscolhas(x)
  }

  const getApostas = async () => {
    const result = await axios.get("http://localhost:3000/apostas")
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    await axios.post("")
  }

  useEffect(() => {
    getApostas()
  }, [])
  

  setTimeout(
    () => setCounter(counter + 1),
    1000
  )
  console.log(2)
  
  
  return (
    <div>
        <h1>MEGA SENA DELL {counter}</h1>
      <div>
        <form onSubmit={(e) => onsubmit}>
          <label>NOME:</label>
          <input type='text'></input>
          <label>CPF:</label>
          <input type='numbers'></input>
          <p>SELECIONE 5 NÚMEROS PARA APOSTAR:</p>
          <div>
              <Numeros escolhas = {escolhas} func = {remove}/>
          </div>
          <p>
          <input type='Submit' value='Cadatrar aposta' readOnly={true}></input>
          </p>
        </form>
        
      </div>
      <div>
        <h1>
          LISTA DE APOSTAS
        </h1>
        <section>
          <article>
            
          </article>
        </section>
      </div>

      

    </div>
  )
}


