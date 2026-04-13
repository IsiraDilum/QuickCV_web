import React from "react";
import {useNavigate} from "react-router-dom";
import Header from "../../components/page/Header";
import Footer from "../../components/page/Footer";

const ReviewDetails = ()=>{

    const navigate = useNavigate()

    const data = JSON.parse(localStorage.getItem("cvData")) || {}

    const submit = ()=>{
        navigate("/select-theme")
    }

    return(

        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">

            <Header/>

            <main className="max-w-4xl mx-auto py-14 px-6">

                <h2 className="text-3xl font-bold text-center mb-10">
                    Review Your CV
                </h2>

                <div className="bg-white p-6 rounded-xl shadow space-y-2">

                    <p><strong>Name:</strong> {data.fullName}</p>
                    <p><strong>Email:</strong> {data.email}</p>
                    <p><strong>Phone:</strong> {data.phone}</p>
                    <p><strong>Location:</strong> {data.location}</p>
                    <p><strong>Job Title:</strong> {data.jobTitle}</p>
                    <p><strong>Summary:</strong> {data.summary}</p>
                    <p><strong>Education:</strong> {data.education}</p>
                    <p><strong>Experience:</strong> {data.experience}</p>

                </div>

                <button
                    onClick={submit}
                    className="mt-10 w-full py-3 bg-indigo-600 text-white rounded-xl"
                >
                    Save & Select Theme
                </button>

            </main>

            <Footer/>

        </div>

    )
}

export default ReviewDetails