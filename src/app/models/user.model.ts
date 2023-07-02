export class User {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    userId: string;
  
    constructor(obj?: any) {
      this.firstname = obj && obj.firstname ? obj.firstname : '';
      this.lastname = obj && obj.lastname ? obj.lastname : '';
      this.email = obj && obj.email ? obj.email : '';
      this.password = obj && obj.password ? obj.password : '';
      this.userId = obj && obj.userId ? obj.userId : '';
    }
  }
  