/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import InputField from "../../../components/form/InputFields";
import { useJoinEmployeeMutation } from "../../../redux/features/employee/employeeApi";

const CreateEmployeeEntry = () => {
    const [loading, setLoading] = useState(false);

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            name: "",
            phone: ""
        }
    });

    const [joinEmployee] = useJoinEmployeeMutation();

    const onSubmit = async (data: any) => {
        const toastId = toast.loading("Processing...", { autoClose: 2000 });
        try {
            setLoading(true);

            const result = await joinEmployee(data);
            if (result?.data?.success) {
                toast.update(toastId, { render: result.data.message, type: "success", isLoading: false, autoClose: 1500, closeOnClick: true });
                reset()
            } else {
                toast.update(toastId, { render: `${(result as any)?.error?.data?.message}`, type: "error", isLoading: false, autoClose: 2000 });

            }
        } catch (err: any) {
            toast.update(toastId, { render: err?.error?.data?.message || "Something went wrong!", type: "error", isLoading: false, autoClose: 2000 });

        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="flex justify-center items-center mt-10"
        >
            <div
                className="bg-white p-4 rounded-lg shadow-lg"
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">কর্মীর তথ্য</h2>


                </div>

                <form className="mb-3" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-3    ">

                        <InputField
                            type="text"
                            name="name"
                            label="কর্মীর নাম"
                            control={control}
                            rules={{ required: "কর্মীর নাম নাই" }}
                        />



                        <InputField
                            type="text"
                            name="phone"
                            label="মোবাইল নাম্বার"
                            control={control}
                            rules={{ required: "মোবাইল নাম্বার নাই" }}
                        />

                        <InputField
                            type="number"
                            name="basicSalary"
                            label="মাসিক বেতন"
                            control={control}
                            rules={{ required: "মাসিক বেতন নাই" }}
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-full mt-3"
                    >
                        {loading ? (
                            <span className="loading loading-dots loading-lg"></span>
                        ) : (
                            "Join New Employee"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateEmployeeEntry
