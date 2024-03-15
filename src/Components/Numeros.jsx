import { useState } from "react"
import { Button } from "./Button"
export const Numeros = (props) => {
    const arr = []
    for (let index = 1; index <= 50; index++) {
        if(index % 5 == 0){

        }
        arr.push(
                <Button value = {index} array = {props.escolhas} func = {props.func}> </Button>
        )
        
    }
    return (
        <div display="block ">
            {arr}
        </div>
    )
}