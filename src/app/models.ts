export interface Item{
    name:string,
    quantity:number,
    index?:number
}

export interface ItemSlice{
    items: Item[],
    loadedOn?:number
}