export type FileConfig = {
  title: string;
  cover: string;
  description: string;
  tags: string[];
  date: string;
};
export interface File {
  config: FileConfig;
  fileName: string;
}
