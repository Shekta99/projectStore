/* eslint-disable @typescript-eslint/no-explicit-any */
// ProductList.tsx
import React, { useState } from "react";
import Card from "../../components/uiSwapi/card";
import { useAuthStore } from "../../store/auth";
import "../../styles/components/productList.css";
import { useNavigate } from "react-router-dom";
import axios from "../../libs/axios";
import Modal from "./Modal";

interface Product {
  name: string;
  id: string | number;
  description: string;
  image: string;
  stock: number;
  price: number;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const isAuth = useAuthStore((state) => state.isAuth);
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState<boolean>(false);
  const [succesMessage, setSuccesMessage] = useState<string>("");

  const toggleEditMode = () => {
    setEditMode((prevEditMode) => !prevEditMode);
  };

  const createProduct = () => {
    navigate("/create", { replace: true });
  };

  const deleteProduct = async (productId: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:3005/api/products/${productId}`
      );
      console.log("Producto eliminado exitosamente:", response.data);
      setSuccesMessage("Producto eliminado exitosamente");
      return response.data;
    } catch (error: any) {
      console.error(
        "Error al eliminar el producto:",
        error.response?.data || error.message
      );
      throw error; // Propaga el error para que pueda ser manejado en el lugar donde llames a esta función
    }
  };

  const handleDelete = async (productId: string) => {
    try {
      await deleteProduct(productId);
    } catch (error) {
      alert("No se pudo eliminar el producto. Por favor, intente de nuevo.");
    }
  };

  if (products.length === 0) {
    return (
      <div className="menu-row">
        <div>No products available</div>;
        {isAuth && (
          <div>
            <button>New Product</button>
          </div>
        )}
      </div>
    );
  }

  // ...

  return (
    <div className="container">
      {succesMessage && (
        <Modal
          message={succesMessage}
          onClose={() => {
            window.location.reload();
          }}
        />
      )}
      {isAuth && (
        <div className="menu-row">
          <div>Products Menu</div>
          <div>
            <button onClick={createProduct}>New Product</button>
            <button onClick={toggleEditMode}>
              {editMode ? "Normal Mode" : "Edit Mode"}
            </button>
          </div>
        </div>
      )}
      <div className="row">
        {products.map((product) => (
          <div className="col-3 mb-4 ">
            <Card
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              image={product.image}
              stock={product.stock}
              price={product.price}
              edit={editMode}
              handleDelete={handleDelete}
            />
          </div>
        ))}

        <div></div>
      </div>
    </div>
  );
};

export default ProductList;
