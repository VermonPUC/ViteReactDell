import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios'

export const Sorteio = () => {
    const [sorteio, setSorteio] = useState({})
    const [counter, setCounter] = useState(0)
    const [apostas, setApostas] = useState([])
    const [numeros_ord, setNumOrd] = useState([])

    const getSorteio = async () => {
        await axios.get("http://localhost:3000/sorteio").then((resp) => {
            setSorteio(resp.data)
            setApostas(resp.data.apostas_vencedoras)
            setNumOrd(arrayToObjectList(resp.data.numeros_apostados))
            console.log(resp.data)
            console.log(arrayToObjectList(resp.data.numeros_apostados))
        })
    }

    const arrayToObjectList = (array) => {
        const objectsArray = array.map((value, index) => ({ indice: index + 1, valor: value }));
        objectsArray.sort((a, b) => b.valor - a.valor);
        return objectsArray;
    }

    setTimeout(
        () => {
            setCounter(counter + 1)
        },
        1000
    )


    useEffect(() => {
        getSorteio()
    }, [])


    return (

        <div className="flex flex-col items-center p-8 " >
            <h1 className="text-5xl font-bold text-blue-600">SORTEIO MEGA-SENA DELL</h1>
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
                {(sorteio.venceu == true) ? "Acertaram: " + sorteio.apostas_vencedoras.length + " apostas!" : "Ninguém acertou!"}
            </h1>

            <div>
                <h2 className="text-5xl font-bold text-black">Quantidade de rodadas: {sorteio.rodada}</h2>
            </div>

            <div className="p-2">
                <div>
                    <h1 className="text-2xl font-bold text-black">
                    {apostas.length === 0 ? '' : 'Lista de ganhadores:'}
                    </h1>
                    <section className='flex flex-col gap-1'>
                        {apostas.length === 0 ? 'Nenhuma aposta vencedora.' : (
                            apostas.map((aposta) => (
                                <div key={aposta.id} className="flex">
                                    <article className='bg-indigo-50 rounded p-1 gap-2'>
                                        <p >Id: {aposta.id}</p>
                                        <p>Nome: {aposta.name}</p>
                                        <p>CPF: {aposta.cpf}</p>
                                        <p>Números apostados: {(aposta.numeros.map((num) => (
                                            <span key={num}>{num} </span>
                                        )))}</p>
                                    </article>
                                </div>

                            ))
                        )}
                    </section>
                </div>


            </div>
            <div className="max-h-60 overflow-y-scroll ">
                <table className="table-fixed">
                    <thead className="sticky top-0">
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">Número</th>
                            <th className="px-4 py-2">Quantidade de apostas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {numeros_ord ? (
                            numeros_ord.map((elem) => (
                                <tr key={elem.indice} className="border-b">
                                    <td className="px-4 py-2">{elem.indice}</td>
                                    <td className="px-4 py-2 text-right">{elem.valor}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="px-4 py-2">
                                    Carregando dados...
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>


            <div>
                <button className="bg-yellow-500 text-white p-2 ml-2 rounded text-lg w-auto hover:shadow-lg hover:-translate-y-1 hover:translate-x-1 duration-100 hover:bg-yellow-600" >{<Link to="/Premiacao" state={apostas}>Premiação</Link>}</button>
            </div>


        </div>
    )
}
