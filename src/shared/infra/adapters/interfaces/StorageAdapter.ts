export interface StorageAdapterInterface {
  save(fileName: string, folder: string): Promise<string>;
  delete(fileName: string, folder: string): Promise<void>;
}
