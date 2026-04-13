import React from "react";

const PersonalDetails = ({ form, handleChange, handlePhotoChange }) => {

    const inputClass =
        "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/60 dark:bg-gray-800/60 focus:outline-none focus:ring-2 focus:ring-indigo-400/30 focus:border-indigo-500 dark:text-gray-100";

    return (
        <div>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
                Personal Information
            </h2>

            {/* Photo Upload */}
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

            {/* Personal Fields */}
            <div className="grid sm:grid-cols-2 gap-6">

                <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                    className={inputClass}
                />

                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                    className={inputClass}
                />

                <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className={inputClass}
                />

                <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Location"
                    className={inputClass}
                />

                <input
                    type="text"
                    name="jobTitle"
                    value={form.jobTitle}
                    onChange={handleChange}
                    placeholder="Desired Job Title"
                    className={inputClass}
                />

            </div>

        </div>
    );
};

export default PersonalDetails;