import { useQuery } from 'react-query';
import { fetchCurrentUser } from './api';

export function useFetchCurrentUser() {
  return useQuery('fetchCurrentUser', fetchCurrentUser);
}
