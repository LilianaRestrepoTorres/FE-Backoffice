import { newWriterType } from '@customTypes/createItemTypes';
import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { newWriterSchema } from '@schemas/createNewItemSchema';
import axios from 'axios';
import { CREATE_WRITER } from '@services/mutations/create/writer';


export const CreateWriterForm: FC = () => {
  const { 
    register,
    handleSubmit,
    formState: { errors }, 
  } = useForm<newWriterType>({
    resolver: yupResolver(newWriterSchema)
  });
  const CreateWriterSubmit: SubmitHandler<newWriterType> = (data: newWriterType) => {
    axios.post(
      process.env.API_URL !== undefined ? process.env.API_URL : '',
      CREATE_WRITER(data),
      {
        headers: {
        'Content-Type': 'application/json'
        }
      }
    )
    .then(res => {
      console.log(res);
    })
    .catch(err => console.error(err))
  }
  return(
    <form className="p-8 flex flex-col items-center justify-center" onSubmit={handleSubmit(CreateWriterSubmit)}>
      <div className="flex flex-col">
        <label htmlFor='writerName'>Writer&apos;s Name </label>
          <input className="h-12 w-80 mt-2 mb-4 p-4 border-2 border-slate-200 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" id='writerName' {...register('name')} placeholder="introduce director's name" type="text"/>
          {errors.name && errors.name?.message && <span className='text-xs text-red-500'>{errors.name.message}</span>}
      </div>
      <input className="w-48 p-4 border border-sky-600 hover:cursor-pointer hover:bg-sky-600 hover:text-white rounded-2xl" type="submit" value="Create writer"/>
    </form>
  );
};
