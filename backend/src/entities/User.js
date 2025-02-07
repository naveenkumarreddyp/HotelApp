export class User {
  constructor({ id, email, password }) {
    this.id = id;
    this.email = email;
    this.password = password;
  }

  validate() {
    if (!this.email || !this.password) {
      throw new Error('Invalid user data');
    }
    if (!this.email.includes('@')) {
      throw new Error('Invalid email format');
    }
  }
}