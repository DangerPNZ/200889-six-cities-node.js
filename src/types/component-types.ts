export const Component = {
  Application: Symbol.for('Application'),
  ILogger: Symbol.for('ILogger'),
  IConfig: Symbol.for('IConfig'),
  IDataBase: Symbol.for('IDataBase'),
  IUserService: Symbol.for('IUserService'),
  UserModel: Symbol.for('UserModel'),
  IOfferService: Symbol.for('IOfferService'),
  OfferModel: Symbol.for('OfferModel'),
  ICommentService: Symbol.for('ICommentService'),
  CommentModel: Symbol.for('CommentModel'),
} as const;
