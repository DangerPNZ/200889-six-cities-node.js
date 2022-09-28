export const Component = {
  Application: Symbol.for('Application'),
  ILogger: Symbol.for('ILogger'),
  IConfig: Symbol.for('IConfig'),
  IDataBase: Symbol.for('IDataBase'),
  IUserService: Symbol.for('IUserService'),
  UserModel: Symbol.for('UserModel'),
  IRentalOfferService: Symbol.for('IRentalOfferService'),
  RentalOfferModel: Symbol.for('RentalOfferModel'),
} as const;
