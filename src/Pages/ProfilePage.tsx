import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FullUserDetails, IGigToEdit } from "../types";
import { BiTrash } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";
import { PiCaretLeft } from "react-icons/pi";

const ProfilePage = ({ fulluser }: { fulluser: FullUserDetails }) => {
  const navigate = useNavigate();
  const [currentJob, _] = useState<IGigToEdit | null>(null);

  const jobDescription = {
    company: "Company Name",
    role: "Role",
    startDate: "Start Date",
    endDate: "End Date",
    skills: "Skills",
  };

  const [experiences, setExperiences] = useState([jobDescription]);
  const [cv, setCv] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experiences: [
      {
        "Company Name": "",
        Role: "",
        "Start Date": "",
        "End Date": "",
        Skills: "",
      },
    ],
  });

  useEffect(() => {
    try {
      setFormData((prev) => ({
        ...prev,
        name: `${fulluser?.firstName} ${fulluser?.lastName}`,
        email: fulluser?.email ?? "",
        phone: fulluser?.phone ?? "",
      }));
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);

  const [__, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCv(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email || !cv) {
      alert("Please fill in all required fields.");
      return;
    }

    setSubmitted(true);
    // setFormData({
    //   name: "",
    //   email: "",
    //   phone: "",
    //   experience: [],
    //   skills: "",
    // });
    setCv(null);
  };

  const handleExperienceChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedExperiences = formData.experiences.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    setFormData((prev) => ({
      ...prev,
      experiences: updatedExperiences,
    }));
  };

  const handleAddExperience = () => {
    setExperiences((prev) => [...prev, jobDescription]);
    setFormData((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          "Company Name": "",
          Role: "",
          "Start Date": "",
          "End Date": "",
          Skills: "",
        },
      ],
    }));
  };

  const handleDeleteExperience = (index: number) => {
    {
      if (experiences.length > 1) {
        const newExperience = experiences.filter((_, i) => i !== index);
        setExperiences(newExperience);
      } else {
        alert("You must provide at least one job experience");
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
        <PiCaretLeft
          className="text-xl text-slate-400"
          onClick={() => navigate(-1)}
        />

        <h2 className="text-2xl font-bold mb-6 text-center">
          {currentJob?.title}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email address"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-gray-700 font-medium mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your phone number"
            />
          </div>

          {/* CV Upload */}
          <div>
            <label
              htmlFor="cv"
              className="block text-gray-700 font-medium mb-2"
            >
              Upload CV <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              id="cv"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Experience */}

          {experiences.map(
            ({ company, endDate, role, skills, startDate }, index) => (
              <div key={index} className="relative">
                <label
                  htmlFor="experience"
                  className="block text-gray-700  font-medium mb-2"
                >
                  Work Experience {index + 1}
                </label>
                <div className="flex flex-col justify-between  gap-2">
                  <input
                    type="text"
                    className=" bg-slate-200 h-[60px] rounded-xl px-6 py-6 w-full"
                    placeholder={company}
                    onChange={(e) =>
                      handleExperienceChange(index, company, e.target.value)
                    }
                  />
                  <input
                    type="text"
                    className="h-[30px] bg-slate-200 rounded-xl px-6 py-6 w-full"
                    placeholder={role}
                    onChange={(e) =>
                      handleExperienceChange(index, role, e.target.value)
                    }
                  />
                  <input
                    type="date"
                    className="h-[30px] bg-slate-200 rounded-xl px-6 py-6 w-full"
                    placeholder={startDate}
                    onChange={(e) =>
                      handleExperienceChange(index, startDate, e.target.value)
                    }
                  />
                  <input
                    type="date"
                    className="h-[30px] bg-slate-200 rounded-xl px-6 py-6 w-full"
                    placeholder={endDate}
                    onChange={(e) =>
                      handleExperienceChange(index, endDate, e.target.value)
                    }
                  />
                  <input
                    type="text"
                    className="h-[30px] bg-slate-200 rounded-xl px-6 py-6 w-full"
                    placeholder={skills}
                    onChange={(e) =>
                      handleExperienceChange(index, skills, e.target.value)
                    }
                  />
                </div>
                <BiTrash
                  className="absolute right-3 text-2xl top-0"
                  onClick={() => handleDeleteExperience(index)}
                />
              </div>
            )
          )}
          <div className="w-full relative h-7">
            <BsPlus
              className="absolute right-0"
              onClick={handleAddExperience}
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold p-3 rounded-lg hover:bg-blue-600 transition"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
