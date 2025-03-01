import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import productCategory from "../helpers/productCategory";
import VerticalCard from "../components/VerticalCard";
import SummaryApi from "../common";

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);

  // Parse categories from URL
  const urlCategoryListInArray = urlSearch.getAll("category");
  const urlCategoryListObject = urlCategoryListInArray.reduce((acc, el) => {
    acc[el] = true;
    return acc;
  }, {});

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState(urlCategoryListInArray);

  // Fetch products based on selected categories
  const fetchData = async () => {
    if (filterCategoryList.length === 0) return;

    try {
      const response = await fetch(SummaryApi.filterProduct.url, {
        method: SummaryApi.filterProduct.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ category: filterCategoryList }),
      });

      const dataResponse = await response.json();
      let fetchedData = dataResponse?.data || [];

      // Apply sorting
      if (sortBy === "asc") {
        fetchedData.sort((a, b) => a.sellingPrice - b.sellingPrice);
      } else if (sortBy === "dsc") {
        fetchedData.sort((a, b) => b.sellingPrice - a.sellingPrice);
      }

      setData(fetchedData);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // Update selected categories
  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;
    const updatedCategory = { ...selectCategory, [value]: checked };

    // Convert object back to array
    const newFilterList = Object.keys(updatedCategory).filter((key) => updatedCategory[key]);

    setSelectCategory(updatedCategory);
    setFilterCategoryList(newFilterList);

    // Update URL
    const urlParams = newFilterList.map((el) => `category=${el}`).join("&");
    navigate(`/product-category${urlParams ? "?" + urlParams : ""}`);
  };

  // Sorting handler
  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value);
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList, sortBy]);

  return (
    <div className="container mx-auto p-4">
      <div className="hidden lg:grid lg:grid-cols-[200px,1fr]">
        {/* Sidebar for filters */}
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
          {/* Sort By */}
          <div>
            <h3 className="text-slate-500 uppercase text-base border-b pb-1 border-slate-400">
              Sort by
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input type="radio" name="sortBy" value={"asc"} checked={sortBy === "asc"} onChange={handleOnChangeSortBy} />
                <label>Price - Low to High</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="radio" name="sortBy" value={"dsc"} checked={sortBy === "dsc"} onChange={handleOnChangeSortBy} />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* Filter By Category */}
          <div>
            <h3 className="text-slate-500 uppercase text-base border-b pb-1 border-slate-400">
              Category
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((categoryName, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="category"
                    value={categoryName.value}
                    checked={selectCategory[categoryName.value] || false}
                    id={categoryName.value}
                    onChange={handleSelectCategory}
                  />
                  <label htmlFor={categoryName.value}>{categoryName.label}</label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/* Product Display */}
        <div className="px-4">
          <p className="font-semibold text-slate-800 text-lg my-2 px-4">
            Search Result : {data.length}
          </p>
          <div className="max-h-[calc(100vh-120px)] min-h-[calc(100vh-120px)] overflow-y-scroll">
            {data.length !== 0 ? <VerticalCard data={data} /> : <p>No products found.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
