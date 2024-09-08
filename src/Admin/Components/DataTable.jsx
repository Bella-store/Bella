import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { GoFileMedia } from "react-icons/go";
">  const [isModal, setModal] = useState(false);
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null); // Store the actual file
  const [isDisabled, setIsDisabled] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    category: "",
    description: "",
    imageUrl: "",
    price: null,
    quantity: null,
  });

  const dispatch= () => setModal(true);>dal ">tChange = (e) => {ue } = e.target;clitem  e,
  ite>
   async ure the actual file is uploaded
  lassName
    const storageRef">  const [isModal, setModal] = useState(false);
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null); // Store the actual file
  const [isDisabled, setIsDisabled] = useState(false);
  const [newProduct, setNewP
    title: "",
le, setImageFile] = useState(null); // Store the actual file
  const [isDisabled, setIsDisabled] = useState(false);
  const [newProduct, setNewP
    title: "",
le, setImageFil useState(null); // Store the actual file
  const [isDisabled, setIsDisabled] = useSt
  const [newProduc
    title: "",
Name="containerauto p-g sh
      <div className="overflow-x-auto">
          <table c
            <theadth>
            </tr>          </thea
            <tbody            {.map((            <tr key={        <                                  </td>        d                                      <          <><button className="                  < c="</button>
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

export default DataTable;
  return (
    <div>
      <div className="container mx-auto p-4 mt-3 bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="
            <thead>
</th>
              </tr>
            </thead>
            <tbody
              {.map((item, index) => (
                <tr key={index} className="
                  
                    <assName=>
                      
                  </td>
                  
                  <td                  <
                      <                  <>
                    <button className="                  < c="</button>
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

export default DataTable;
  return (
    <div>
      <div className="container mx-auto p-4 mt-3 bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="
            <thead>
</th>
              </tr>
            </thead>
            <tbody
              {.map((item, index) => (
                <tr key={index} className="
                  
                    <assName=>
                      
                  </td>
                  
                  <td                  <
                      <                  <>
                    <button className="                  < c="</button>
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

export default DataTable;
  return (
    <div>
      <div className="container mx-auto p-4 mt-3 bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="
            <thead>
</th>
              </tr>
            </thead>
            <tbody
              {.map((item, index) => (
                <tr key={index} className="
                  
                    <assName=>
                      
                  </td>
                  
                  <td                  <
                      <                  <>
                    <button className="                  < c="</button>
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

export default DataTable;
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../../Redux/Slices/ProductsSlice";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../config/firebase";

const DataTable = () => {
 = useDispatch();
  const { items } = useSelector((state) => state.products);

  const openModal 
  const closeMo= () => setModal(false);

  const handleInpu
    const { name, val
    setNewProduct({
    ...newProduct,
      [name]: valu
    });};
const uploadImage =() => {
    if (!imageFile) return null; // Ens = ref(storage, `/product_images/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Upload failed", error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    // First upload the image and get the download URL
    const downloadURL = await uploadImage();

    // Then dispatch the action to add the product
    dispatch(
      addProducts({
        title: newProduct.title,
        category: newProduct.category,
        description: newProduct.description,
        imageUrl: downloadURL, // Use the downloadURL after upload
        price: newProduct.price,
        quantity: newProduct.quantity,
      })
    );

    console.log("Product added:", newProduct);
    setModal(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setImageFile(file); // Store the actual file for upload
    }
  };

import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../../Redux/Slices/ProductsSlice";
      <div className="flex justify-end">
        <button
          onClick={openModal}
          className=" bg-mainColor text-white p-2 px-7 rounded"
        >
          Add Product
        </button>
      </div>

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../config/firebase";
table
const DataTable = () => {
              <tr className="text-center">
                <th>Index</th>
                <th>Add image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Product description</th>
                <th>Action = useDispatch();
  const { items } = useSelector((state) => state.products);

  const openModal 
  const closeMoitems= () => setModal(false);
text-center
  const handleInpu<td>{index + 1}</td>
                  <td>
    const { name, valdiv "h-12 w-12 m-auto"
    setNewProduct({<img src={.imageUrl} alt="Product" />
                    </div>
    ...newProduct,
      [name]: valu<td>{item.title}</td>
    });>{item.category}</td>
};td>{m.quantity}</td
              <td>${item.price}</td>
td>{item.description}</td>
const uploadImage =td() => {
    if (!imageFile) return null; // Ensbtn btn-ghost btn-xs">Delete</button>
buttonbtn btn-ghost btn-xs">Edit = ref(storage, `/product_images/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =

      {/* Modal for Adding Product */}
      {isModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-box bg-white p-5 rounded-lg sm:w-[50rem]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Add Product</h2>
              <button className="btn btn-circle btn-ghost" onClick={closeModal}>
                <IoCloseOutline />
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
                type="text"
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                placeholder="Category"
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

              <div className="flex items-center gap-3">
                <label htmlFor="imgFile" className="cursor-pointer">
                  Add image
                </label>
                <GoFileMedia />
                <input
                  id="imgFile"
                  type="file"
                  name="img"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
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
                  className=" bg-mainColor text-white p-2 px-7 rounded"
                  type="submit"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Upload failed", error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    // First upload the image and get the download URL
    const downloadURL = await uploadImage();

    // Then dispatch the action to add the product
    dispatch(
      addProducts({
        title: newProduct.title,
        category: newProduct.category,
        description: newProduct.description,
        imageUrl: downloadURL, // Use the downloadURL after upload
        price: newProduct.price,
        quantity: newProduct.quantity,
      })
    );

    console.log("Product added:", newProduct);
    setModal(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setImageFile(file); // Store the actual file for upload
    }
  };

import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../../Redux/Slices/ProductsSlice";
      <div className="flex justify-end">
        <button
          onClick={openModal}
          className=" bg-mainColor text-white p-2 px-7 rounded"
        >
          Add Product
        </button>
      </div>

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../config/firebase";
table
const DataTable = () => {
              <tr className="text-center">
                <th>Index</th>
                <th>Add image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Product description</th>
                <th>Action = useDispatch();
  const { items } = useSelector((state) => state.products);

  const openModal 
  const closeMoitems= () => setModal(false);
text-center
  const handleInpu<td>{index + 1}</td>
                  <td>
    const { name, valdiv "h-12 w-12 m-auto"
    setNewProduct({<img src={.imageUrl} alt="Product" />
                    </div>
    ...newProduct,
      [name]: valu<td>{item.title}</td>
    });>{item.category}</td>
};td>{m.quantity}</td
              <td>${item.price}</td>
td>{item.description}</td>
const uploadImage =td() => {
    if (!imageFile) return null; // Ensbtn btn-ghost btn-xs">Delete</button>
buttonbtn btn-ghost btn-xs">Edit = ref(storage, `/product_images/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =

      {/* Modal for Adding Product */}
      {isModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-box bg-white p-5 rounded-lg sm:w-[50rem]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Add Product</h2>
              <button className="btn btn-circle btn-ghost" onClick={closeModal}>
                <IoCloseOutline />
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
                type="text"
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                placeholder="Category"
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

              <div className="flex items-center gap-3">
                <label htmlFor="imgFile" className="cursor-pointer">
                  Add image
                </label>
                <GoFileMedia />
                <input
                  id="imgFile"
                  type="file"
                  name="img"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
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
                  className=" bg-mainColor text-white p-2 px-7 rounded"
                  type="submit"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Upload failed", error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    // First upload the image and get the download URL
    const downloadURL = await uploadImage();

    // Then dispatch the action to add the product
    dispatch(
      addProducts({
        title: newProduct.title,
        category: newProduct.category,
        description: newProduct.description,
        imageUrl: downloadURL, // Use the downloadURL after upload
        price: newProduct.price,
        quantity: newProduct.quantity,
      })
    );

    console.log("Product added:", newProduct);
    setModal(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setImageFile(file); // Store the actual file for upload
    }
  };

import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../../Redux/Slices/ProductsSlice";
      <div className="flex justify-end">
        <button
          onClick={openModal}
          className=" bg-mainColor text-white p-2 px-7 rounded"
        >
          Add Product
        </button>
      </div>

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../config/firebase";
table
const DataTable = () => {
              <tr className="text-center">
                <th>Index</th>
                <th>Add image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Product description</th>
                <th>Action = useDispatch();
  const { items } = useSelector((state) => state.products);

  const openModal 
  const closeMoitems= () => setModal(false);
text-center
  const handleInpu<td>{index + 1}</td>
                  <td>
    const { name, valdiv "h-12 w-12 m-auto"
    setNewProduct({<img src={.imageUrl} alt="Product" />
                    </div>
    ...newProduct,
      [name]: valu<td>{item.title}</td>
    });>{item.category}</td>
};td>{m.quantity}</td
              <td>${item.price}</td>
td>{item.description}</td>
const uploadImage =td() => {
    if (!imageFile) return null; // Ensbtn btn-ghost btn-xs">Delete</button>
buttonbtn btn-ghost btn-xs">Edit = ref(storage, `/product_images/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =

      {/* Modal for Adding Product */}
      {isModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-box bg-white p-5 rounded-lg sm:w-[50rem]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Add Product</h2>
              <button className="btn btn-circle btn-ghost" onClick={closeModal}>
                <IoCloseOutline />
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
                type="text"
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                placeholder="Category"
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

              <div className="flex items-center gap-3">
                <label htmlFor="imgFile" className="cursor-pointer">
                  Add image
                </label>
                <GoFileMedia />
                <input
                  id="imgFile"
                  type="file"
                  name="img"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
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
                  className=" bg-mainColor text-white p-2 px-7 rounded"
                  type="submit"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Upload failed", error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    // First upload the image and get the download URL
    const downloadURL = await uploadImage();

    // Then dispatch the action to add the product
    dispatch(
      addProducts({
        title: newProduct.title,
        category: newProduct.category,
        description: newProduct.description,
        imageUrl: downloadURL, // Use the downloadURL after upload
        price: newProduct.price,
        quantity: newProduct.quantity,
      })
    );

    console.log("Product added:", newProduct);
    setModal(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setImageFile(file); // Store the actual file for upload
    }
  };

import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../../Redux/Slices/ProductsSlice";
      <div className="flex justify-end">
        <button
          onClick={openModal}
          className=" bg-mainColor text-white p-2 px-7 rounded"
        >
          Add Product
        </button>
      </div>

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../config/firebase";
table
const DataTable = () => {
              <tr className="text-center">
                <th>Index</th>
                <th>Add image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Product description</th>
                <th>Action = useDispatch();
  const { items } = useSelector((state) => state.products);

  const openModal 
  const closeMoitems= () => setModal(false);
text-center
  const handleInpu<td>{index + 1}</td>
                  <td>
    const { name, valdiv "h-12 w-12 m-auto"
    setNewProduct({<img src={.imageUrl} alt="Product" />
                    </div>
    ...newProduct,
      [name]: valu<td>{item.title}</td>
    });>{item.category}</td>
};td>{m.quantity}</td
              <td>${item.price}</td>
td>{item.description}</td>
const uploadImage =td() => {
    if (!imageFile) return null; // Ensbtn btn-ghost btn-xs">Delete</button>
buttonbtn btn-ghost btn-xs">Edit = ref(storage, `/product_images/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =

      {/* Modal for Adding Product */}
      {isModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-box bg-white p-5 rounded-lg sm:w-[50rem]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Add Product</h2>
              <button className="btn btn-circle btn-ghost" onClick={closeModal}>
                <IoCloseOutline />
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
                type="text"
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                placeholder="Category"
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

              <div className="flex items-center gap-3">
                <label htmlFor="imgFile" className="cursor-pointer">
                  Add image
                </label>
                <GoFileMedia />
                <input
                  id="imgFile"
                  type="file"
                  name="img"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
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
                  className=" bg-mainColor text-white p-2 px-7 rounded"
                  type="submit"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Upload failed", error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    // First upload the image and get the download URL
    const downloadURL = await uploadImage();

    // Then dispatch the action to add the product
    dispatch(
      addProducts({
        title: newProduct.title,
        category: newProduct.category,
        description: newProduct.description,
        imageUrl: downloadURL, // Use the downloadURL after upload
        price: newProduct.price,
        quantity: newProduct.quantity,
      })
    );

    console.log("Product added:", newProduct);
    setModal(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setImageFile(file); // Store the actual file for upload
    }
  };

import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../../Redux/Slices/ProductsSlice";
      <div className="flex justify-end">
        <button
          onClick={openModal}
          className=" bg-mainColor text-white p-2 px-7 rounded"
        >
          Add Product
        </button>
      </div>

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../config/firebase";
table
const DataTable = () => {
              <tr className="text-center">
                <th>Index</th>
                <th>Add image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Product description</th>
                <th>Action = useDispatch();
  const { items } = useSelector((state) => state.products);

  const openModal 
  const closeMoitems= () => setModal(false);
text-center
  const handleInpu<td>{index + 1}</td>
                  <td>
    const { name, valdiv "h-12 w-12 m-auto"
    setNewProduct({<img src={.imageUrl} alt="Product" />
                    </div>
    ...newProduct,
      [name]: valu<td>{item.title}</td>
    });>{item.category}</td>
};td>{m.quantity}</td
              <td>${item.price}</td>
td>{item.description}</td>
const uploadImage =td() => {
    if (!imageFile) return null; // Ensbtn btn-ghost btn-xs">Delete</button>
buttonbtn btn-ghost btn-xs">Edit = ref(storage, `/product_images/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =

      {/* Modal for Adding Product */}
      {isModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-box bg-white p-5 rounded-lg sm:w-[50rem]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Add Product</h2>
              <button className="btn btn-circle btn-ghost" onClick={closeModal}>
                <IoCloseOutline />
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
                type="text"
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                placeholder="Category"
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

              <div className="flex items-center gap-3">
                <label htmlFor="imgFile" className="cursor-pointer">
                  Add image
                </label>
                <GoFileMedia />
                <input
                  id="imgFile"
                  type="file"
                  name="img"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
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
                  className=" bg-mainColor text-white p-2 px-7 rounded"
                  type="submit"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Upload failed", error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    // First upload the image and get the download URL
    const downloadURL = await uploadImage();

    // Then dispatch the action to add the product
    dispatch(
      addProducts({
        title: newProduct.title,
        category: newProduct.category,
        description: newProduct.description,
        imageUrl: downloadURL, // Use the downloadURL after upload
        price: newProduct.price,
        quantity: newProduct.quantity,
      })
    );

    console.log("Product added:", newProduct);
    setModal(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setImageFile(file); // Store the actual file for upload
    }
  };

import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../../Redux/Slices/ProductsSlice";
      <div className="flex justify-end">
        <button
          onClick={openModal}
          className=" bg-mainColor text-white p-2 px-7 rounded"
        >
          Add Product
        </button>
      </div>

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../config/firebase";
table
const DataTable = () => {
              <tr className="text-center">
                <th>Index</th>
                <th>Add image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Product description</th>
                <th>Action = useDispatch();
  const { items } = useSelector((state) => state.products);

  const openModal 
  const closeMoitems= () => setModal(false);
text-center
  const handleInpu<td>{index + 1}</td>
                  <td>
    const { name, valdiv "h-12 w-12 m-auto"
    setNewProduct({<img src={.imageUrl} alt="Product" />
                    </div>
    ...newProduct,
      [name]: valu<td>{item.title}</td>
    });>{item.category}</td>
};td>{m.quantity}</td
              <td>${item.price}</td>
td>{item.description}</td>
const uploadImage =td() => {
    if (!imageFile) return null; // Ensbtn btn-ghost btn-xs">Delete</button>
buttonbtn btn-ghost btn-xs">Edit = ref(storage, `/product_images/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =

      {/* Modal for Adding Product */}
      {isModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-box bg-white p-5 rounded-lg sm:w-[50rem]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Add Product</h2>
              <button className="btn btn-circle btn-ghost" onClick={closeModal}>
                <IoCloseOutline />
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
                type="text"
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                placeholder="Category"
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

              <div className="flex items-center gap-3">
                <label htmlFor="imgFile" className="cursor-pointer">
                  Add image
                </label>
                <GoFileMedia />
                <input
                  id="imgFile"
                  type="file"
                  name="img"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
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
                  className=" bg-mainColor text-white p-2 px-7 rounded"
                  type="submit"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Upload failed", error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    // First upload the image and get the download URL
    const downloadURL = await uploadImage();

    // Then dispatch the action to add the product
    dispatch(
      addProducts({
        title: newProduct.title,
        category: newProduct.category,
        description: newProduct.description,
        imageUrl: downloadURL, // Use the downloadURL after upload
        price: newProduct.price,
        quantity: newProduct.quantity,
      })
    );

    console.log("Product added:", newProduct);
    setModal(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setImageFile(file); // Store the actual file for upload
    }
  };

import { MdCancel, MdOutlineSupportAgent } from "react-icons/md";
import { useDispatch } from "react-redux";
      <div className="flex justify-end">
        <button
          onClick={openModal}
          className=" bg-mainColor text-white p-2 px-7 rounded"
        >
          Add Product
        </button>
      </div>

import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../../src/Redux/Slices/AuthSlice";
table
const Sidebar = ({ selectedItem, setSelectedItem, closeSidebar }) => {
              <tr className="text-center">
                <th>Index</th>
                <th>Add image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Product description</th>
                <th>Actionogin");
  };

  return (
    <div classNitems"min-h-screen w-64 bg-white p-4 shadow-md flex flex-col justify-between relative">
      {/* Close Button for Small Devices */text-center
      <button<td>{index + 1}</td>
                  <td>
        className="abdiv -4 lg:hidd"h-12 w-12 m-auto"
        onClick={close<img src={.imageUrl} alt="Product" />
                    </div>
    >
        <MdCancel <td>{item.title}</td>e={24} />
      </button>>{item.category}</td>
td>{m.quantity}</td
                  <td>${item.price}</td>
  <div>td>{item.description}</td>
      <div classNamtd-3xl text-mainColor font-semibold mb-8">Bella</div>
        <nav className="flex flex-col sbtn btn-ghost btn-xs">Delete</button>
        {menuItems.mabutton => (btn btn-ghost btn-xs">Edit
              key={item.name}
              to={item.to}
              onClick={() => {
                setSelectedItem(item.name);
                closeSidebar();
              }}
              className={`flex items-center font-montserrat p-2 rounded-lg ${

      {/* Modal for Adding Product */}
      {isModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-box bg-white p-5 rounded-lg sm:w-[50rem]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Add Product</h2>
              <button className="btn btn-circle btn-ghost" onClick={closeModal}>
                <IoCloseOutline />
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
                type="text"
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                placeholder="Category"
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

              <div className="flex items-center gap-3">
                <label htmlFor="imgFile" className="cursor-pointer">
                  Add image
                </label>
                <GoFileMedia />
                <input
                  id="imgFile"
                  type="file"
                  name="img"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
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
                  className=" bg-mainColor text-white p-2 px-7 rounded"
                  type="submit"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
                selectedItem === item.name
                  ? "text-white bg-mainColor"
                  : "text-gray-700 hover:text-mainColor"
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-8 flex items-center font-montserrat text-gray-700 hover:text-red-600 cursor-pointer">
        <FaSignOutAlt />
        <Link onClick={logOut} className=" ml-2 text-titleColor">
          LogOut
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
import { MdCancel, MdOutlineSupportAgent } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../../src/Redux/Slices/AuthSlice";

const Sidebar = ({ selectedItem, setSelectedItem, closeSidebar }) => {
("/login");
    };

    return (
        <div clame="min-h-screen w-64 bg-white p-4 shadow-md flex flex-col justify-between relative">
            {/* Close Button for Small Devi
            <butto
                class-4 right-4
                onClic
          >
                <Mncel size={24} />
            </button>
            <div>              <div me="text-3xl text-mainColor font-semibold mb-8">
                    Bella              </div> className="flex flex-col space-y-4">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.to}
                            onClick={() => {
                                setSelectedItem(item.name);
                                closeSidebar();
                            }}
                            className={`flex items-center font-montserrat p-2 rounded-lg ${
                                selectedItem === item.name
                                    ? "text-white bg-mainColor"
                                    : "text-gray-700 hover:text-mainColor"
                            }`}
                        >
                            {item.icon}
                            <span className="ml-3">{item.name}</span>
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="mt-8 flex items-center font-montserrat text-gray-700 hover:text-red-600 cursor-pointer">
                <FaSignOutAlt />
                <Link onClick={logOut} className=" ml-2 text-titleColor">
                    LogOut
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
