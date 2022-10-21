export interface IDocumentsExists {
  exists(documentId: string): Promise<boolean>;
}
