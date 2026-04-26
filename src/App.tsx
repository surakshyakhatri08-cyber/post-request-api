import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { toast } from 'sonner';
import { postSchema } from './components/form-schema';
import type { PostFormData } from './components/form-schema';
import { FieldGroup } from './components/form-field';

const Spinner = () => (
  <svg
    className="animate-spin h-4 w-4 text-white inline-block mr-2"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
  </svg>
);

const PostForm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema) as any,
  });

  const onSubmit: SubmitHandler<PostFormData> = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post('https://dummyjson.com/posts/add', data);
      const newPost = response.data;

      console.log('API Response:', newPost);

      toast.success(`Post #${newPost.id} created successfully!`, {
        description: `"${newPost.title}" has been published.`,
      });
      reset();
    } catch (err) {
      console.error('Error:', err);
      toast.error('Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg border mt-10">
      <h2 className="text-xl font-bold mb-4">Add New Post</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup
          label="Title"
          register={register('title')}
          error={errors.title}
          disabled={loading}
        />
        <FieldGroup
          label="Body"
          register={register('body')}
          error={errors.body}
          isTextArea
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          {loading ? (
            <>
              <Spinner />
              Submitting...
            </>
          ) : (
            'Submit Post'
          )}
        </button>
      </form>
    </div>
  );
};

export default PostForm;