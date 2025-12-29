import { Component, OnInit, signal } from '@angular/core';
import { Auth } from '../../shared/auth';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { lastValueFrom } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-activity',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './task-activity.component.html',
  styleUrl: './task-activity.component.scss'
})
export class TaskActivityComponent implements OnInit {


  taskForm: FormGroup;

  mode = signal<'create' | 'view'>('view');

  taskStatus = ['Pending', 'In Progress', 'Completed']

  public taskInfos: any;

  isAdmin = false

  user_id = ''



  constructor(private auth: Auth, private commonService: CommonService, private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      header: ['', Validators.required],
      description: ['', Validators.required],
    });
  }


  async ngOnInit(): Promise<void> {

    let userToken = JSON.parse(this.auth.getLocalStroage('userToken') || '')

    this.isAdmin = userToken.is_admin || false

    this.user_id = userToken.id || ''

    this.taskInfos = await lastValueFrom(
      this.commonService.getTaskInfo({ user_id: userToken.id, is_admin: userToken.is_admin })
    );

  }

  switchToCreate() {
    this.mode.set('create');
  }

  switchToView() {
    this.mode.set('view');
  }

  async createTask() {

    try {

      const taskQuery = {
        header: this.taskForm.value.header,
        description: this.taskForm.value.description,
        user_id: this.user_id
      }

      await lastValueFrom(
        this.commonService.createTask(taskQuery)
      );

      this.taskInfos = await lastValueFrom(
        this.commonService.getTaskInfo({ user_id: this.user_id, is_admin: this.isAdmin ? '1' : '0' })
      );

      alert("New task is created")

    } catch (err) {
      alert("Failed to Create Task")
    }
  }

  async onStatusChange(task: any, newStatus: string) {

    try {

      const ok = confirm('Are you sure you want to update this record?');

      if (!ok) return;

      await lastValueFrom(
        this.commonService.updateTaskById({ task_id: task._id, status: newStatus })
      );

      task.status = newStatus

      alert("task is Updated")

    } catch (err) {
      alert("Failed to Update Task")
    }
  }
  async deleteTask(id: string) {

    try {

      const ok = confirm('Are you sure you want to delete this record?');

      if (!ok) return;

      await lastValueFrom(
        this.commonService.deleteTaskById({ task_id: id })
      );

      this.taskInfos = this.taskInfos.filter((task: { _id: string; }) => task._id !== id);

      alert("task is deleted")

    } catch (err) {
      alert("Failed to Delete Task")
    }

  }
}
