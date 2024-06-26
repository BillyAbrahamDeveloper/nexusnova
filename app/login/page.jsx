import LoginForm from '@/components/LoginForm';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

const LoginPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect('/blog');

  return (
    <div className=' mt-10 '>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
