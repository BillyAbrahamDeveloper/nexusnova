'use client';
import Link from 'next/link';

import { useSession } from 'next-auth/react';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Input from '@/components/Input';
import TextArea from '@/components/TextArea';
import Image from 'next/image';

const initialState = {
  title: '',
  description: '',
  excerpt: '',
  quote: '',
  category: 'Songbirds',
  photo: '',
};

const WritePage = () => {
  const CLOUD_NAME = 'drmoexxgd';
  const UPLOAD_PRESET = 'nextjs_blog_images';

  const [state, setState] = useState(initialState);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { data: session, status } = useSession();

  console.log(session);

  if (status === 'loading') {
    return <p>loading...</p>;
  }

  if (status === 'unauthenticated') {
    return <p>access denied</p>;
  }

  const changeHandler = (e) => {
    setError('');
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setState({ ...state, [name]: files[0] });
    } else {
      setState({ ...state, [name]: value });
    }
  };

  const createHandler = async (e) => {
    e.preventDefault();

    const { photo, title, category, description, excerpt, quote } = state;

    if (!title || !category || !description || excerpt || !quote) {
      setError('Befor creating post please fill out all required fieldss!');
      return;
    }

    if (photo) {
      const maxSize = 5 * 1024 * 1024;
      if (photo.size > maxSize) {
        setError('File should not be larger then 5MB');
        return;
      }
    }

    if (title.length < 4) {
      setError('Title should be at least 4 characters');
    }

    if (description.length < 20) {
      setError('Description should be at least 20 characters');
    }

    if (excerpt.length < 10) {
      setError('excerpt should be at least 10 characters');
    }

    if (quote.length < 6) {
      setError('Quote should be at least 6 characters');
    }

    try {
      setIsLoading(true);
      setError('');
      setSuccess('');

      const image = await uploadImage();

      const newBlog = {
        title,
        description,
        excerpt,
        quote,
        category,
        image,
        authorId,
      };
    } catch (error) {}
  };

  const uploadImage = async () => {
    if (!state.photo) return;

    const formdata = new FormData();
    formdata.append('file', state.photo);
    formdata.append('upload_preset', UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formdata,
        }
      );

      const data = await res.json();
      const image = {
        id: data['public_id'],
        url: data['secure_url'],
      };

      return image;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className=' mt-10 container '>
      <h2 className='text-6xl  font-thin text-green-300'>
        Create <span className=' font-bold text-gray-100'> Blog</span>
      </h2>

      <form onSubmit={createHandler} className=' space-y-5'>
        <Input
          type='text'
          label='Title'
          name='Title'
          placeholder='Enter your title...'
          onChange={changeHandler}
          value={state.title}
        />

        <TextArea
          rows='5'
          label='Description'
          name='Title'
          placeholder='Enter your description...'
          onChange={changeHandler}
          value={state.description}
        />

        <TextArea
          rows='2'
          label='Excerpt'
          name='excerpt'
          placeholder='Enter your excerpt...'
          onChange={changeHandler}
          value={state.description}
        />

        <TextArea
          rows='2'
          label='Quote'
          name='Quote'
          placeholder='Enter your quote...'
          onChange={changeHandler}
          value={state.description}
        />

        <div>
          <label className='block'>Select a category</label>

          <select
            name='category'
            onChange={changeHandler}
            value={state.category}
            className='block rounded-lg w-full p-3 bg-primaryLightColor'
          >
            <option value='One'>One</option>
            <option value='Two'>Two</option>
            <option value='Three'>Three</option>
            <option value='Four'>Four</option>
            <option value='Five'>Five</option>
          </select>
        </div>

        <div>
          <label className=' block mb-2 text-sm font-medium'>
            Upload Images
          </label>
          <input type='file' name='photo' accept='*' />
          <Image
            width={0}
            height={0}
            sizes='150vw'
            alt='Sample Image'
            src='https://plus.unsplash.com/premium_photo-1688821128189-c4f2d10b33f1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            className='w-32 mt-5'
          />
        </div>

        {error && <div className='text-red-600'>{error}</div>}
        {success && <div className='text-green-600'>{success}</div>}

        <button className=' rounded-lg   bg-primaryColor py-3 px-7 font-bold  '>
          Create
        </button>
      </form>
    </section>
  );
};

export default WritePage;
