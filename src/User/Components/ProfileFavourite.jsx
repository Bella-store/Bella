import { useSelector, useDispatch } from "react-redux";
import { toggleFavourite } from "../../Redux/Slices/FavouriteSlice";
import { addToCart } from "../../Redux/Slices/CartSlice";

function ProfileFavourites() {
  const dispatch = useDispatch();

  // Get favorite product IDs and all products from the Redux store
  const favouriteIds = useSelector((state) => state.favourites.items);
  const allProducts = useSelector((state) => state.products.items);

  // Filter the products to show only the user's favorite products
  const favouriteProducts = allProducts.filter((product) =>
    favouriteIds.includes(product.id)
  );

  // Handle adding to cart
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  // Handle removing from favorites
  const handleToggleFavourite = (id) => {
    dispatch(toggleFavourite(id));
  };

  return (
    <div className="p-5">
      <h2 className="text-titleColor text-[1.2rem] font-semibold">
        Your Favourites
      </h2>

      {favouriteProducts.length === 0 ? (
        <p>Your favourites list is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favouriteProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-md overflow-hidden p-4"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <h3 className="font-semibold mt-2">{item.title}</h3>
              <p className="text-sm text-gray-600">Price: {item.price} EGP</p>
              <p className="text-sm text-gray-600">In stock</p>

              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-btncolor text-white py-2 px-4 rounded hover:bg-gray-600"
                >
                  Add to cart
                </button>
                <button
                  onClick={() => handleToggleFavourite(item.id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  &#10005; Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfileFavourites;
