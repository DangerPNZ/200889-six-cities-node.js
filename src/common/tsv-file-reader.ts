import {IFileReader} from './i-file-reader.js';
import EventEmitter from 'events';
import { createReadStream } from 'fs';

export default class TsvFileReader extends EventEmitter implements IFileReader {
  constructor(public fileName: string) {
    super();
  }

  public async read(): Promise<void> {
    const stream = createReadStream(this.fileName, {
      highWaterMark: 16384, // 16KB
      encoding: 'utf-8',
    });

    let lineRead = '';
    let endLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of stream) {
      lineRead += chunk.toString();

      while ((endLinePosition = lineRead.indexOf('\n')) >= 0) {
        const completeRow = lineRead.slice(0, endLinePosition + 1);
        lineRead = lineRead.slice(++endLinePosition);
        importedRowCount++;

        this.emit('line', completeRow);
      }
    }

    this.emit('end', importedRowCount);
  }
}

