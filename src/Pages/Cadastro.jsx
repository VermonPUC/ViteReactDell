import { useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import { Numeros} from "../Components/Numeros"
import { Button } from "../Components/Button"
import axios from 'axios'
import { array } from 'prop-types'


export const Cadastro = () => {
  const [error, setError] = useState(false)
  const [escolhas, mudaEscolhas] = useState([])
  const [name, setName] = useState('')
  const [cpf, setCPF] = useState('')
  const [counter, setCounter] = useState(0)
  const [apostas, setApostas]= useState([])

  const [post, setPost]= useState({
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

  const onSubmit = async (e) => {
      e.preventDefault()

      if(post.name === "" || post.cpf === "" || post.numeros.length < 5){
        setError(true)
        return
      } 
      await axios.post("http://localhost:3000/cadastra", post).then(
      console.log("ENVIOU")
    ).catch(() => {
      setError(true)
    })
    setApostas(apostas => [...apostas, post])

  }

  function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }
  

  const surpresinha = () =>{
    var array = []
    for (var index = 0; index < 5; index++) {
      var a = getRandomInt(1,51)
      if(array.includes(a)){
        index --;
        continue
      }else{
        array.push(a)
      }
    }
    console.log("CHEGUei", array)

    mudaEscolhas(array)
        
  }

  useEffect(() => {

  }, [escolhas])


  useEffect(() => {
    setPost({
      ...post,
      name: name,
      cpf: cpf,
      numeros: escolhas
    })
  }, [name, cpf, escolhas])

  useEffect(() => {
    getApostas()
  },[])

  
  setTimeout(
    () => {
      setCounter(counter + 1)
      //console.log(escolhas)

    },
    1000
  )
  
  
  return (
    <div className='bg-grey-500'>
      <h1 className="text-3xl font-bold text-blue-500">MEGA SENA DELL {counter}</h1>
      <div>
        <form onSubmit={(e) => onSubmit(e)}>
          <label>NOME:</label>
          <input className='p-2' type='text' placeholder="Nome do dono da aposta" onChange={(e) => {setName(e.target.value), console.log(e.target.value)}}></input>
          <label>CPF:</label>
          <input className='p-2' type='text' placeholder="Ex.: 123.456.789-10" onChange={(e) => {setCPF(e.target.value) , console.log(e.target.value)}}></input>
          <p>SELECIONE 5 NÚMEROS PARA APOSTAR:</p>
          <div className='bg-grey-100'>
          <input className='p-2 bg-green-700 text-white rounded text-lg w-auto' type='Submit' value='Cadatrar aposta' readOnly = {true}></input>
          <button className='bg-yellow-500 text-white p-2 ml-2 rounded text-lg w-auto' onClick={surpresinha}> Surpresinha</button>
          {(error ? <span className='text-red bg-red-50'>Preencha corretamente os campos e tente novamente</span> : "")}
          </div>
        </form>
      </div>
      <div className=''>
        <Numeros escolhas = {escolhas} func = {remove}/>
      </div>
      <div>
        <button className='bg-red-500 text-white p-2 rounded text-lg w-auto'>{<Link to="/Sorteio">Finalizar cadastros e iniciar sorteio</Link>}</button>
      </div>
      <div>
        <h1>
          LISTA DE APOSTAS
        </h1>
        <section className='flex flex-col gap-1'>
        {apostas.length === 0 ? (<p>Carregando...</p>) : (
              apostas.map((aposta) => (
                <div className="flex">
                  <article className='bg-green-200 rounded p-1 gap-2'>
                  <p>Id: {aposta.id || 'Carregando...'}</p>
                  <p>Nome: {aposta.name}</p>
                  <p>CPF: {aposta.cpf}</p>
                  <p>Números apostados: {(aposta.numeros.map((num) => (
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


