import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "./Card";
import { Navbar } from "./Navbar";
import { themeContext } from "../context/ThemeContext";

export const Food = () => {
    const [pubPosts, setPubFoods] = useState([])
    const [filteredFoods, setFilteredFoods] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc')
    const [selectedCalories, setSelectedCalories] = useState([]);

    const caloriesOptions = [
        { id: 1, calory: { min: 0, max: 200 } },
        { id: 2, calory: { min: 201, max: 500 } },
        { id: 3, calory: { min: 501, max: 1000 } },
    ];
    const handleCheckboxChange = (e) => {
        const caloryId = parseInt(e.target.value);
        const selectedCalory = caloriesOptions.find((calory) => calory.id === caloryId);

        if (e.target.checked) {
            setSelectedCalories((prev) => [...prev, selectedCalory]);
        } else {
            setSelectedCalories((prev) => prev.filter((item) => item.id !== caloryId));
        }
    };

    async function fetchPubFoods() {
        try {
            const access_token = localStorage.getItem(`access_token`)
            const config = {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
            const response = await axios.get('http://localhost:3000/foods', config);
            setPubFoods(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        fetchPubFoods()
    }, []);

    useEffect(() => {
        let filteredData = pubPosts.filter((post) =>
            post.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (selectedCalories.length > 0) {
            filteredData = filteredData.filter((post) =>
                selectedCalories.some((calory) =>
                    post.calory >= calory.calory.min && post.calory <= calory.calory.max
                )
            );
        }

        if (sortOrder === 'asc') {
            filteredData.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOrder === 'desc') {
            filteredData.sort((a, b) => b.name.localeCompare(a.name));
        }

        setFilteredFoods(filteredData);

    }, [pubPosts, searchTerm, sortOrder, selectedCalories]);
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    }

    const {currentTheme, theme, setCurrentTheme} = useContext(themeContext)
    const handleChangeTheme = () => {
        if (currentTheme === 'light') {
            setCurrentTheme('dark');
        } else {
            setCurrentTheme('light');
        }
    };

    return (
        <div className={"container-fluid" + theme[currentTheme].bgColor}>
            <Navbar />
            <section id="public-home">
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <button
                            type="button"
                            variant={theme[currentTheme].btnVariant}
                            onClick={handleChangeTheme}
                            >
                                Change Theme - {currentTheme}
                            </button>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item dropdown">
                                    <select
                                        className="form-select"
                                        aria-label="Default select example"
                                        onChange={handleSortChange}
                                        value={sortOrder}
                                    >
                                        <option value="asc">A to Z</option>
                                        <option value="desc">Z to A</option>
                                    </select>
                                </li>
                            </ul>

                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="text" placeholder="Search" aria-label="Search" value={searchTerm}
                                    onChange={handleSearchChange} />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>

                    </div>
                </nav>

                <div className="container-filter">
                    <label htmlFor="form-check">Filter By Calory</label>
                    <br />
                    {caloriesOptions.map((calory) => (
                        <div className="form-check" key={calory.id}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value={calory.id}
                                id={`flexCheck${calory.id}`}
                                onChange={handleCheckboxChange}
                            />
                            <label className="form-check-label" htmlFor={`flexCheck${calory.id}`}>
                                {`${calory.calory.min}-${calory.calory.max}`}
                            </label>
                        </div>
                    ))}
                </div>

                <div className="container-card">
                    {filteredFoods.map((todo) => (
                        <Card todo={todo} key={todo.id} />
                    ))}
                </div>
            </section>
        </div>
    )
}