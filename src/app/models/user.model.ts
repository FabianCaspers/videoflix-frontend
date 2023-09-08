export class User {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  userId: string;

  constructor(obj?: any) {
    this.first_name = obj && obj.first_name ? obj.first_name : '';
    this.last_name = obj && obj.last_name ? obj.last_name : '';
    this.email = obj && obj.email ? obj.email : '';
    this.password = obj && obj.password ? obj.password : '';
    this.userId = obj && obj.userId ? obj.userId : '';
  }
}
