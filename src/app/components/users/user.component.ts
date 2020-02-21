import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
declare var $;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {

  loading = true;
  title = 'Add new ';
  action = 'add';
  tasks: any = [];
  user_id;
  id;
  description;
  state = false;

  constructor(private ts: TasksService, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(params => {
      this.user_id = params['id'];
      this.getTasks(this.user_id);
    });
  }

  ngOnInit(): void {
  }

  close(f: NgForm) {
    $('#task').modal('hide');
    this.description = null;
  }

  saveTask(f: NgForm) {
    if (f.invalid) {
      return;
    }
    if (this.action === 'add'){console.log(f.value);
      this.ts.createTask(f.value).subscribe((resp: any) => {
        this.getTasks(this.user_id);
        alert(resp.res);
        $('#task').modal('hide');
        this.description = null;
      }, error => {
        console.log(error);
        this.loading = false;
        alert(error.error.message);
      });
    } else {console.log(f.value);
      this.ts.updateTask(f.value).subscribe((resp: any) => {
        this.getTasks(this.user_id);
        alert(resp.res);
        $('#task').modal('hide');
        this.description = null;
      }, error => {
        console.log(error);
        this.loading = false;
        alert(error.error.errors);
      });
    }
  }

  getTasks(user_id) {
    this.loading = true;
    this.ts.getTasks(user_id).subscribe((tasks: any) => {console.log(tasks);
      this.tasks = tasks.res;
      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = false;
      alert(error.error.errors);
    });
  }

  addTask() {
    this.title = 'Add new ';
    this.action = 'add';
    $('#task').modal('show');
  }

  editTask(task) {
    this.title = 'Edit ';
    this.action = 'edit';
    $('#task').modal('show');
    this.id = task.id;
    this.description = task.description;
    this.state = task.state;
  }

}
