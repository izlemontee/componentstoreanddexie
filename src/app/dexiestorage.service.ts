import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Item } from './models';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DexiestorageService extends Dexie{

  cart: Dexie.Table<Item,number>

  toDisplay = new Subject<Item>

  constructor() { 
    super('cartDB')
    this.version(1).stores({
      myCart: '++index'
    })
    this.cart = this.table('myCart')
  }

  addItem(item:Item){
    this.cart.add(item)
    this.toDisplay.next(item)
  }

  getItems():Promise<Item[]>{
    return this.cart.toArray()
  }
}
