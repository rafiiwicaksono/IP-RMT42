import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar"
import { useState } from "react"
import axios from "axios"

export const AdminAddFood = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        imageUrl: '',
        price: '',
        calory: ''
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
            const access_token = localStorage.getItem(`access_token`)
            const config = {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
            await axios.post('http://localhost:3000/foods/admin', formData, config)
            navigate('/foods/admin');
        } catch (error) {
            console.error(error.message);
        }
    };
    return (
        <div>
            <Navbar/>
            <section id="cms-create">
                <div className="container-create">
                    <form style={{ width: "23rem" }}>

                        <h3 className="fw-normal mb-3 pb-3" style={{ letterspacing: "1px" }}>Create Food</h3>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form2Example18">Name</label>
                            <input type="text" id="form2Example18" className="form-control form-control-lg"
                                placeholder="Your Name" name="name" value={formData.name} onChange={handleChange} />
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form2Example28">Image Url</label>
                            <input type="text" id="form2Example28" className="form-control form-control-lg"
                                placeholder="Your Image Url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form2Example38">Price</label>
                            <input type="number" id="form2Example38" className="form-control form-control-lg"
                                placeholder="Your Price" name="price" value={formData.price} onChange={handleChange} />
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form2Example39">Calory</label>
                            <input type="number" id="form2Example39" className="form-control form-control-lg"
                                placeholder="Your Calory" name="calory" value={formData.calory} onChange={handleChange} />
                        </div>

            
                        <br />
                        <div className="pt-1 mb-4">
                            <button className="btn btn-info btn-lg btn-block" type="button" onClick={createFood}>Create</button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}