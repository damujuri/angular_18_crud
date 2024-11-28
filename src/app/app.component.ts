import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Employee } from './model/Employee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  employeeForm: FormGroup = new FormGroup({});
  empObj: Employee = new Employee();
  empList: Employee[] = [];

  constructor(){
    this.createForm();
    const oldData = localStorage.getItem("empData");
    if(oldData!=null){
      const parseData = JSON.parse(oldData);
      this.empList = parseData;
    }
  }

  createForm(){
    this.employeeForm = new FormGroup({
      empId: new FormControl(this.empObj.empId),
      empName: new FormControl(this.empObj.empName,[Validators.required]),
      email: new FormControl(this.empObj.email),
      contactNo: new FormControl(this.empObj.contactNo),
      city: new FormControl(this.empObj.city),
      state: new FormControl(this.empObj.state),
      address: new FormControl(this.empObj.address)
       
    })
  }

  reset(){
    this.empObj = new Employee();
    this.createForm();

  }

  onSave(){
    debugger;
    const oldData = localStorage.getItem("empData");
    if(oldData!=null){
      const parseData = JSON.parse(oldData);
      this.employeeForm.controls['empId'].setValue(parseData.length+1);
      this.empList.unshift(this.employeeForm.value);
    }else{
      this.empList.unshift(this.employeeForm.value);
    }
    localStorage.setItem("empData",JSON.stringify(this.empList))
    this.reset();
  }

  onEdit(item:Employee){
    this.empObj = item;
    this.createForm();
  }

  onUpdate(){
    const record = this.empList.find(m=>m.empId ==this.employeeForm.controls['empId'].value);
    if(record != undefined){
      record.address = this.employeeForm.controls['address'].value;
      record.empName = this.employeeForm.controls['empName'].value;
      record.contactNo = this.employeeForm.controls['contactNo'].value;
      record.email = this.employeeForm.controls['email'].value;
    }
    localStorage.setItem("empData", JSON.stringify(this.empList));
    this.reset();
  }

  onDelete(id:number){
    const isDelete =confirm("Are you sure want to delete");
    if(isDelete){
      const index = this.empList.findIndex(m=>m.empId == id);
      this.empList.splice(index,1);
    }

  }
}
