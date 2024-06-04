interface User {
  id: string;
}

interface ServerResponse {
  ok: boolean;
  message: string;
  data: null;
}

declare namespace NodeJS {
  interface ProcessEnv {
    API_BASE_URL: string;
  }
}
