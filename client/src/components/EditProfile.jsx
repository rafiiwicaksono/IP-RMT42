import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useTheme } from "../context/ThemeContext";

export const EditProfile = () => {
    const navigate = useNavigate();
    const { theme, currentTheme } = useTheme();

    const [profileData, setProfileData] = useState({
        fullName: '',
        address: '',
        phoneNumber: ''
    });

    const handleInputChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value,
        });
    };

    const fetchProfileData = async () => {
        try {
            const access_token = localStorage.getItem(`access_token`)
            const config = {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
            const response = await axios.get(`http://localhost:3000/profile`, config);
            setProfileData(response.data);
        } catch (error) {
            let errorMessage
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
            });
        }
    }

    useEffect(() => {
        fetchProfileData();
    }, []);

    const handleEdit = async () => {
        try {
            const access_token = localStorage.getItem(`access_token`)
            const config = {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
            await axios.put(`http://localhost:3000/profile`, profileData, config)
            navigate(`/profile`)
        } catch (error) {
            let errorMessage
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
            });
        }
    };

    return (
        <div>
            <Navbar />
            <section id="cms-edit" className={theme[currentTheme].bgColor}>
                <div className={`container-edit ${theme[currentTheme].textColor}`}>
                    <form style={{ width: "23rem" }}>

                        <h3 className={`fw-normal mb-3 pb-3 ${theme[currentTheme].textColor}`} style={{ letterSpacing: "1px" }}>
                            Edit Profile
                        </h3>

                        <div className="form-outline mb-4">
                            <label className={`form-label ${theme[currentTheme].textColor}`} htmlFor="form2Example18">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="form2Example18"
                                className={`form-control form-control-lg`}
                                placeholder="Your Full Name"
                                name="fullName"
                                value={profileData.fullName}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-outline mb-4">
                            <label className={`form-label ${theme[currentTheme].textColor}`} htmlFor="form2Example28">
                                Address
                            </label>
                            <input
                                type="text"
                                id="form2Example28"
                                className={`form-control form-control-lg`}
                                placeholder="Your Address"
                                name="address"
                                value={profileData.address}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-outline mb-4">
                            <label className={`form-label ${theme[currentTheme].textColor}`} htmlFor="form2Example38">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                id="form2Example38"
                                className={`form-control form-control-lg`}
                                placeholder="Your Phone Number"
                                name="phoneNumber"
                                value={profileData.phoneNumber}
                                onChange={handleInputChange}
                            />
                        </div>

                        <br />
                        <div className="pt-1 mb-4">
                            <button className="btn btn-info btn-lg btn-block" type="button" onClick={handleEdit}>Edit</button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}
