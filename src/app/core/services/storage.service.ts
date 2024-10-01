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

    const taskExists = tasks.some(existingTask => existingTask.name === task.name);
    if (taskExists) {
      throw new Error(`La tarea con el nombre "${task.name}" ya existe.`);
    }

    if (!tasks) {
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

  updateTask(oldTask?: Task, updatedTask?: Task) {
    if (!oldTask || !updatedTask) {
      console.error("Se requieren tanto oldTask como updatedTask para actualizar.");
      return;
    }

    let tasks: Task[] = this.getTasks();
    const index = tasks.findIndex(existingTask =>
      existingTask.name.trim() === oldTask.name.trim()
    );


    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updatedTask };
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
      console.log(`Tarea "${oldTask.name}" no encontrada para actualizar.`);
    }
  }

  deleteTask(taskName: string) {
    let tasks = this.getTasks()

    if (tasks.length > 0) {
      tasks = tasks.filter((task: Task) => task.name !== taskName);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }
}
