import React from "react";

const PersonalInformation = ({ form, handleChange, handlePhotoChange, inputClass }) => {
    return (
        <>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
                Personal Information
            </h2>

            <div className="flex flex-col items-center mb-8">
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-indigo-500 shadow bg-white dark:bg-gray-800">
                    {form.photo ? (
                        <img
                            src={form.photo}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No Photo
                        </div>
                    )}
                </div>

                <label className="mt-4 cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                    Upload Photo
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                    />
                </label>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
                {["fullName", "email", "phone", "location", "jobTitle"].map((field) => (
                    <input
                        key={field}
                        type={
                            field === "email"
                                ? "email"
                                : field === "phone"
                                    ? "tel"
                                    : "text"
                        }
                        name={field}
                        value={form[field]}
                        onChange={handleChange}
                        placeholder={
                            field === "fullName"
                                ? "Full Name"
                                : field === "email"
                                    ? "Email Address"
                                    : field === "phone"
                                        ? "Phone Number"
                                        : field === "location"
                                            ? "Location"
                                            : "Desired Job Title"
                        }
                        required={field === "fullName" || field === "email"}
                        className={inputClass}
                    />
                ))}
            </div>
        </>
    );
};

export default PersonalInformation;