import Input from '@/components/Input';
import Link from 'next/link';

const LoginForm = () => {
  return (
    <section className='container w-full'>
      <form className=' border-2 border-gray-400 rounded-lg px-8 py-6 space-y-5 max-w-sm flex flex-col '>
        <h2 className=' text-center uppercase font-bold text-2xl'>Login</h2>

        <Input
          type='email'
          label='Email'
          name='email'
          placeholder='Enter your email...'
        />
        <Input
          type='password'
          label='Password'
          name='Password'
          placeholder='Enter your password...'
        />
        <button className=' rounded-lg   mt-10  bg-primaryColor py-3 px-7 font-bold  '>
          Submit
        </button>

        <p className='text-center '>
          Need a new account?
          <Link href='/login' className=' text-blue-600'>
            {' '}
            Sign up
          </Link>
        </p>
      </form>
    </section>
  );
};

export default LoginForm;
