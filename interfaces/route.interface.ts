export interface IRoute {
  path: string;
  methods: { post: boolean; get: boolean; put: boolean; delete: boolean };
}
