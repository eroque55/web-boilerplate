import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/queryKeys';
import { userService } from '@/services/user';

export const useMe = () => {
  return useQuery({
    queryKey: queryKeys.user.me(),
    queryFn: userService.me,
  });
};
