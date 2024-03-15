import { Link } from "react-router-dom"

export const Inicio = () => {
    return(
        <div>
            <h1>COMECE SUAS APOSTAS</h1>
            <button>{<Link to="/cadastro">CADASTRO</Link>}</button>
        </div>
    )
}
