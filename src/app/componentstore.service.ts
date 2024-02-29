import { Injectable } from '@angular/core';
import { Item, ItemSlice } from './models';
import { ComponentStore } from '@ngrx/component-store';


const INIT_STATE: ItemSlice={
  items:[],
  loadedOn:0
}

@Injectable({
  providedIn: 'root'
})
export class ComponentstoreService extends ComponentStore<ItemSlice>{

  constructor() { 
    super(INIT_STATE)
  }

  // this is a function. this is function-oriented programming
  // when you call addItem, you need to pass in Item as a parameter (this.update<Item>)
  addItem = this.updater<Item>(
    // within the function, it automatically takes in the slice as the first paramter
    // the second parameter, item, is what YOU passed in when you called this method
    // it returns a new state of the slice (see return)
    (slice: ItemSlice, item:Item)=>
      {return{items:[...slice.items,item]}}
  )


  // this is a function
  // when you call this, you don't need to put ()
  //just getItems
  getItems = this.select<Item[]>(
    // this returns an observable of the item slice. basically it pushes an update of the slide
    // on the componentt hat displays this, you need to subscribe
    (slice:ItemSlice) => slice.items
  )
}
