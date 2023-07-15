import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductList = () => {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // Adjust the number of items per page as needed
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTableData, setFilteredTableData] = useState([]);

  useEffect(() => {
    fetchProductData();
  }, []);

  useEffect(() => {
    const filteredData = tableData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTableData(filteredData);
    setCurrentPage(1);
  }, [tableData, searchTerm]);

  const fetchProductData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/product/fetchproduct", {
        headers: {
          "auth-token": sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      setTableData(response.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/product/deleteproduct/${id}`, {
        headers: {
          "auth-token": sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      fetchProductData();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const renderTableRows = () => {
    return filteredTableData
      .slice(indexOfFirstItem, indexOfLastItem)
      .map((item, index) => (
        <tr key={index}>
          <th scope="row">{(currentPage - 1) * itemsPerPage + index + 1}</th>
          <td>
            <img
              src={`http://localhost:8000/Backend/${item.files}`}
              className="d-block mx-lg-auto img-fluid rounded-circle"
              alt="Bootstrap Themes"
              width="40"
              height="40"
              loading="lazy"
            />
          </td>
          <td>{item.name}</td>
          <td>{item.weight}</td>
          <td>{item.price}</td>
          <td>
            <Link
              className="btn btn-outline-primary m-2"
              to={`/edit/${item._id}`}
            >
              Edit
            </Link>
            <button className="btn btn-danger m-2" onClick={() => deleteProduct(item._id)}>
              Delete
            </button>
          </td>
        </tr>
      ));
  };

  const renderPagination = () => {
    const pageNumbers = Math.ceil(filteredTableData.length / itemsPerPage);
    const paginationItems = [];
    for (let i = 1; i <= pageNumbers; i++) {
      paginationItems.push(
        <li key={i} className={`page-item ${currentPage === i ? "active" : ""}`}>
          <button className="page-link" onClick={() => setCurrentPage(i)}>
            {i}
          </button>
        </li>
      );
    }
    return (
      <center>
        <nav aria-label="Page navigation example" style={{ marginLeft: "600px" }}>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
            </li>
            {paginationItems}
            <li className={`page-item ${currentPage === pageNumbers ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </center>
    );
  };

  const handleSearch = () => {
    const filteredData = tableData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTableData(filteredData);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setFilteredTableData(tableData);
    setCurrentPage(1);
  };

  return (
    <div>
      <div style={{ marginLeft: "600px", marginTop: "40px" }}>
        <tr>
          <th>
            <input
              style={{ width: "308px" }}
              name="name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
              type="text"
              id="t1"
              placeholder="Search by name Product "
            />
          </th>
          
          <th>
            <button className="btn btn-primary" style={{marginLeft:"20px"}} onClick={handleClearSearch}>
              Clear
            </button>
          </th>
        </tr>
      </div>
      <table
        style={{ width: "90%", margin: "90px 90px" }}
        className="table table-success table-hover table-bordered border-success"
      >
        <thead className="table-dark text-white">
          <tr>
            {/* <th scope="col">#</th> */}
            <th scope="col">id</th>
            <th scope="col">image</th>
            <th scope="col">Name</th>
            <th scope="col">weight</th>
            <th scope="col">Price</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>

      <div className="pagination">{renderPagination()}</div>
    </div>
  );
};

export default ProductList;
