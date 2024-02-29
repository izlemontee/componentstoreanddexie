import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DexiestorageService } from '../dexiestorage.service';
import { ComponentstoreService } from '../componentstore.service';
import { Item } from '../models';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit{

  private fb = inject(FormBuilder)
  private dexieStorage = inject(DexiestorageService)
  private componentStore = inject(ComponentstoreService)

  form!:FormGroup

  ngOnInit(): void {
      this.form = this.createForm()
  }

  createForm(){
    return this.fb.group({
      name: this.fb.control<string>(''),
      quantity:this.fb.control<number>(0)
    })
  }

  processForm(){
    var item = this.form.value as Item
    this.dexieStorage.addItem(item)
    this.componentStore.addItem(item)
    this.form.reset()
  }



}
