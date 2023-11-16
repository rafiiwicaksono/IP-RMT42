import { useEffect, useState } from "react";
import { Navbar } from "./Navbar"
import axios from "axios";
import { Link } from "react-router-dom";
export const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    async function fetchProfileData() {
        try {
            const access_token = localStorage.getItem(`access_token`)
            const config = {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
            const response = await axios.get('http://localhost:3000/profile', config);
            setProfileData(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    useEffect(() => {
        fetchProfileData()
    }, []);
    return (
        <div>
            <Navbar />
            <section className="vh-100" style={{ backgroundcolor: "#f4f5f7" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-lg-6 mb-4 mb-lg-0">
                            <div className="card mb-3" style={{ borderradius: ".5rem" }}>
                                <div className="row g-0">
                                    <div className="col-md-4 gradient-custom text-center text-white"
                                        style={{ bordertopleftradius: ".5rem", borderbottomleftradius: ".5rem" }}>
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                            alt="Avatar" className="img-fluid my-5" style={{ width: "80px" }} />
                                        <h5>{profileData?.fullName || `Not Fill`}</h5>
                                        <i className="far fa-edit mb-5"></i>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body p-4">
                                            <h6>Information</h6>
                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-1">
                                                <div className="col-6 mb-3">
                                                    <h6>Address</h6>
                                                    <p className="text-muted">{profileData?.address || `Not Fill`}</p>
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <h6>Phone</h6>
                                                    <p className="text-muted">{profileData?.phoneNumber || `Not Fill`}</p>
                                                </div>
                                                <Link to={`/profile/edit`}>
                                                    <h6>Edit Profile</h6>
                                                </Link>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}