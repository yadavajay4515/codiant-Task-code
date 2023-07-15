import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Addproduct() {
  const { _id } = useParams();

  useEffect(() => {
    if (_id) {
      fetchProduct();
    }
  }, [_id]);

  const [user, setUser] = useState({
    _id: "",
    name: "",
    price: "",
    weight: "",
    image: null,
  });

  const [msg, setMsg] = useState({ msgs: "", error: "" });

  const handleEvent = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    setUser((prevUser) => ({
      ...prevUser,
      image: event.target.files[0],
    }));
  };

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/product/addproduct/${_id}`, {
        headers: {
          "auth-token": sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/product/updateproduct/${_id}`, user,{
        headers: {
          "auth-token": sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      console.log("update", response);
      alert("Update");
      setUser({ name: "", weight: "", price: "", image: null });
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const register = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("weight", user.weight);
    formData.append("price", user.price);
    formData.append("image", user.image);

    axios
      .post("http://localhost:8000/product/addproduct", formData, {
        headers: {
          "auth-token": sessionStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);

        if (res.data.success) {
          setMsg({ error: "" });
          setMsg({ msgs: "Successfully registered" });
          setUser({ name: "", weight: "", price: "", image: null });
        }
        if (res.data.error) {
          setMsg({ msgs: "" });
          setMsg({ error: res.data.error });
        }
      })
      .catch((error) => {
        console.error("Error registering product:", error);
      });
  };

  return (
    <>
      <center>
        {(() => {
          if (_id) {
            return <h4>Update Product</h4>;
          }
          if (!_id) {
            return <h2>Add Product</h2>;
          }
        })()}

        <h4 style={{ color: "green" }}>{msg.msgs}</h4>
        <h4 style={{ color: "red" }}>{msg.error}</h4>

        <form onSubmit={register}>
          <table>
            <tr>
              <th>
                <label htmlFor="name" style={{ color: "black" }}>
                  Product Name:
                </label>
              </th>
              <td>
                <input
                  style={{ width: "308px",marginTop:"20px" }}
                  name="name"
                  value={user.name}
                  onChange={handleEvent}
                  className="form-control"
                  type="text"
                  id="name"
                  placeholder="Enter Product Name"
                  required
                />
              </td>
            </tr>

            <tr>
              <th>
                <label htmlFor="price" style={{ color: "black" }}>
                  Price:
                </label>
              </th>
              <td>
                <input
                  style={{ width: "308px",marginTop:"20px" }}
                  name="price"
                  value={user.price}
                  onChange={handleEvent}
                  className="form-control"
                  type="number"
                  id="price"
                  placeholder="Enter Price"
                  required
                />
              </td>
            </tr>

            <tr>
              <th>
                <label htmlFor="weight" style={{ color: "black" }}>
                  Weight:
                </label>
              </th>
              <td>
                <input
                
                  style={{ width: "308px",marginTop:"20px"}}
                  name="weight"
                  value={user.weight}
                  onChange={handleEvent}
                  className="form-control"
                  type="text"
                  id="weight"
                  placeholder="Enter Product Weight"
                  required
                />
              </td>
            </tr>

            <tr >
              <th>
                <label htmlFor="image" style={{ color: "black" }}>
                  Image Upload:
                </label>
              </th>
              <td>
                <input
                style={{marginTop:"20px"}}
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={handleImageChange}
                  className="form-control"
                  id="image"
                  placeholder="Upload Product Image"
                />
              </td>
            </tr>

            <tr>
              <td colSpan="2">
                {(() => {
                  if (_id) {
                    return (
                      <button
                      style={{ width: "200px", marginTop:"20px", marginLeft:"100px" }}
                        type="button"
                        onClick={updateProduct}
                        className="btn btn-primary"
                      >
                        Update Product
                      </button>
                    );
                  }
                  if (!_id) {
                    return (
                      <button
                        style={{ width: "200px", marginTop:"20px", marginLeft:"100px" }}
                        type="submit"
                        className="btn btn-primary"
                      >
                        Add Product
                      </button>
                    );
                  }
                })()}
              </td>
            </tr>
          </table>
        </form>
      </center>
    </>
  );
}
