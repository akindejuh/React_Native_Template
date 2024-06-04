import instance from 'src/configs/axios';
import { FetchCurrentUserResponse } from './types';

export async function fetchCurrentUser(): Promise<FetchCurrentUserResponse> {
  const response = await instance.get('/user');
  return response.data;
}
