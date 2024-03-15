import { useState } from "react"
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
    return (
        <div>
            <button
            style={{backgroundColor: click ? 'green' : 'red'}}
            onClick={handleClick}>{props.value}
            </button>
        </div>
    )
}