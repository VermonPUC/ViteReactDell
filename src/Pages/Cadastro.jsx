import { useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import { Numeros} from "../Components/Numeros"
import { Button } from "../Components/Button"
import axios from 'axios'


export const Cadastro = () => {
  const [idGlobal, setidGlobal] = useState(1000)
  const [escolhas, mudaEscolhas] = useState([])
  const [name, setName] = useState('')
  const [cpf, setCPF] = useState('')
  const [counter, setCounter] = useState(0)
  const [apostas, setApostas]= useState([])

  const [post, setPost]= useState({
    id: idGlobal,
    name: name,
    cpf: cpf,
    numeros: escolhas
  })

 //console.log(post.idP, post.numerosP, post.nameP, post.cpfP)

  const remove = (e) => {
    var x = escolhas.filter((item) => item != e)   
    mudaEscolhas(x)
  }

  const getApostas = async () => {
    const result = await axios.get("http://localhost:3000/apostas")
    setApostas(result.data)
  }

  const onSubmit = async () => {
      // e.preventDefault()
    setPost(post.id = idGlobal, post.name = name, post.cpf = cpf, post.numeros = escolhas)
    await axios.post("http://localhost:3000/cadastra", post).then(
      console.log("ENVIOU"),
      console.log(post.numeros),
      console.log(post.id),
      console.log(post.name),
      console.log(post.cpf),
      setidGlobal(idGlobal + 1)
    )
    
  }

  useEffect(() => {
    getApostas()
  },[])
  

  setTimeout(
    () => {
      setCounter(counter + 1)
    },
    1000
  )
  
  
  return (
    <div className='bg-grey-500'>
      <h1 className="text-3xl font-bold text-blue-500">MEGA SENA DELL {counter}</h1>
      <div>
        <form onSubmit={() => onSubmit()}>
          <label>NOME:</label>
          <input type='text' placeholder="Digite seu nome:" onChange={(e) => {setName(e.target.value)}}></input>
          <label>CPF:</label>
          <input type='text' placeholder="Ex.: 123.456.789-10" onChange={(e) => setCPF(e.target.value)}></input>
          <p>SELECIONE 5 NÚMEROS PARA APOSTAR:</p>
          <input type='Submit' value='Cadatrar aposta' readOnly={true}></input>
        </form>
      </div>
      <div className=''>
        <Numeros escolhas = {escolhas} func = {remove}/>
      </div>
      <div>
        <h1>
          LISTA DE APOSTAS
        </h1>
        <section className='flex flex-col gap-4'>
        {apostas.length === 0 ? (<p>Carregando...</p>) : (
              apostas.map((aposta) => (
                <div className="flex">
                  <article className='bg-green-200 rounded p-1'>
                  <p className='font-medium text-bold'>Nome: {aposta.name}</p>
                  <p>CPF: {aposta.cpf}</p>
                  <p >Números apostados: {(aposta.numeros.map((num) => (
                    <span>{num} </span>
                  )))}</p>
                  </article>
                </div>
                
              ))
            )}
        </section>
      </div>

      

    </div>
  )
}


