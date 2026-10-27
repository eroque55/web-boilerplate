import { redirect } from 'next/navigation';

import { HOME_ROUTE } from '@/constants/routes';

const RootPage = () => {
  redirect(HOME_ROUTE);
};

export default RootPage;
