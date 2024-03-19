import { useEffect } from "react"
import { useState } from "react"
//import '../App.css'
export const Button = (props) => {
    const [click, setClick] = useState(false)
    const handleClick = () => {
        if(props.array.length == 5 && !click){
            return
        }
        if(!click){
            props.array.push(props.value)
        }else{
            props.func(props.value)
        }
        setClick(!click)
        
    }
    
    useEffect(() => {
        for(var i = 0; i < props.array.length; i++){
            if(props.array[i] === props.value){
                setClick(true)
                break
            }
            setClick(false)
        }
    },[props.array])
    
    return (
        <div>
            <button
            className="text-black hover:text-black border border-green-700 hover:bg-green-800 focus:ring-2 focus:outline-none focus:ring-grey-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
            key={props.value}
            style={{backgroundColor: click ? 'green' : 'white'}}
            onClick={handleClick}>{props.value}
            </button>
        </div>
    )
}