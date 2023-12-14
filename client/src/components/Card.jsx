import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

export const Card = ({ todo }) => {
    const handlePayment = async () => {
        try {
            const access_token = localStorage.getItem(`access_token`)
            const config = {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
            const response = await axios.post('http://localhost:3000/payment/midtrans/token', {}, config);
            window.snap.pay(response.data.token);
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
        <div key={todo.id} className="card" style={{ width: "18rem" }}>
            <img src={todo.imageUrl} style={{ width: "18rem", height: "15rem" }}
                className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{todo.name}</h5>
                <p className="card-text">Price : Rp {todo.price}00</p>
                <p className="card-text">Calory : {todo.calory} Cal</p>
                {/* <Link to={`/payment/${todo.id}`}> */}
                    <button className="btn btn-primary" onClick={handlePayment}>Buy</button>
                {/* </Link> */}
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