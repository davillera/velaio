import {Person} from "./person";

export interface Task {
  name: string,
  date: Date,
  persons: Person
}
