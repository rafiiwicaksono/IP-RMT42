import { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import Swal from "sweetalert2";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux"
import { fetchTransaction } from "../features/appSlice";

export const Transaction = () => {
  const { currentTheme, theme } = useTheme();

  const {data} = useSelector((state) => state.appReducer)
  const dispatch = useDispatch()
  

  useEffect(() => {
    dispatch(fetchTransaction())
  }, [])

  const handleDelete = async (OrderId) => {
    const access_token = localStorage.getItem('access_token');
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
    try {
      await axios.delete(`https://calorie-choice.blog-website.my.id/payment/transactions/${OrderId}`, config);
      fetchData();
    } catch (error) {
      let errorMessage;
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

  const handleEdit = async (OrderId) => {
    const access_token = localStorage.getItem('access_token');
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
    try {
      await axios.put(`https://calorie-choice.blog-website.my.id/payment/transactions/${OrderId}`, data, config);
      fetchData();
    } catch (error) {
      let errorMessage;
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
    <div className={`body-bg ${theme[currentTheme].bgColor} ${theme[currentTheme].textColor}`}>
      <Navbar />
      <div className={`container ${theme[currentTheme].bgColor} ${theme[currentTheme].textColor}`}>
        <div className="table-wrap">
          <table className={`table table-responsive table-borderless ${theme[currentTheme].tableBgColor}`}>
            <thead>
              <th>Order ID</th>
              <th>&nbsp;</th>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Action</th>
            </thead>
            <tbody>
              {data.map((el) => (
                <tr className={`align-middle alert border-bottom ${theme[currentTheme].textColor}`} role="alert" key={el.id}>
                  <td>
                    {el.orderId}
                  </td>
                  <td className="text-center">
                    <img className="pic"
                      src={el.Food.imageUrl}
                      alt="" />
                  </td>
                  <td>
                    <div>
                      <p className="m-0 fw-bold">{el.Food.name}</p>
                      <p className="m-0 text-muted">{el.Food.calory} Cal</p>
                    </div>
                  </td>
                  <td>
                    <div className="fw-600">Rp.{el.totalAmount}</div>
                  </td>
                  <td className="d-">
                    <input className="input" type="text" placeholder="1" />
                  </td>
                  <td style={{ color: el.statusPayment === 'pending' ? 'red' : el.statusPayment === 'paid' ? 'blue' : el.statusPayment === 'success' ? 'green' : 'black' }}>
                    {el.statusPayment}
                  </td>
                  <td>
                    {el.statusPayment === 'pending' && (
                      <button type="button" className="btn btn-danger" onClick={() => handleDelete(el.id)}>
                        Cancel
                      </button>
                    )}
                    {el.statusPayment === 'paid' && (
                      <button type="button" className="btn btn-success" onClick={() => handleEdit(el.id)}>
                        Get Item
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
