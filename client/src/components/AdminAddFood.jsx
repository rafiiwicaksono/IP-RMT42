import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useTheme } from "../context/ThemeContext";

export const AdminAddFood = () => {
    const navigate = useNavigate();
    const { currentTheme, theme } = useTheme()
    const [formData, setFormData] = useState({
        name: "",
        imageUrl: "",
        price: "",
        calory: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const createFood = async () => {
        try {
            const access_token = localStorage.getItem(`access_token`);
            const config = {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            };
            await axios.post("https://calorie-choice.blog-website.my.id/foods/admin", formData, config);
            navigate("/foods/admin");
        } catch (error) {
            let errorMessage;
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            Swal.fire({
                icon: "error",
                title: "Error",
                text: errorMessage,
            });
        }
    };

    return (
        <div>
            <Navbar />
            <section id="cms-create" className={`${theme[currentTheme].bgColor}`}>
                <div className="container-create">
                    <form style={{ width: "23rem" }}>
                        <h3 className={`fw-normal mb-3 pb-3 ${theme[currentTheme].textColor}`} style={{ letterSpacing: "1px" }}>
                            Create Food
                        </h3>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form2Example18" style={{ color: theme[currentTheme].textColor }}>
                                Name
                            </label>
                            <input
                                type="text"
                                id="form2Example18"
                                className={`form-control form-control-lg`}
                                placeholder="Your Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form2Example28" style={{ color: theme[currentTheme].textColor }}>
                                Image Url
                            </label>
                            <input
                                type="text"
                                id="form2Example28"
                                className={`form-control form-control-lg`}
                                placeholder="Your Image Url"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form2Example38" style={{ color: theme[currentTheme].textColor }}>
                                Price
                            </label>
                            <input
                                type="number"
                                id="form2Example38"
                                className={`form-control form-control-lg`}
                                placeholder="Your Price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form2Example39" style={{ color: theme[currentTheme].textColor }}>
                                Calory
                            </label>
                            <input
                                type="number"
                                id="form2Example39"
                                className={`form-control form-control-lg`}
                                placeholder="Your Calory"
                                name="calory"
                                value={formData.calory}
                                onChange={handleChange}
                            />
                        </div>

                        <br />
                        <div className="pt-1 mb-4">
                            <button className="btn btn-info btn-lg btn-block" type="button" onClick={createFood}>Create</button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};
