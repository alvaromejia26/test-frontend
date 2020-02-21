import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(public http: HttpClient) { }

  createTask(task) {
    const url = URL_API + 'task';
    return this.http.post(url, task);
  }

  getTasks(id) {
    const url = URL_API + 'task/' + id;
    return this.http.get(url);
  }

  updateTask(task) {
    const url = URL_API + 'task/' + task.id;
    return this.http.put(url, task);
  }
}
