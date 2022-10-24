import {DocumentType} from '@typegoose/typegoose';

export interface IDocumentAuthor <K extends string, T extends Record<K, {_id: unknown;} | undefined>>{
  get(documentId: string): Promise<DocumentType<T> | null>;
}
