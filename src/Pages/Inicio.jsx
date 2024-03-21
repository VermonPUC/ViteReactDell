import { Link } from "react-router-dom"

export const Inicio = () => {
    return(
        <div className="flex flex-col items-center p-24 gap-y-24">
            <h1 className="text-5xl font-bold text-blue-600">Mega-Sena Dell</h1>
            <p className="text-lg mt-4 font-bold">Cadastre apostas e concorra a prêmios incríveis!</p>
            <button className="bg-blue-600 text-white p-2 rounded text-lg hover:shadow-lg hover:-translate-y-1 hover:translate-x-1 duration-100 hover:bg-blue-700">{<Link to="/cadastro">Cadastro de apostas</Link>}</button>
        </div>
    )
}
