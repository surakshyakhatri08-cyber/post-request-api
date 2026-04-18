import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

// Validation Schema
const schema = z.object({
  name: z.string().min(2, "Name is required"),
  phoneNumber: z.string().min(10, "Invalid phone number"),
  phoneType: z.string(),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  province: z.string().min(1, "Select a province"),
  district: z.string().min(3, "District is required"),
});

type FormData = z.infer<typeof schema>;

const UserForm = () => {
  const {
    handleSubmit, register, formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      phoneType: "Mobile",
    },
  });

  function onSubmit(data: FormData) {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4 font-sans">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-6 text-white"
      >
        <h2 className="text-3xl font-bold mb-8">Shipping</h2>

        {/* Name Input */}
        <div className="space-y-1">
          <div className="flex items-center gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            <input
              {...register("name")}
              placeholder="Name"
              className="w-full bg-[#2a2a2a] p-3 rounded-xl border-none focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-500"
            />
          </div>
          {errors.name && <p className="text-red-500 text-xs pl-10">{errors.name.message}</p>}
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <div className="flex items-center gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
            <div className="flex gap-2 w-full">
              <input
                {...register("phoneNumber")}
                placeholder="Phone Number"
                className="flex-1 bg-[#2a2a2a] p-3 rounded-xl border-none focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-500"
              />
              <select
                {...register("phoneType")}
                className="bg-[#2a2a2a] px-3 py-3 rounded-xl border-none outline-none text-gray-400 text-sm"
              >
                <option>Mobile</option>
                <option>Home</option>
                <option>Office</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          {errors.phoneNumber && <p className="text-red-500 text-xs pl-10">{errors.phoneNumber.message}</p>}
        </div>

        {/* Address Input */}
        <div className="space-y-1">
          <div className="flex items-center gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
            <input
              {...register("address")}
              placeholder="Address"
              className="w-full bg-[#2a2a2a] p-3 rounded-xl border-none focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-500"
            />
          </div>
          {errors.address && <p className="text-red-500 text-xs pl-10">{errors.address.message}</p>}
        </div>

        {/* City, Province, District */}
        <div className="pl-10 grid grid-cols-3 gap-2">
          {/* City */}
          <input
            {...register("city")}
            placeholder="City"
            className="w-full bg-[#2a2a2a] p-3 rounded-xl border-none focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-500 text-sm"
          />

          {/* Province */}
          <div className="relative">
            <select
              {...register("province")}
              className="w-full bg-[#2a2a2a] p-3 rounded-xl border-none outline-none text-gray-400 text-sm cursor-pointer focus:ring-2 focus:ring-blue-500 px-3 py-3"
            >
              <option value="">Province</option>
              <option value="Koshi">Koshi</option>
              <option value="Madhesh">Madhesh</option>
              <option value="Bagmati">Bagmati</option>
              <option value="Gandaki">Gandaki</option>
              <option value="Lumbini">Lumbini</option>
              <option value="Karnali">Karnali</option>
              <option value="Sudurpashchim">Sudurpashchim</option>
            </select>
          </div>

          {/* District */}
          <input
            {...register("district")}
            placeholder="District"
            className="w-full bg-[#2a2a2a] p-3 rounded-xl border-none focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-500 text-sm"
          />
        </div>
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <button
            type="button"
            className="flex-1 py-4 border-2 border-blue-500 rounded-full font-semibold text-white hover:bg-blue-500/10 transition order-2 sm:order-1"
          >
            Back to cart
          </button>
          <button
            type="submit"
            className="flex-1 py-4 bg-blue-500 rounded-full font-semibold text-white hover:bg-blue-600 transition shadow-lg shadow-blue-500/20 order-1 sm:order-2"
          >
            Proceed
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;