import react, {useState} from 'react'

export default function useInput(initValue){
    const [value , setValue] = useState(initValue);
    
    return({
        value,
        setValue,
        onChange : e => setValue(e.target.value),
        reset : () => setValue("")
    })
 
} 
