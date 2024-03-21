import { Link, useLocation} from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios'

export const Premiacao = () => {

    const { state } = useLocation();
    const [nomes, setNomes] = useState([]);

    useEffect(() => {
        setNomes(ganhadoresUnicos(state))
    }, [])


    const zeraBanco = async () => {
        console.log("CLICOU")
        await axios.get("http://localhost:3000/zeraBanco/")

    }

    
    const ganhadoresUnicos = (state) =>{
        const names = []
        state.map((ob) => {
            console.log(ob.name)
            if(!names.includes(ob.name)){
                names.push(ob.name)
            }
        })

        console.log(names)
        return names
    }

    const premios = () => {
        
        if(state.length === 0){
            console.log("Entrou")
            return (
                <div>
                    <p>
                        O prêmio de R$1.000.000 e um <span className="text-blue-600">estágio na DELL</span> foi para: <span className="text-red-600">NINGÚEM!</span>
                    </p>
                    <p>
                        Mais sorte na próxima!
                    </p>
                </div>
            )

        }
        if(state.length > 0){
            console.log("Entrou")
            return (
                <div>
                    <p>
                        Os prêmios de R$1.000.000 e <span className="text-blue-600">estágios na DELL</span> foram para...
                    </p>
                </div>
            )

        }
    }

    return(
        <div className="flex flex-col items-center justify-center p-8">
            <div className="">
            <h1 className="text-5xl font-bold text-black">{premios()}</h1>
            </div>
            <section className="flex flex-col items-center justify-center p-8">
                {nomes.map((nome) => (
                    <article key={nome}>
                        <p className="text-3xl font-bold text-black">
                            <span className="text-green-600">{nome}</span>, recebendo R${(1000000/nomes.length).toFixed(2)}
                        </p>
                    </article>
                ))}
            </section>
            <button onClick={zeraBanco} type="button" className="bg-blue-600 text-white p-2 rounded text-lg hover:shadow-lg hover:-translate-y-1 hover:translate-x-1 duration-100 hover:bg-blue-700 ">{<Link to="/">Inicio</Link>}</button>
        </div>
    )
}
