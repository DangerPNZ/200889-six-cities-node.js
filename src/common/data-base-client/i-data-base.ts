export interface IDataBase {
  connect(uri: string): Promise<void>;
  disconnect(): Promise<void>;
}
