### Description

This package is meant for generating minimal Swagger documentation without having to configure anything. The package uses the route stack of Express to generate a Swagger 2.0 JSON file without descriptions, bodies or responses. The JSON file is then served to ${baseUrl}/api-docs which can be used to fill Swagger-ui or Postman.

### Example usage

```javascript
import { MinimalSwagger } from "minimal-swagger-docs";

...

// the package should be instantiated before starting the server
const swagger = new MinimalSwagger(app);

await app.listen(8000);

// the docs should be built after starting the server
swagger.generate(swaggerOptions);
```
