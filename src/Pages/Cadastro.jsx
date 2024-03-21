import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { Numeros } from "../Components/Numeros"
import axios from 'axios'


export const Cadastro = () => {

  // state que indica se existe erro nos campos de input
  const [error, setError] = useState(false)

  // state representa os numeros selecionados
  const [escolhas, mudaEscolhas] = useState([])

  // state do campo de input name
  const [name, setName] = useState('')

  // state do campo de input cpf
  const [cpf, setCPF] = useState('')

  // state das apostas registradas
  const [apostas, setApostas] = useState([])

  // state para realizar o cadastro
  const [post, setPost] = useState({
    name: name,
    cpf: cpf,
    numeros: escolhas
  })


  /*funcao que sera passada para o componente Button remover do state 'escolhas' os numeros clicados*/
  const remove = (e) => {
    mudaEscolhas(prevEscolhas => {
      //ve se o valor do botao está entre as escolhas e caso nao esteja remove o valor das escolhas.
      const updatedEscolhas = prevEscolhas.filter(item => item !== e);
      return updatedEscolhas;
    });
  }

  /*funcao que sera passada para o componente Button adicionar do state 'escolhas' os numeros clicados*/
  const adiciona = (e) => {
    mudaEscolhas(escolhas.concat(e));
  }

  /*busca todas as apostas do banco*/
  const getApostas = async () => {
    const result = await axios.get("http://localhost:3000/apostas")
    setApostas(result.data)
  }


  /*verifica os campos de input e envia para o endpoint de cadastro o state 'post'*/

  const onSubmit = async (e) => {
    e.preventDefault()
    //regex para o cpf
    const cpfRegex = new RegExp("^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$")

    //caso algo esteja errado, seta o state erro como true, caso contrário é false
    if (post.name === "" || post.cpf === "" || post.numeros.length < 5 || !cpfRegex.test(post.cpf)) {
      setError(true)
      return
    }
    setError(false)

    //envia o state post e concatena no array de apostas a resposta da requisicao (o próprio post)
    await axios.post("http://localhost:3000/cadastra", post).then((novoCadastro) => {
      setApostas(apostas.concat(novoCadastro.data))  
    }).catch(() => setError(true))

  }

  //gerar numeros aleatorios de 1-50
  const getRandomInt = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }

  //faz uma requisicao de delete de uma aposta pelo id, e tambem remove do state de lista de apostas
  const deleta = async (e) => {
    await axios.delete("http://localhost:3000/deleta/", {params: {id: e}}).then(() =>{
      const todasApostas = apostas.filter((aposta) => aposta.id !== e)
      setApostas(todasApostas)
    })

  }


  //gera 5 numeros aletorios que serao a escolha de aposta
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
    mudaEscolhas(array)

  }

  //atualiza o state post quando qualquer campo dentro do array [name, cpf, escolhas] mudar.
  useEffect(() => {
    setPost({
      ...post,
      name: name,
      cpf: cpf,
      numeros: escolhas
    })
  }, [name, cpf, escolhas])

  //carrega apostas que estejam no banco ao carregar a pagina
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
              <input className='p-1 bg-gray-200 w-full' type='text' placeholder="Nome do dono da aposta" onChange={(e) => { setName(e.target.value) }}></input>
            </div>

            <div className="space-x-1">
              <label>CPF:</label>
              <input className='p-1 bg-gray-200 w-full' type='text' placeholder="Ex.: 123.456.789-10" onChange={(e) => { setCPF(e.target.value) }}></input>
            </div>

            <div>
              <p>Números selecionados para a aposta:</p>
              <p className='text-bold text-green-900'>
                {escolhas.map((x) => (
                  <span key={x}>{x} </span>
                ))}
              </p>
            </div>


            <div className='flex'>
              <input className='w-1/2 p-2 bg-green-700 text-white rounded text-lg hover:shadow-lg hover:-translate-y-1 hover:translate-x-1 duration-100 hover:bg-green-800' type='Submit' value='Cadatrar aposta' readOnly={true}></input>
              <button className='w-1/2 bg-yellow-500 text-white p-2 rounded text-lg hover:shadow-lg hover:-translate-y-1 hover:translate-x-1 duration-100 hover:bg-yellow-600' onClick={surpresinha} type="button"> Surpresinha</button>
            </div>
            <div>
            {(error ? <span className='text-red bg-red-50'>Preencha todos os campos corretamente para enviar a aposta.</span> : "")}
            </div>

          </form>
        </div>
        <div className=''>
          <Numeros escolhas={escolhas} func={remove} func2={adiciona}/>
        </div>
        <div>
          <button className='bg-red-500 text-white p-2 rounded text-lg w-full hover:shadow-lg hover:-translate-y-1 hover:translate-x-1 duration-100 hover:bg-red-600'>{<Link to="/Sorteio">Finalizar cadastros e iniciar sorteio</Link>}</button>
        </div>
      </div>
      <div>
        <h1 className='text-2xl font-bold text-black ml-10'>
          LISTA DE APOSTAS
        </h1>
        <section className='grid grid-cols-4 max-w p-2 m-8'>
          {apostas.length === 0 ? (<p>Aguardando apostas...</p>) : (
            apostas.map((aposta) => (
              <div key={aposta.id} className="flex">
                <article className='bg-green-200 rounded p-1 gap-2 m-4'>
                  <p className="bg-green-500 text-white text-2px rounded">Id: {aposta.id || 'Carregando...'}</p>
                  <p>Nome: {aposta.name}</p>
                  <p>CPF: {aposta.cpf}</p>
                  <p>Números apostados: {(aposta.numeros.map((num) => (
                    <span key={num}>{num} </span>
                  )))}</p>
                  <button type='button' className="text-white bg-red-500 h-6 rounded text-lg w-auto h-auto hover:shadow-lg hover:scale-105 duration-100 hover:bg-red-600" onClick={() => deleta(aposta.id)}>
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


