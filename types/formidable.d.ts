// types/formidable.d.ts
declare module "formidable" {
  import { IncomingMessage } from "http";

  export interface File {
    filepath: string;
    originalFilename?: string;
    mimetype?: string;
    size?: number;
  }

  export interface Files {
    [key: string]: File | File[];
  }

  export interface Fields {
    [key: string]: string | string[];
  }

  export class IncomingForm {
    parse(
      req: IncomingMessage,
      callback: (err: any, fields: Fields, files: Files) => void
    ): void;
    keepExtensions?: boolean;
    multiples?: boolean;
    uploadDir?: string;
  }
}
