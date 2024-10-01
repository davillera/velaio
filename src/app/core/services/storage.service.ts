import { Injectable } from '@angular/core';
import {Person} from "../models/person";
import {Task} from "../models/task";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  addPerson(person: Person): void {
    let persons: Person[] = this.getPersons();
    if (!persons) {
      persons = [];
    }
    persons.push(person);
    localStorage.setItem('persons', JSON.stringify(persons));
  }

  getPersons(): Person[] {
    const persons = localStorage.getItem('persons');
    if (persons) {
      return JSON.parse(persons);
    }
    return [];
  }

  deletePerson(personName: string) {
    let persons = this.getPersons();

    if (persons.length > 0) {
      persons = persons.filter(person => person.name !== personName);
      localStorage.setItem('persons', JSON.stringify(persons));
    }
  }

  addTask(task: Task){
    let tasks: Task[] = this.getTasks();
    if(!tasks){
      tasks = [];
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  getTasks() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      return JSON.parse(tasks);
    }
    return []
  }
}
