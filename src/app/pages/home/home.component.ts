import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import {DialogModule} from "primeng/dialog";
import {CalendarModule} from "primeng/calendar";
import { SpeedDialModule } from 'primeng/speeddial';
import {MenuItem} from "primeng/api";
import {MultiSelectModule} from "primeng/multiselect";
import {ChipsModule} from "primeng/chips";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {StorageService} from "../../core/services/storage.service";
import {Person} from "../../core/models/person";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    DialogModule,
    CalendarModule,
    SpeedDialModule,
    MultiSelectModule,
    ChipsModule,
    ReactiveFormsModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentDate: Date = new Date();
  isOpenTaskModal: boolean = false;
  isOpenPersonModal: boolean = true;

  private formBuilder  = inject(FormBuilder)
  private storageService = inject(StorageService);

  public personForm: FormGroup  = new FormGroup({})

  persons: Person[] = [];

  menuItems: MenuItem[] = [
    {
      tooltipOptions: {
        tooltipLabel: 'Agregar Tarea'
      },
      icon: 'pi pi-pencil',
      command: () => {

      }
    },

    {
      tooltipOptions: {
        tooltipLabel: 'Agregar Persona'
      },
      icon: 'pi pi-pencil',
      command: () => {

      }
    },
    {
      tooltipOptions: {
        tooltipLabel: 'Ver Personas'
      },
      icon: 'pi pi-pencil',
      command: () => {

      }
    },

  ]


  ngOnInit(){
    this.getPersons()
    this.initFormPerson()
  }

  initFormPerson() {
    this.personForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(80), Validators.pattern('^[0-9]*$')]],
      skills: [[], [Validators.required]]
    })
  }

  getPersons(){
    this.persons = this.storageService.getPersons()
  }

  saveTask() {

  }

  savePerson(){
    this.storageService.addPerson(this.personForm.value)
    this.personForm.reset()
    this.isOpenPersonModal = false
  }
}
