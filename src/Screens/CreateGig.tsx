import { useEffect, useState } from "react";
import { PiX } from "react-icons/pi";
import { AdsFetches } from "../BackendServices/adsFetchServices";
import { IGigToCreate } from "../types";
import SingleDropZone from "../Components/SingleDropZone";
import Cloudinary from "../Components/cloudinary";
import useToast from "../Components/Toast";

interface CreateJobAdvert {
  SetIsOpenCreateGig: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateJobAdvert = ({ SetIsOpenCreateGig }: CreateJobAdvert) => {
  const toast = useToast();

  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImagesFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<IGigToCreate>({
    title: "",
    description: "",
    workmode: "Remote",
    remuneration: "Commission",
    amount: 0,
    image: "",
    date: new Date(),
    eligibility: "",
    // location: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    if (!imageFile) {
      toast("Please upload at least one image", "error");
      return;
    }
    const fetches = new AdsFetches();
    const imageUrl = await Cloudinary(imageFile);
    const createdGig = await fetches.CreateAds({
      ...formData,
      image: imageUrl,
    });
    if (createdGig.status === 200) {
      alert(createdGig.message);
      // Reset form
      setFormData({
        title: "",
        description: "",
        remuneration: "Commission",
        workmode: "Remote",
        amount: 0,
        image: "",
        date: new Date(),
        eligibility: "",
        //   location: ,
      });
      setImagesFile(null);
    } else {
      alert(createdGig.message);
      return;
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className="min-h-screen  flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl">
        <div className="flex flex-row items-center mb-6 justify-between">
          <h2 className="text-2xl font-semibold ">Create Job Advert</h2>
          <span className="text-3xl font-extrabold text-red-700">
            <PiX onClick={() => SetIsOpenCreateGig((prev: boolean) => !prev)} />
          </span>
        </div>
        {submitted && (
          <div className="mb-4 text-green-600 text-center">
            Job advert submitted successfully!
          </div>
        )}
        <div className="space-y-6">
          {/* Job Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-gray-700 font-medium mb-2"
            >
              Job Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter the job title"
              required
            />
          </div>

          {/* Job Description */}
          <div>
            <label
              htmlFor="jobDescription"
              className="block text-gray-700 font-medium mb-2"
            >
              Job Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Provide a detailed job description"
              required
            />
          </div>

          {/* Work Mode */}
          <div>
            <label
              htmlFor="WorkMode"
              className="block text-gray-700 font-medium mb-2"
            >
              Work Mode
            </label>
            <select
              id="workmode"
              name="workmode"
              value={formData.workmode}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="">Select a mode of payment</option>
              <option value="Remote">Remote</option>
              <option value="On-Site">On-Site</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          {/* Mode of Payment */}
          <div>
            <label
              htmlFor="modeOfPayment"
              className="block text-gray-700 font-medium mb-2"
            >
              Mode of Payment
            </label>
            <select
              id="remuneration"
              name="remuneration"
              value={formData.remuneration}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="">Select a mode of payment</option>
              <option value="Hourly">Hourly</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Commission">Commission</option>
            </select>
          </div>

          {/* IMAGE */}
          <SingleDropZone
            image={image}
            setImage={setImage}
            setImageFile={setImagesFile}
          />
          {/* AMOUNT */}
          <div>
            <label
              htmlFor="jobTitle"
              className="block text-gray-700 font-medium mb-2"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              min={0}
              value={formData.amount}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter the job title"
              required
            />
          </div>

          {/* Eligibility */}
          <div>
            <label
              htmlFor="eligibility"
              className="block text-gray-700 font-medium mb-2"
            >
              Eligibility
            </label>
            <textarea
              id="eligibility"
              name="eligibility"
              value={formData.eligibility}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="List the eligibility criteria (e.g., Bachelor's degree, 2 years experience)"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white font-semibold p-3 rounded-lg hover:bg-blue-600 transition"
            >
              Submit Job Advert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateJobAdvert;
