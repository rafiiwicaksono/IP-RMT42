import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import Swal from "sweetalert2";

export const Login = () => {
    const navigate = useNavigate();
    const handlePublicFood = () => {
        navigate("/pub/foods")
    }

    const [form, setForm] = useState({
        email: ``,
        password: ``
    })

    const [error, setError] = useState("")

    const handleLogin = async () => {
        try {
            const { data } = await axios.post(`http://localhost:3000/login`, form)
            localStorage.setItem(`access_token`, data.access_token)
            navigate(`/foods`)
        } catch (error) {
            let errorMessage
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
            });
        }
    }

    async function handleCredentialResponse(response) {
        try {
            let {data} = await axios.post(`http://localhost:3000/google-login`, null, {
                headers: {
                    g_token: response.credential
                }
            })
            localStorage.setItem(`access_token`, data.access_token)
            navigate(`/foods`)
        } catch (error) {
            let errorMessage
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
            });
        }
      }
    
    useEffect(() => {
        google.accounts.id.initialize({
            client_id: "199027147966-oeto1p8safjjv895uh1rfa5emrmnehok.apps.googleusercontent.com",
            callback: handleCredentialResponse
          });
          google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            { theme: "outline", size: "large" } 
          );
    }, [])
    return (
        <section id="cms-login">
            <div className="pub-button">
                <Link onClick={handlePublicFood}>
                    <button type="button" className="btn btn-dark">Calorie Choice</button>
                </Link>
            </div>
            <div className="container-login">
                <form style={{ width: "23rem" }}>

                    <h3 className="fw-normal mb-3 pb-3" style={{ letterspacing: "1px" }}>Welcome to Calorie Choice</h3>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example18">Email</label>
                        <input type="email" id="form2Example18" className="form-control form-control-lg"
                            placeholder="Your Email" value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example28">Password</label>
                        <input type="password" id="form2Example28" className="form-control form-control-lg"
                            placeholder="Your Password" value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })} />
                    </div>

                    <div className="pt-1 mb-4">
                        <button className="btn btn-info btn-lg btn-block" type="button" onClick={handleLogin}>Login</button>
                    </div>

                    <div id="buttonDiv"></div>

                    <p className="text-center text-muted mt-5 mb-0">Don't have an account? <Link to="/register"
                        className="fw-bold text-body"><u>Register here</u></Link></p>
                </form>
            </div>
        </section>
    )
}