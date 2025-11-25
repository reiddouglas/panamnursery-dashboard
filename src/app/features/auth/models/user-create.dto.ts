export class UserCreateDTO {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone: number,
    public username: string,
    public password: string,
  ) {}

  static displayNames: Record<string, string> = {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email Address',
    phone: 'Phone Number',
    username: 'Username',
    password: 'Password',
  };

  static getDisplayName(field: keyof UserCreateDTO): string {
    return UserCreateDTO.displayNames[field] ?? field;
  }

  static getAllDisplayNames(): Record<string, string> {
    return this.displayNames;
  }
}
