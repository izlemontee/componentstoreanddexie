import { Component, OnInit, inject } from '@angular/core';
import { DexiestorageService } from '../dexiestorage.service';
import { Observable } from 'rxjs';
import { Item } from '../models';
import { ComponentstoreService } from '../componentstore.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrl: './display.component.css'
})
export class DisplayComponent implements OnInit{

  private dexieStorage = inject(DexiestorageService)
  private componentStore = inject(ComponentstoreService)

  fromDexie!: Observable<Item>
  fromComponentStore !: Observable<Item[]>
  items:Item[] = []

  itemsComponent: Item[]=[]

  ngOnInit(): void {
      this.fromDexie = this.dexieStorage.toDisplay
      this.fromComponentStore = this.componentStore.getItems
      this.getCollection()
      this.subscribeToDexie()
      this.subscribeToComponent()
  }

  subscribeToDexie(){
    this.fromDexie.subscribe({
      next: (data)=>{this.items.push(data)}
    })
  }

  getCollection(){
    this.dexieStorage.getItems().then(
      value => this.items = value
    )
  }

  subscribeToComponent(){
    this.fromComponentStore.subscribe({
      next:(data)=>{this.itemsComponent = data}
    })
  }





}
