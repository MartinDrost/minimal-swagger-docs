import { Express } from "express";
import { ISwaggerDoc, ILayer } from "../interfaces";

export class MinimalSwagger {
  private server: Express;
  private documentation: ISwaggerDoc;

  constructor(server: Express) {
    this.server = server;

    this.serveDocumentation();
  }

  /**
   * serve the swagger documentation
   */
  private serveDocumentation() {
    this.server.use("/api-docs", (req, res, next) =>
      res.send(this.documentation)
    );
    console.log("Minimal swagger documentation running on /api-docs");
  }

  /**
   * Build the documentation JSON
   * @param info
   */
  public generate(info: ISwaggerDoc) {
    const layers = this.server._router.stack as ILayer[];
    const docs = {
      tags: [],
      paths: {},
      ...info
    } as ISwaggerDoc;
    for (const layer of layers) {
      if (!layer.route) {
        continue;
      }

      const path = layer.route.path;
      const params = path.split("/").filter(i => i[0] === ":");

      // save tag name
      const tag = path.split("/").filter(i => !!i)[0];
      if (!docs.tags.find(i => i.name === tag)) {
        docs.tags.push({
          name: tag,
          description: ""
        });
      }

      // add path
      const docPath = docs.paths[path] || {};
      const method = Object.keys(layer.route.methods)[0];
      docPath[method] = {
        summary: this.generateName(path, method),
        description: "",
        parameters: params.map(p => ({
          name: p.replace(":", ""),
          required: true
        })),
        responses: {},
        tags: [tag],
        security: {},
        produces: ["application/json"],
        consumes: ["application/json"]
      };
      docs.paths[path] = docPath;
    }

    this.documentation = docs;
  }

  /**
   * Generate a name for a path
   * @param path
   * @param method
   */
  private generateName(path: string, method: string): string {
    const pathSegments = path.split("/").filter(i => !!i);
    const params = pathSegments.filter(i => i[0] === ":");
    const action = pathSegments.filter(i => i[0] !== ":").reverse();

    return [
      method,
      action.join(" "),
      params.length ? "by" : "",
      params.join(", ")
    ].join(" ");
  }
}
