export class Order {
  constructor(
    public orderId: number,
    public name: string,
    public dateaccommodation: string,
    public dateDestination: string,
    public dateExecution: string,
    public isDeleted: boolean
  ) { }
}
