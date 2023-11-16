import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "./Card";
import { Navbar } from "./Navbar";

export const Food = () => {
    const [pubPosts, setPubFoods] = useState([])
    const [filteredFoods, setFilteredFoods] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const PAGE_SIZE = 5
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

        if (sortOrder === 'asc') {
            filteredData.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOrder === 'desc') {
            filteredData.sort((a, b) => b.name.localeCompare(a.name));
        }

        const totalItems = filteredData.length
        const totalPages = Math.ceil(totalItems / PAGE_SIZE)
        setTotalPages(totalPages)

        const startIndex = (currentPage - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        const paginatedData = filteredData.slice(startIndex, endIndex);
        setFilteredFoods(paginatedData);

    }, [pubPosts, searchTerm, sortOrder, currentPage]);
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    }

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    }
    return (
        <div>
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

                <div className="container-card">
                    {filteredFoods.map((todo) => (
                        <Card todo={todo} key={todo.id} />
                    ))}
                </div>

                <div className="clear"></div>

                <div className="container-page">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <a className="page-link" href="#" aria-label="Previous" onClick={() => handlePageChange(currentPage - 1)}>
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <li className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} key={index + 1}>
                                    <a className="page-link" href="#" onClick={() => handlePageChange(index + 1)}>
                                        {index + 1}
                                    </a>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <a className="page-link" href="#" aria-label="Next" onClick={() => handlePageChange(currentPage + 1)}>
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </section>
        </div>
    )
}