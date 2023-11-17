import { Link } from "react-router-dom"
import { Navbar } from "./Navbar"
import axios from "axios";
import { useEffect, useState } from "react";

export const AdminFood = () => {
    const [foods, setFoods] = useState([])
    async function fetchFood() {
        const access_token = localStorage.getItem(`access_token`)
        const config = {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }
        try {
            const response = await axios.get(`http://localhost:3000/foods/admin`, config)
            setFoods(response.data)
        } catch (error) {
            console.log(error.message)
        }
    }
    const handleDelete = async (foodId) => {
        const access_token = localStorage.getItem('access_token');
        const config = {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
        }
        try {
            await axios.delete(`http://localhost:3000/foods/admin/${foodId}`, config);
            fetchFood();
        } catch (error) {
            console.error( error.message);
        }
    };
    useEffect(() => {
        fetchFood()
    }, []);
    return (
        <div>
            <Navbar />
            <section id="cms-entitas-utama">
                <div className="create-post">
                    <Link to="/foods/admin/create">
                        <button type="button" className="btn btn-primary">Create Food</button>
                    </Link>

                </div>

                <table className="table caption-top">
                    <caption>List of foods</caption>
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Image</th>
                            <th scope="col">Price</th>
                            <th scope="col">Calory</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foods.map((food, i) => (
                            <tr key={food.id}>
                            <th scope="row">{++i}</th>
                            <td>{food.name}</td>
                            <td>
                                <img src={food.imageUrl} style={{height:200, width:250}}
                                    className="card-img-top" alt="..." />
                            </td>
                            <td>{food.price}</td>
                            <td>{food.calory}</td>
                            <td>
                                <div className="action-post">
                                    <Link to={`/foods/admin/${food.id}`}>
                                        <button type="button" className="btn btn-warning">Edit</button>
                                    </Link>
                                    <Link>
                                        <button type="button" className="btn btn-danger" onClick={() => handleDelete(food.id)}>Delete</button>
                                    </Link>
                                </div>
                            </td>
                        </tr>
                        ))}
                        
                    </tbody>
                </table>
            </section>
        </div>
    )
}