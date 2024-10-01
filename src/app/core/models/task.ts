import {Person} from "./person";

export interface Task {
  name: string,
  date: Date,
  status: boolean
  persons: Person
}
