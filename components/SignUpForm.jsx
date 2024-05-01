import Link from 'next/link';
import Input from './Input';

const SignUpForm = () => {
  return (
    <section className='container w-full'>
      <form className=' border-2 border-gray-400 rounded-lg px-8 py-6 space-y-5 max-w-sm flex flex-col'>
        <h2 className=' text-center uppercase font-bold text-2xl'>Sign Up</h2>

        <Input
          type='text'
          label='Name'
          name='name'
          placeholder='Enter your name...'
        />
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
        <button className=' rounded-lg   bg-primaryColor py-3 px-7 font-bold  '>
          Submit
        </button>

        <p className='text-center'>
          You have account already?
          <Link href='/login' className=' text-blue-600'>
            {' '}
            Login
          </Link>
        </p>
      </form>
    </section>
  );
};

export default SignUpForm;
