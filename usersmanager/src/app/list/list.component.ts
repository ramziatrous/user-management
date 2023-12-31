import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  users: any;



  constructor(private user: UserService ) { }

  ngOnInit(): void {


    this.user.getAll( ).subscribe({
      next: (res)=>{
        this.users = res;
        console.log(this.users);
        console.log(this.users.Name);

      },
      error: (err)=>{
        console.log(err);
      }
    });
  }
  delete(id: any){


    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.user.delete(id).subscribe({
          next: (res)=>{

            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )

            this.ngOnInit();

          },
          error: (err)=>{
            console.log(err);
          }
        })

      }
    })


  }


}
