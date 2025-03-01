import React, { useContext } from 'react';
import scrollTop from '../helpers/scrollTop';
import { Link } from 'react-router-dom';
import displayINRCurrency from '../helpers/DisplayCurrency';
import Context from '../context';
import addToCard from '../helpers/addToCard';

const VerticalCard = ({ data = [] }) => {
  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCard(e, id);
    fetchUserAddToCart();
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-around md:gap-4 overflow-x-hidden transition-all">
      {data.map((product, index) => (
        <Link
          to={`/product/${product?._id}`}
          key={product._id || index}
          className="w-full min-w-[280px] md:max-w-[300px] max-w-[280px] md:min-w-[300px] bg-white rounded-sm shadow mb-4"
          onClick={scrollTop}
        >
          <div className="bg-slate-200 h-48 min-w-[280px] md:min-w-[145px] p-4 flex justify-center items-center">
            <img
              src={product.productImage?.[0] || '/placeholder.png'}
              alt={product.productName || 'Product Image'}
              className="h-full object-cover hover:scale-110 transition-all mix-blend-multiply"
            />
          </div>
          <div className="p-4 grid gap-3">
            <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1">
              {product?.productName}
            </h2>
            <p className="capitalize text-slate-500">{product?.category}</p>
            <div className="flex gap-4">
              <p className="text-red-600 font-medium">
                {displayINRCurrency(product?.sellingPrice)}
              </p>
              <p className="text-slate-500 line-through">
                {displayINRCurrency(product?.price)}
              </p>
            </div>
            <div>
              <button
                className="bg-red-600 py-1 px-3 text-sm rounded-full w-full text-white hover:bg-red-700"
                onClick={(e) => handleAddToCart(e, product?._id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default VerticalCard;
