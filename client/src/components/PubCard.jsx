import PropTypes from 'prop-types'

export const PubCard = ({ todo }) => {
    return (
        <div key={todo.id} className="card" style={{ width: "18rem" }}>
            <img src={todo.imageUrl} style={{ width: "18rem", height: "15rem" }}
                className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{todo.name}</h5>
                <p className="card-text">Price : Rp {todo.price}00</p>
                <p className="card-text">Calory : {todo.calory} Cal</p>
            </div>
        </div>
    )
}

PubCard.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.number,
        imageUrl: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        calory: PropTypes.number
    })
}