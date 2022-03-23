
export const formatPramars = (arr,obj)=>{
    const res = {}
    for (let i = 0; i < arr.length; i++) {
        const key = arr[i];
        const item = obj[ley]
        if(item){
            res[key] = item
        }
    }

    return res
}