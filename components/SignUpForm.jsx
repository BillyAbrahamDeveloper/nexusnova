'use client';
import Link from 'next/link';
import Input from './Input';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const initialState = {
  name: '',
  email: '',
  password: '',
};

const SignUpForm = () => {
  const [hydrated, setHydrated] = useState(false);
  const [state, setState] = useState(initialState);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const { name, email, password } = state;

    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }

    // Regular expression pattern for a basic email validation
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!pattern.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      setIsLoading(true);

      const newUser = {
        name,
        email,
        password,
      };

      const response = await fetch('http://localhost:3000/api/signup', {
        headers: {
          'Content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(newUser),
      });

      if (response?.status === 201) {
        setSuccess('Registration successfull');
        setTimeout(() => {
          router.push('/login', { scroll: false });
        }, 1000);
      } else {
        setError('Something went wrong');
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const changeHandler = (e) => {
    setError('');
    setState({ ...state, [e.target.name]: e.target.value });
  };
  return (
    <section className='container w-full'>
      <form
        onSubmit={submitHandler}
        className=' border-2 border-gray-400 rounded-lg px-8 py-6 space-y-5 max-w-sm flex flex-col'
      >
        <h2 className=' text-center uppercase font-bold text-2xl'>Sign Up</h2>

        <Input
          type='text'
          label='Name'
          name='name'
          placeholder='Enter your name...'
          onChange={changeHandler}
          value={state.name}
        />
        <Input
          type='email'
          label='Email'
          name='email'
          placeholder='Enter your email...'
          onChange={changeHandler}
          value={state.email}
        />
        <Input
          label='Password'
          type='password'
          name='password'
          onChange={changeHandler}
          value={state.password}
        />

        {error && <div className='text-red-600'>{error}</div>}
        {success && <div className='text-green-600'>{success}</div>}

        <button className=' rounded-lg   bg-primaryColor py-3 px-7 font-bold  '>
          Submit
        </button>

        <p className='text-center'>
          You have account already?
          <Link href='/login' className=' text-blue-600'>
            {isLoading ? 'Loading' : 'Sign up'}
          </Link>
        </p>
      </form>
    </section>
  );
};

export default SignUpForm;
