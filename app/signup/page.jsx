import SignUpForm from '@/components/SignUpForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

const SignUpPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect('/blog');

  return (
    <div className=' mt-10 '>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
