import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userFetchService } from "../BackendServices/userFetchServices";
import Loader from "../Components/Loader";
import { carouselsImages } from "../../constants/constants";

const SignUpInputs = [
  { label: "First Name", name: "firstName", placeholder: "John" },
  { label: "Last Name", name: "lastName", placeholder: "Doe" },
  {
    label: "Nationality",
    name: "nationality",
    placeholder: "Select your country",
  },
  {
    label: "State Of Residence",
    name: "state",
    placeholder: "Select your state",
  },
  { label: "City", name: "city", placeholder: "2 Louis St, Ikeja" },
  { label: "Email", name: "email", placeholder: "john@xyzmail.ccom" },
  { label: "Phone Number", name: "phone", placeholder: "234" },

  { label: "Date of Birth", name: "dOB", placeholder: "1/1/2017" },
  { label: "Password", name: "password", placeholder: "password" },
  {
    label: "confirm Password",
    name: "confirm-password",
    placeholder: "confirm-password",
  },
];

const SignupPage = () => {
  const navigate = useNavigate();
  const [currentIndex, _] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [countries, setCountries] = useState<{ name: string }[]>([]);
  const [countrydialCode, setcountrydialCode] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dOB: "",
    nationality: "",
    state: "",
    city: "",
    password: "",
  });

  const onSignUp = async () => {
    setLoading(true);
    const userService = new userFetchService();
    const createdUser = await userService.signUp({
      ...formData,
      phone: `${countrydialCode}${formData.phone}`,
    });
    console.log(`createdUserRes==>`, createdUser);

    if (createdUser.status === 201) {
      alert(createdUser.message);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } else {
      alert(createdUser.message);
    }
    setLoading(false);
  };
  const onHandleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setformData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Prevent removal of the country code
    if (!inputValue.startsWith(countrydialCode)) return;

    setformData({
      ...formData,
      phone: inputValue.replace(countrydialCode, ""),
    });
  };

  const BASE_URL = "https://countriesnow.space/api/v0.1/countries";

  const getAllCountries = async () => {
    try {
      const res = await fetch(`${BASE_URL}/positions`);
      const data = await res.json();
      setCountries(data.data || []);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const getCountryDialCode = async (country: string) => {
    try {
      const res = await fetch(`${BASE_URL}/codes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country }),
      });
      const data = await res.json();
      setcountrydialCode(data.data.dial_code || "");
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const getAllStateofCountry = async (country: string) => {
    try {
      setSelectedCountry(country);
      const res = await fetch(`${BASE_URL}/states`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country }),
      });
      const data = await res.json();
      setStates(data.data.states.map((state: { name: string }) => state.name));
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const getAllCitiesofState = async (country: string, state: string) => {
    try {
      const res = await fetch(`${BASE_URL}/state/cities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country, state }),
      });
      const data = await res.json();
      setCities(data.data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  useEffect(() => {
    getAllCountries();
    console.log(formData);
  }, [formData]);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-center bg-gray-100 overflow-hidden">
      <div className="inset-0 w-full h-full">
        {carouselsImages.map(({ img }, index) => (
          <img
            src={img}
            key={index}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute bottom-5 w-full p-5">
        <h2 className="text-2xl font-bold mb-4 text-white">Sign Up</h2>
        <div className="flex flex-col  gap-6">
          {SignUpInputs.map(({ label, name, placeholder }) => {
            if (label === "Nationality") {
              return (
                <select
                  key={name}
                  name={name}
                  value={formData.nationality}
                  className="p-2 border rounded"
                  onChange={(e) => {
                    getAllStateofCountry(e.target.value);
                    getCountryDialCode(e.target.value);
                    onHandleChange(e);
                  }}
                >
                  <option value="">Select a country</option>
                  {countries.map((country) => (
                    <option key={country.name} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              );
            }

            if (label === "State Of Residence") {
              return (
                <select
                  key={name}
                  name={name}
                  value={formData.state}
                  onChange={(e) => {
                    getAllCitiesofState(selectedCountry, e.target.value);
                    onHandleChange(e);
                  }}
                  className="p-2 border rounded"
                >
                  <option value="">Select a state</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              );
            }

            if (label === "City") {
              return (
                <select
                  name={name}
                  value={formData.city}
                  onChange={onHandleChange}
                  key={name}
                  className="p-2 border rounded"
                >
                  <option value="">Select a city</option>
                  {cities.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              );
            }

            if (label === "Date of Birth") {
              return (
                <input
                  key={label}
                  type="date"
                  name={name}
                  placeholder={placeholder}
                  required
                  className="p-2 border rounded"
                  onChange={onHandleChange}
                />
              );
            }

            if (label === "Phone Number") {
              return (
                <input
                  key={label}
                  type="phone"
                  name={name}
                  value={`${countrydialCode}${formData.phone}`}
                  placeholder={placeholder}
                  maxLength={14}
                  required
                  className="p-2 border rounded"
                  onChange={(e) => {
                    onHandleChange(e);
                    handlePhoneChange(e);
                  }}
                />
              );
            }

            return (
              <input
                key={label}
                type="text"
                name={name}
                placeholder={placeholder}
                required
                className="p-2 border rounded"
                onChange={onHandleChange}
              />
            );
          })}
          <button
            onClick={onSignUp}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Sign Up
          </button>
        </div>
        <p className="mt-4 text-sm text-white">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
      <Loader isLoading={loading} />
    </div>
  );
};

export default SignupPage;
