import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios'

export const Sorteio = () => {
    const [sorteio, setSorteio] = useState({})
    const [counter, setCounter] = useState(0)
    const [apostas, setApostas]= useState([])

    const getSorteio = async () => {
        await axios.get("http://localhost:3000/sorteio").then((resp) => {
            setSorteio(resp.data)
            setApostas(resp.data.apostas_vencedoras)
            console.log(resp.data)
        })
    }

    const getApostas = async () => {
        const result = await axios.get("http://localhost:3000/apostas").then((resp) => {
            setApostas(result.data)
        })
      }

    setTimeout(
    () => {
      setCounter(counter + 1)
    },
    1000
  )
  

    useEffect(() => {
        getSorteio()
      },[])


    return(

        <div className="flex flex-col items-center justify-left p-4 " >
            <h1 className="text-5xl font-bold text-blue-500">SORTEIO MEGA-SENA DELL</h1>

            <h1 className="text-5xl font-bold text-black">Números Sorteados:</h1>
            
            <h1 className="text-5xl font-bold text-black">{!("rodada" in sorteio) ? "Carregando..." : (
                <div className={"" + (sorteio.venceu ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50')}>
                {sorteio.numeros_sorteados.slice(0, 5).map((element) => (
                  <span key={element} >{element} </span>
                ))}
                </div>
            )}</h1>


            <h3 className="text-2xl font-bold text-black">{!("rodada" in sorteio) ? "" : (
                <div className={"" + (sorteio.venceu ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50')}>
                {sorteio.numeros_sorteados.slice(5, 50).map((element) => (
                  <span key={element} >{element} </span>
                ))}
                </div>
            )}</h3>

            <h1 className={"text-5xl font-bold " + (sorteio.venceu ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50')}> 
            {(sorteio.venceu == true )? "Acertaram: " + sorteio.apostas_vencedoras.length + " apostas!" : "Ninguém acertou!"}
            </h1>

            <div>
                <h2 className="text-5xl font-bold text-black">Quantidade de rodadas: {sorteio.rodada}</h2>
            </div>

            <div>
                <div>
                        <h1 className="text-2xl font-bold text-black">
                        Lista de ganhadores
                        </h1>
                        <section className='flex flex-col gap-1'>
                        {apostas.length === 0 ? 'Nenhuma aposta vencedora.' : (
                            apostas.map((aposta) => (
                                <div className="flex">
                                <article className='bg-grey-200 rounded p-1 gap-2'>
                                <p >Id: {aposta.id}</p>
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
                   

            <div>
            <button className="bg-yellow-500 text-white p-2 ml-2 rounded text-lg w-auto" >{<Link to="/Premiacao">Premiação</Link>}</button>
            </div>
        </div>
    )
}
