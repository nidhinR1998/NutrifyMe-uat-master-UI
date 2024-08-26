// src/app/models/user.model.ts
export class User {
    id?: number; // Optional, as it might be auto-generated
    fullname: string;
    username: string;
    password: string;
    email: string;
    status: string;
  
    constructor(fullname: string, username: string, password: string, email: string, status: string, id?: number) {
      this.id = id;
      this.fullname = fullname;
      this.username = username;
      this.password = password;
      this.email = email;
      this.status = status;
    }
  }
  