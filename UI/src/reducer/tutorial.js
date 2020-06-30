const instruction = ( state = {
    content:"new instruction",
    required:"true",
    time_duration:"10",
    id:null,
    index:null
}, action)=>{
    switch(action.type){
        case 'ADD_INSTRUCTION':
            return state;
        default:
            return state;
    }
}

export default instruction;