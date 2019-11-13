export class Client {
  constructor(
    public id: number,
    public name: string,
    public code: string,
    public address: string,
    public isDeleted: boolean,
    public lastUpdated: string
  ) { }
}
