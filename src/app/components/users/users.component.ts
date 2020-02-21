import { Component, OnInit, Inject } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
declare var $;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  loading = true;
  title = 'Add new ';
  action = 'add';
  users: any = [];
  id;
  name;

  constructor(private us: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  close(f: NgForm) {
    $('#user').modal('hide');
    f.reset();
  }

  saveUser(f: NgForm) {
    if (f.invalid) {
      return;
    }
    if (this.action === 'add'){
      this.us.createUser(f.value).subscribe((resp: any) => {
        this.getUsers();
        alert(resp.res);
        $('#user').modal('hide');
        f.reset();
      }, error => {
        console.log(error);
        this.loading = false;
        alert(error.error.errors);
      });
    } else {
      this.us.updateUser(f.value).subscribe((resp: any) => {
        this.getUsers();
        alert(resp.res);
        $('#user').modal('hide');
        f.reset();
      }, error => {
        console.log(error);
        this.loading = false;
        alert(error.error.errors);
      });
    }
  }

  getUsers() {
    this.loading = true;
    this.us.getUsers().subscribe((users: any) => {
      this.users = users.res;
      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = false;
      alert(error.error.errors);
    });
  }

  addUser() {
    this.title = 'Add new ';
    this.action = 'add';
    $('#user').modal('show');
  }

  editUser(id, name) {
    this.title = 'Edit ';
    this.action = 'edit';
    $('#user').modal('show');
    this.id = id;
    this.name = name;
  }

  deleteUser(id) {
    if (confirm('Are you sure?')) {
      this.us.deleteUser(id).subscribe((resp: any) => {
        this.getUsers();
        alert(resp.res);
      }, error => {
        console.log(error);
        this.loading = false;
        alert(error.message);
      });
    }
  }

  goTasks(id) {
    this.router.navigate(['/user', id]);
  }

}
