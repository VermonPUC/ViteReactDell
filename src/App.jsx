import { HashRouter as Router,  Routes, Route } from "react-router-dom";
import {Inicio} from "./Pages/Inicio";
import {Cadastro} from "./Pages/Cadastro";
import {Sorteio} from "./Pages/Sorteio";
import {Premiacao} from "./Pages/Premiacao";
import './index.css'


const App = () =>{
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Inicio></Inicio>}/>
        <Route path="/cadastro" element={<Cadastro/>}/>
        <Route path="/sorteio" element={<Sorteio/>}/>
        <Route path="/premiacao" element={<Premiacao/>}/>
      </Routes>
    </Router>
  )


}

export default App