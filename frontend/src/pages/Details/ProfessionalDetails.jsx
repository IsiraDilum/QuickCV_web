import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import Header from "../../components/page/Header";
import Footer from "../../components/page/Footer";

const ProfessionalDetails = ()=>{

    const navigate = useNavigate();

    const [form,setForm] = useState(
        JSON.parse(localStorage.getItem("cvData")) || {}
    )

    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }

    const nextPage=()=>{
        localStorage.setItem("cvData",JSON.stringify(form))
        navigate("/details/projects")
    }

    const prevPage=()=>{
        localStorage.setItem("cvData",JSON.stringify(form))
        navigate("/details/personal")
    }

    const inputClass="w-full px-4 py-3 border border-gray-300 rounded-xl";

    return(

        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">

            <Header/>

            <main className="max-w-4xl mx-auto py-14 px-6">

                <h2 className="text-3xl font-bold text-center mb-10">
                    Professional Details
                </h2>

                <div className="space-y-6">

<textarea
    name="summary"
    value={form.summary || ""}
    onChange={handleChange}
    placeholder="Professional Summary"
    rows="5"
    className={inputClass}
/>

                    <textarea
                        name="education"
                        value={form.education || ""}
                        onChange={handleChange}
                        placeholder="Education"
                        rows="4"
                        className={inputClass}
                    />

                    <textarea
                        name="experience"
                        value={form.experience || ""}
                        onChange={handleChange}
                        placeholder="Experience"
                        rows="4"
                        className={inputClass}
                    />

                </div>

                <div className="flex gap-4 mt-10">

                    <button
                        onClick={prevPage}
                        className="flex-1 py-3 bg-gray-300 rounded-xl"
                    >
                        Back
                    </button>

                    <button
                        onClick={nextPage}
                        className="flex-1 py-3 bg-indigo-600 text-white rounded-xl"
                    >
                        Next
                    </button>

                </div>

            </main>

            <Footer/>

        </div>

    )
}

export default ProfessionalDetails