import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../../config/app.config';

@Injectable({
    providedIn: 'root'
})

export class CommonService {

    constructor(private http: HttpClient, private appConfig: AppConfig) {

    }

    login(data: { email: string; password: string }) {
        return this.http.post(`${this.appConfig.serverAddress}/api/user/fetch`, data);
    }

    signup(data: { name: string; email: string; password: string }) {
        return this.http.post(`${this.appConfig.serverAddress}/api/user/create`, data);
    }

    getTaskInfo(data: { user_id: string; is_admin: string }) {
        return this.http.post(`${this.appConfig.serverAddress}/api/task/fetch`, data);
    }

    createTask(data: { header: string; description: string, user_id: string }) {
        return this.http.post(`${this.appConfig.serverAddress}/api/task/create`, data);
    }


    deleteTaskById(data: { task_id: string }) {
        return this.http.post(`${this.appConfig.serverAddress}/api/task/delete`, data);
    }

    updateTaskById(data: { task_id: string, status: string }) {
        return this.http.post(`${this.appConfig.serverAddress}/api/task/updateStatus`, data);
    }
}