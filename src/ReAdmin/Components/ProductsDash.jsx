/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProducts } from "../../Redux/Slices/ProductsSlice";
import AddProductModal from "../Modals/AddProductModal";
import DeleteProductModal from "../Modals/DeleteProductModal";
import { toast } from "react-toastify";
import { fetchProducts } from "../../Redux/Slices/ProductsSlice";
import Pagination from "../../User/Components/Pagination";

const DataTable = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productPerPage = 5;
  const [searchTerm, setSearchTerm] = useState("");

  const { items } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Open delete modal
  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  // Close delete modal
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  // Handle product deletion
  const handleDeleteProduct = async () => {
    try {
      await dispatch(deleteProducts(productToDelete.id));
      toast.success("Product deleted successfully!", {
        position: "top-center",
      });
      closeDeleteModal();
    } catch (error) {
      toast.error("Error deleting product, please try again.", {
        position: "bottom-center",
      });
    }
  };

  // Handle search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
    setCurrentPage(1); // Reset to page 1 on new search
  };
  // Filter products
  const filteredProducts = items.filter((item) => {
    return (
      item.title.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm)
    );
  });
  // Pagination calculations
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="flex justify-between my-5">
        <h1 className="text-2xl font-bold text-mainColor">Products</h1>
        <input
          type="text"
          className="w-[50%] input input-bordered focus:border-0 h-[2.5rem]"
          placeholder="Search"
          onChange={handleSearch}
        />
        <button
          onClick={() => setModalOpen(true)}
          className="bg-mainColor text-white p-2 px-7 rounded"
        >
          Add Product
        </button>
      </div>

      <div className="container mx-auto p-4 mt-3 bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="text-center">
                <th>Index</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((item, index) => (
                <tr key={item.id} className="text-center">
                  <td>{index + 1 + (currentPage - 1) * productPerPage}</td>
                  <td>
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-20 h-20 object-cover"
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                  <td>{item.description}</td>
                  <td>
                    <button
                      className="btn btn-ghost btn-xs text-red-600"
                      onClick={() => openDeleteModal(item)}
                    >
                      Delete
                    </button>
                    <button className="btn btn-ghost btn-xs">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          postsPerPage={productPerPage}
          totalPosts={items.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <AddProductModal closeModal={() => setModalOpen(false)} />
      )}

      {/* Delete Product Modal */}
      {isDeleteModalOpen && (
        <DeleteProductModal
          productToDelete={productToDelete}
          closeModal={closeDeleteModal}
          handleDelete={handleDeleteProduct}
        />
      )}
    </div>
  );
};

export default DataTable;
