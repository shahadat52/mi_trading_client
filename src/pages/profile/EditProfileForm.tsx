/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, type FieldValues } from "react-hook-form";
import InputField from "../../components/form/InputFields";
import { useGetMyDataQuery, useUpdateUserMutation } from "../../redux/features/auth/authApi";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hook";
import { useEffect } from "react";

interface EditProfileFormProps {
  onClose: () => void;
}

const EditProfileForm = ({ onClose }: EditProfileFormProps) => {
  const dispatch = useAppDispatch();
  const [updateUser, { isLoading, isSuccess, error }] = useUpdateUserMutation();
  const { data } = useGetMyDataQuery(undefined);

  const user = data?.data || {};

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: ""
    }
  });

  // Load default values when API data arrives
  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || ""
      });
    }
  }, [user, reset]);

  const handleUpdate = async (formData: FieldValues) => {
    const toastId = toast.loading("Processing...", { autoClose: 2000 });

    try {
      const result = await updateUser(formData);

      if (result?.data?.success) {
        toast.update(toastId, {
          render: result.data.message,
          type: "success",
          isLoading: false,
          autoClose: 1500,
        });

        const token = result?.data?.data?.accessToken;
        if (token) {
          try {
            const decodedUser = jwtDecode(token);
            dispatch(setUser({ user: decodedUser, token }));
            onClose();
          } catch {
            toast.update(toastId, {
              render: "Invalid token received!",
              type: "error",
              isLoading: false,
              autoClose: 2000,
            });
          }
        }
      }
    } catch (err: any) {
      toast.update(toastId, {
        render: err?.error?.data?.message || "Something went wrong!",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleUpdate)}
      className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mx-auto "
    >
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl p-5 md:p-6 
                  max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

        <InputField name="name" label="Name" control={control} rules={{ required: "Required" }} />
        <InputField name="email" label="Email" control={control} rules={{ required: "Required" }} readOnly={true} />
        <InputField name="phone" label="Phone" control={control} rules={{ required: "Required" }} readOnly={true} />
        <InputField name="role" label="Role" control={control} rules={{ required: "Required" }} readOnly={true} />

        <InputField name="oldPassword" label="Old Password" control={control} />
        <InputField name="newPassword" label="New Password" control={control} />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Updating..." : "Save Changes"}
        </button>

        {isSuccess && <p className="mt-3 text-green-600">Profile updated successfully!</p>}
        {error && <p className="mt-3 text-red-600">Failed to update profile.</p>}
      </div>
    </form>
  );
};

export default EditProfileForm;