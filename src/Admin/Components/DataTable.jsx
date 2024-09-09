import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { GoFileMedia } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { addProducts, deleteProducts } from "../../Redux/Slices/ProductsSlice";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../config/firebase";
import { toast } from "react-toastify";

const DataTable = () => {
  const [isModal, setModal] = useState(false);
  const [isDeleteModal, setDeleteModal] = useState(false);
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const [newProduct, setNewProduct] = useState({
    title: "",
    category: "",
    description: "",
    imageUrl: "",
    price: 0,
    quantity: 0,
  });

  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);

  const openModal = () => setModal(true);
  const closeModal = () => {
    setModal(false);
    resetForm();
  };

  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => setDeleteModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return null;

    const storageRef = ref(storage, `/product_images/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        reject,
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setIsDisabled(true);

    try {
      const downloadURL = await uploadImage();

      dispatch(
        addProducts({
          ...newProduct,
          imageUrl: downloadURL,
        })
      );

      toast.success("Product added successfully!", {
        position: "top-center",
      });

      closeModal();
    } catch (error) {
      toast.error("Error adding product, please try again", {
        position: "bottom-center",
      });
    } finally {
      setIsDisabled(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;

    try {
      await dispatch(deleteProducts(productToDelete.id));

      toast.success("Product deleted successfully!", {
        position: "top-center",
      });
    } catch (error) {
      toast.error("Error deleting product, please try again.", {
        position: "bottom-center",
      });
    } finally {
      closeDeleteModal();
    }
  };

  const resetForm = () => {
    setPreview(null);
    setImageFile(null);
    setNewProduct({
      title: "",
      category: "",
      description: "",
      imageUrl: "",
      price: 0,
      quantity: 0,
    });
  };

  return (
    <div>
      <div className="flex justify-end">
        <button
          onClick={openModal}
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
              {items.map((item, index) => (
                <tr key={item.id} className="text-center">
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={item.imageUrl}
                      alt="Product"
                      className="h-12 w-12 m-auto object-cover"
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                  <td>{item.description}</td>
                  <td>
                    <button
                      className="btn btn-ghost btn-xs"
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
      </div>

      {/* Add Product Modal */}
      {isModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-box bg-white p-5 rounded-lg sm:w-[50rem]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Add Product</h2>
              <button className="btn btn-circle btn-ghost hover:bg-mainColor  hover:text-white" onClick={closeModal}>
                <IoCloseOutline size={18} />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-3">
              <input
                type="text"
                name="title"
                value={newProduct.title}
                onChange={handleInputChange}
                placeholder="Product Name"
                className="input input-bordered w-full"
                required
              />
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                placeholder="Price"
                min={1}
                className="input input-bordered w-full"
                required
              />
              <input
                type="number"
                name="quantity"
                value={newProduct.quantity}
                onChange={handleInputChange}
                placeholder="Quantity"
                min={1}
                className="input input-bordered w-full"
                required
              />
              <textarea
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                placeholder="Product description..."
                className="textarea textarea-bordered w-full"
                rows="2"
                required
              />
              <select
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                className="select select-info w-full"
                required
              >
                <option value="" disabled>
                  Category
                </option>
                <option value="Bedroom">Bedroom</option>
                <option value="Decoration">Decoration</option>
                <option value="Living Room">Living Room</option>
              </select>

              <div className="flex items-center gap-3">
                <label htmlFor="imgFile" className="cursor-pointer">
                  Add image
                </label>
                <GoFileMedia />
                <input
                  id="imgFile"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              {preview && (
                <div className="max-w-full">
                  <img
                    src={preview}
                    alt="Preview"
                    className="object-cover h-[20rem]"
                  />
                </div>
              )}

              <div className="flex justify-end mt-4">
                <button
                  disabled={isDisabled}
                  className="bg-mainColor text-white p-2 px-7 rounded mt-10"
                  type="submit"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Product Modal */}
      {isDeleteModal && (
        <dialog
          open
          className="modal modal-bottom sm:modal-middle h-[100%] w-[100%]"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-box shadow">
            <h3 className="font-bold text-lg">Delete Product</h3>
            <p className="py-4">Are you sure you want to delete this item?</p>
            <div className="modal-action">
              <button
                className="btn bg-white text-mainColor"
                onClick={handleDeleteProduct}
              >
                Delete
              </button>
              <button className="btn bg-mainColor text-white" onClick={closeDeleteModal}>
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default DataTable;
