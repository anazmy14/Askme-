

export function enableBtn (btnClass){
    let btn = document.querySelector('.' + btnClass);
    btn.disabled = false;
    btn.classList.remove("disabled");
    
} 


export function disableBtn (btnClass){
    let btn = document.querySelector('.' + btnClass);
    btn.disabled = true;
    btn.classList.add("disabled");    
} 

