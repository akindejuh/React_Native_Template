// Requests

// Response
export interface FetchCurrentUserResponse extends Omit<ServerResponse, 'data'> {
  data: {
    id: string;
  };
}
