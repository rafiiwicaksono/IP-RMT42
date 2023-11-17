import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar"
import axios from "axios"
import { useEffect, useState } from "react";

export const EditProfile = () => {
    const navigate = useNavigate();
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
            console.error(error.message);
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
            console.error(error.message);
        }
    };
    return (
        <div>
            <Navbar />
            <section id="cms-edit">
                <div className="container-edit">
                    <form style={{ width: "23rem" }}>

                        <h3 className="fw-normal mb-3 pb-3" style={{ letterspacing: "1px" }}>Edit Profile</h3>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form2Example18">Full Name</label>
                            <input type="text" id="form2Example18" className="form-control form-control-lg"
                                placeholder="Your Full Name" name="fullName" value={profileData.fullName} onChange={handleInputChange} />
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form2Example28">Adress</label>
                            <input type="text" id="form2Example28" className="form-control form-control-lg"
                                placeholder="Your Adress" name="address" value={profileData.address} onChange={handleInputChange} />
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form2Example38">Phone Number</label>
                            <input type="text" id="form2Example38" className="form-control form-control-lg"
                                placeholder="Your Phone Number" name="phoneNumber" value={profileData.phoneNumber} onChange={handleInputChange} />
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