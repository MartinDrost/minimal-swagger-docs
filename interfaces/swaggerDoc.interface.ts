export interface ISwaggerDoc {
  swagger: string;
  host: string;
  basePath: string;
  schemes: string[];
  tags?: {
    name: string;
    description: string;
  }[];
  securityDefinitions: {
    bearer: {
      type: string;
      name: string;
      in: string;
    };
  };
  info?: {
    description: string;
    version: string;
    title: string;
  };

  paths?: {
    [url: string]: {
      [method: string]: {
        summary: string;
        description: string;
        parameters: string[];
        responses: any;
        tags: string[];
        security: any;
        produces: string[];
        consumes: string[];
      };
    };
  };
}
