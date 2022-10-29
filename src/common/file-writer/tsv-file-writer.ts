import { createWriteStream, WriteStream} from 'fs';
import { IFileWriter } from './i-file-writer.js';

export default class TsvFileWriter implements IFileWriter {
  private stream: WriteStream;

  constructor(public readonly fileName: string) {
    this.stream = createWriteStream(this.fileName, {
      flags: 'w',
      encoding: 'utf8',
      highWaterMark: 2 ** 16,
      autoClose: true,
    });
  }

  public async write(row: string): Promise<void> {
    if (!this.stream.write(`${row}\n`)) {
      return new Promise((resolve) => {
        this.stream.once('drain', () => resolve());
      });
    }
    return Promise.resolve();
  }
}
