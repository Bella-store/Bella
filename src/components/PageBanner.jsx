/* eslint-disable react/prop-types */
export default function PageBanner({
  title,
  bg_image = "/cart-page-header.jpg",
}) {
  return (
    <div className="relative bg-gray-100 h-60 flex items-center justify-center">
      <img
        src={bg_image}
        alt="Cart Banner"
        className="absolute inset-0 w-full h-full object-cover object-bottom"
      />
      <h1 className="relative text-6xl font-bold  text-titleColor">{title}</h1>
    </div>
  );
}
