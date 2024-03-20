import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { Numeros } from "../Components/Numeros"
import axios from 'axios'


export const Cadastro = () => {
  const [error, setError] = useState(false)
  const [escolhas, mudaEscolhas] = useState([])
  const [name, setName] = useState('')
  const [cpf, setCPF] = useState('')
  const [counter, setCounter] = useState(0)
  const [apostas, setApostas] = useState([])

  const [post, setPost] = useState({
    name: name,
    cpf: cpf,
    numeros: escolhas
  })

  //console.log(post.idP, post.numerosP, post.nameP, post.cpfP)

  const remove = (e) => {
    mudaEscolhas(prevEscolhas => {
      const updatedEscolhas = prevEscolhas.filter(item => item !== e);
      return updatedEscolhas;
    });
  }
  const getApostas = async () => {
    const result = await axios.get("http://localhost:3000/apostas")
    setApostas(result.data)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const cpfRegex = /(\d{3})(\d{3})(\d{3})(\d{2})/
    console.log(cpfRegex.test(post.name))

    if (post.name === "" || post.cpf === "" || post.numeros.length < 5) {
      setError(true)
      return
    }
    await axios.post("http://localhost:3000/cadastra", post).then(
      console.log("ENVIOU")
    ).catch(() => {
      setError(true)
    }).finally(
      setError(false)
    )
    setApostas(apostas => [...apostas, post])

  }

  const getRandomInt = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }

  const deleta = async (e) => {
    await axios.delete("http://localhost:3000/deleta/", {params: {id: e}}).then((resp) => console.log(resp.data))
    console.log(e)
  }


  const surpresinha = () => {
    var array = []
    for (var index = 0; index < 5; index++) {
      var a = getRandomInt(1, 51)
      if (array.includes(a)) {
        index--;
        continue
      } else {
        array.push(a)
      }
    }
    console.log("CHEGUei", array)

    mudaEscolhas(array)

  }

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
  }, [])


  return (
    <div className='flex hover:flex-row justify-left mt p-4'>
      <div>
        <h1 className="text-5xl font-bold text-blue-600">MEGA-SENA DELL</h1>
        <div>
          <form className='flex flex-col space-y-4 mt-4' onSubmit={(e) => onSubmit(e)}>

            <div className="space-x-1">
              <label>Nome:</label>
              <input className='p-1' type='text' placeholder="Nome do dono da aposta" onChange={(e) => { setName(e.target.value) }}></input>
            </div>

            <div className="space-x-1">
              <label>CPF:</label>
              <input className='p-1' type='text' placeholder="Ex.: 123.456.789-10" onChange={(e) => { setCPF(e.target.value) }}></input>
            </div>

            <div>
              <p>Números selecionados para a aposta:</p>
              <p className='text-bold text-green-900'>
                {escolhas.map((x) => (
                  <span key={x}>{x} </span>
                ))}
              </p>
            </div>


            <div className='flex '>
              <input className='p-2 bg-green-700 text-white rounded text-lg w-auto hover:shadow-lg hover:-translate-y-1 hover:translate-x-1 duration-100 hover:bg-green-800' type='Submit' value='Cadatrar aposta' readOnly={true}></input>
              <button className='bg-yellow-500 text-white p-2 rounded text-lg hover:shadow-lg hover:-translate-y-1 hover:translate-x-1 duration-100 hover:bg-yellow-600' onClick={surpresinha} type="button"> Surpresinha</button>
              {(error ? <span className='text-red bg-red-50'>Preencha todos os campos para enviar a aposta.</span> : "")}
            </div>

          </form>
        </div>
        <div className=''>
          <Numeros escolhas={escolhas} func={remove} />
        </div>
        <div>
          <button className='bg-red-500 text-white p-2 rounded text-lg w-auto hover:shadow-lg hover:-translate-y-1 hover:translate-x-1 duration-100 hover:bg-red-600'>{<Link to="/Sorteio">Finalizar cadastros e iniciar sorteio</Link>}</button>
        </div>
      </div>
      <div>
        <h1 className='text-2xl font-bold text-black ml-10'>
          LISTA DE APOSTAS
        </h1>
        <section className='grid grid-cols-4 max-w p-2 m-8'>
          {apostas.length === 0 ? (<p>Nenhuma aposta</p>) : (
            apostas.map((aposta) => (
              <div key={aposta.id} className="flex">
                <article className='bg-green-200 rounded p-1 gap-2 m-4'>
                  <p className="bg-green-500 text-white text-2px">Id: {aposta.id || 'Carregando...'}</p>
                  <p>Nome: {aposta.name}</p>
                  <p>CPF: {aposta.cpf}</p>
                  <p>Números apostados: {(aposta.numeros.map((num) => (
                    <span key={num}>{num} </span>
                  )))}</p>
                  <button type='button' className="text-white bg-red-500 h-6 rounded text-lg w-auto h-auto hover:shadow-lg hover:-translate-y-1 hover:translate-x-1 duration-100 hover:bg-red-600" onClick={() => deleta(aposta.id)}>
                    Excluir
                  </button>
                </article>
              </div>

            ))
          )}
        </section>
      </div>
    </div>
  )
}


