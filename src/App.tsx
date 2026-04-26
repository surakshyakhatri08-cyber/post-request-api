import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "./components/form-schema";
import type { PostFormData } from "./components/form-schema";
import { FieldGroup } from "./components/form-field";

const UserForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = (data: PostFormData) => console.log("Post Data:", data);

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4 font-sans text-white">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold mb-8 text-white">Create Post</h2>

        <FieldGroup 
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7V4h16v3M9 20h6M12 4v16"/></svg>} 
          error={errors.title}
        >
          <input
            {...register("title")}
            placeholder="Title"
            className="w-full bg-[#2a2a2a] p-3 rounded-xl border-none focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-500"
          />
        </FieldGroup>

        <FieldGroup 
          alignStart
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" y1="6" x2="3" y2="6"/><line x1="15" y1="12" x2="3" y2="12"/><line x1="17" y1="18" x2="3" y2="18"/></svg>} 
          error={errors.content}
        >
          <textarea
            {...register("content")}
            placeholder="Write your content..."
            rows={6}
            className="w-full bg-[#2a2a2a] p-3 rounded-xl border-none focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-500 resize-none"
          />
        </FieldGroup>

        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <button
            type="button"
            className="flex-1 py-4 border-2 border-gray-700 rounded-full font-semibold text-white hover:bg-gray-800 transition order-2 sm:order-1"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-4 bg-blue-500 rounded-full font-semibold text-white hover:bg-blue-600 transition shadow-lg shadow-blue-500/20 order-1 sm:order-2"
          >
            Publish Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;