interface Auth {
  id: string;
}

interface ServerResponse<T> {
  status: number;
  msg?: string;
  data?: T;
}
