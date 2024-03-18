import { useState } from "react"
import { Button } from "./Button"
export const Numeros = (props) => {
    const arr = []
    for (let index = 1; index <= 50; index++) {
        arr.push(
                <Button value = {index} array = {props.escolhas} func = {props.func} key = {index}> </Button>
        )
    }
    return (
        <div className="grid grid-cols-5">
            {arr}
        </div>
    )
}