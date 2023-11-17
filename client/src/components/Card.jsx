import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import axios from 'axios';

export const Card = ({ todo }) => {
    const handleBuyClick = async () => {
        try {
            const access_token = localStorage.getItem(`access_token`)
            const config = {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
            const response = await axios.post('http://localhost:3000/payment/create-session', {
                FoodId: todo.id,
                quantity: 1
            }, config);
            window.location.href = response.data.id;
        } catch (error) {
            console.error('Error initiating payment:', error);
        }
    };
    return (
        <div key={todo.id} className="card" style={{ width: "18rem" }}>
            <img src={todo.imageUrl} style={{ width: "18rem", height: "15rem" }}
                className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{todo.name}</h5>
                <p className="card-text">Price : Rp {todo.price}00</p>
                <p className="card-text">Calory : {todo.calory} Cal</p>
                <button className="btn btn-primary" onClick={handleBuyClick}>
                    Buy
                </button>
            </div>
        </div>
    )
}

Card.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.number,
        imageUrl: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        calory: PropTypes.number
    })
}