import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import {DialogModule} from "primeng/dialog";
import {CalendarModule} from "primeng/calendar";
import { SpeedDialModule } from 'primeng/speeddial';
import {ConfirmationService, MessageService} from "primeng/api";
import {MultiSelectModule} from "primeng/multiselect";
import {ChipsModule} from "primeng/chips";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {StorageService} from "../../core/services/storage.service";
import {Person} from "../../core/models/person";
import {Task} from "../../core/models/task";
import {CardModule} from "primeng/card";
import {AvatarGroupModule} from "primeng/avatargroup";
import {AvatarModule} from "primeng/avatar";
import {ToastModule} from "primeng/toast";
import {DropdownModule} from "primeng/dropdown";
import {ConfirmDialogModule} from "primeng/confirmdialog";

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
    ReactiveFormsModule,
    CardModule,
    AvatarGroupModule,
    AvatarModule,
    ToastModule,
    FormsModule,
    DropdownModule,
    ConfirmDialogModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentDate: Date = new Date();
  isOpenTaskModal: boolean = false;
  isOpenPersonModal: boolean = false;
  isEditing: boolean = false;

  private formBuilder  = inject(FormBuilder)
  private storageService = inject(StorageService);
  private messageService = inject(MessageService)
  private confirmationService  = inject(ConfirmationService)

  public personForm: FormGroup  = new FormGroup({})
  public taskForm: FormGroup  = new FormGroup({})

  persons: Person[] = [];
  oldTask: any
  tasks: Task[] = []
  searchTerm: string = '';
  filteredTasks: Task[] = [];
  selectedFilter: string = 'all';
  filterOptions: any[] = [
    { label: 'Todas', value: 'all' },
    { label: 'Completadas', value: 'completed' },
    { label: 'Pendientes', value: 'pending' }
  ];

  ngOnInit(){
    this.getPersons()
    this.getTasks()
    this.initFormPerson()
    this.initFormTask()
    this.filteredTasks = this.tasks;
  }

  get ageWarning() {
    const age = this.personForm.get('age')?.value;
    return age < 18 && this.personForm.get('age')?.touched;
  }

  filterTasks() {
    const search = this.removeAccents(this.searchTerm.trim().toLowerCase());
    this.filteredTasks = this.tasks.filter(task =>
      this.removeAccents(task.name.toLowerCase()).includes(search) ||
      task.persons.some(person => this.removeAccents(person.name.toLowerCase()).includes(search))
    );

    if (this.selectedFilter === 'completed') {
      this.filteredTasks = this.filteredTasks.filter(task => task.status);
    } else if (this.selectedFilter === 'pending') {
      this.filteredTasks = this.filteredTasks.filter(task => !task.status);
    }
  }

  removeAccents(text: string): string {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }


  getAvatarInitials(name: string): string {
    const names = name.split(' ');
    const initials = names.map(n => n[0]).join('');
    return initials.toUpperCase();
  }

  initFormPerson() {
    this.personForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(90), Validators.pattern('^[0-9]*$')]],
      skills: [[], [Validators.required]]
    })
  }

  initFormTask(){
    this.taskForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      date: ['', [Validators.required]],
      status: [false, [Validators.required]],
      persons: [[], [Validators.required]]
    })
  }

  getTasks(){
    this.tasks = this.storageService.getTasks();
    this.filteredTasks = this.tasks;
  }

  getPersons(){
    this.persons = this.storageService.getPersons()
  }

  saveTask() {
    try {
      if(this.isEditing){
        this.storageService.updateTask(this.oldTask, this.taskForm.value)
      } else{
        this.storageService.addTask(this.taskForm.value)
      }
      this.isOpenTaskModal = false;
      this.getTasks();
    } catch (error) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `${error}` });
    } finally {
      this.initFormTask()
    }
  }

  editTask(task: Task) {
    this.isEditing = true;
    this.taskForm.patchValue({
      name: task.name,
      date: task.date,
      persons: task.persons,
    });
    this.oldTask = task;
    this.isOpenTaskModal = true;
  }

  savePerson(){
    this.storageService.addPerson(this.personForm.value)
    this.personForm.reset()
    this.isOpenPersonModal = false
    this.getPersons()
  }

  changeStatus(task: Task) {
    const updatedTask = { ...task, status: !task.status };
    this.storageService.updateTask(task, updatedTask);
    this.getTasks();
  }

  deleteTask(task: Task) {
    this.confirmationService.confirm({
      message: `¿Estás seguro de que quieres eliminar la tarea "${task.name}"?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.storageService.deleteTask(task.name);
        this.getTasks();
      },
      reject: () => {
      },
      acceptLabel: 'Sí',
      rejectLabel: 'No'
    })
  }

  openTaskModal() {
    this.initFormTask()
    this.isOpenTaskModal = true
    this.isEditing = false
  }
}
