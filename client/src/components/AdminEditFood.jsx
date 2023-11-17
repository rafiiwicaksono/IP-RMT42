import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "./Navbar"
import axios from "axios"
import { useEffect, useState } from "react";

export const AdminEditFood = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [FoodData, setFoodData] = useState({
        name: '',
        imageUrl: '',
        price: '',
        calory: ''
    });
    const handleInputChange = (e) => {
        setFoodData({
            ...FoodData,
            [e.target.name]: e.target.value,
        });
    };
    const fetchFoodData = async () => {
        try {
            const access_token = localStorage.getItem(`access_token`)
            const config = {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
            const response = await axios.get(`http://localhost:3000/foods/admin/${id}`, config);
            setFoodData(response.data);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        fetchFoodData();
    }, [id]);

    const handleEdit = async () => {
        try {
            const access_token = localStorage.getItem(`access_token`)
            const config = {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
            await axios.put(`http://localhost:3000/posts/${id}`, FoodData, config)
            navigate(`/foods/admin`)
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

                        <h3 className="fw-normal mb-3 pb-3" style={{ letterspacing: "1px" }}>Edit Food</h3>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form2Example18">Name</label>
                            <input type="text" id="form2Example18" className="form-control form-control-lg"
                                placeholder="Your Name" name="name" value={FoodData.name} onChange={handleInputChange} />
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form2Example28">Image Url</label>
                            <input type="text" id="form2Example28" className="form-control form-control-lg"
                                placeholder="Your Image Url" name="imageUrl" value={FoodData.imageUrl} onChange={handleInputChange} />
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form2Example38">Price</label>
                            <input type="number" id="form2Example38" className="form-control form-control-lg"
                                placeholder="Your Price" name="price" value={FoodData.price} onChange={handleInputChange} />
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form2Example39">Calory</label>
                            <input type="number" id="form2Example39" className="form-control form-control-lg"
                                placeholder="Your Calory" name="calory" value={FoodData.calory} onChange={handleInputChange} />
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