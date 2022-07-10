const DeleteOccurrences = ((numberArray: Array<number>): Array<number> =>{
    const finalNumberArray: Array<number> = [];
    for(let i: number = 0 ; i < numberArray.length; i++){
        let repeated: boolean = false;
        for(let e: number = i + 1 ; e < numberArray.length; e++){
            if(numberArray[i] === numberArray[e]){
                repeated = true
                break;
            }
        }
        if(!repeated){
            finalNumberArray.push(numberArray[i]);
        } else {
            repeated = false;
        }
    }
    return finalNumberArray;
})

export default DeleteOccurrences;