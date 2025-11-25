export class UserLoginDTO {
  constructor(
    public username: string,
    public password: string,
  ) {}

  static displayNames: Record<string, string> = {
    username: 'Username',
    password: 'Password',
  };

  static getDisplayName(field: keyof UserLoginDTO): string {
    return UserLoginDTO.displayNames[field] ?? field;
  }

  static getAllDisplayNames(): Record<string, string> {
    return this.displayNames;
  }
}
