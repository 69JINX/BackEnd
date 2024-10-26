import axios from "axios";
import Multiselect from "multiselect-react-dropdown"; // npm i multiselect-react-dropdown
import React, { useEffect, useState } from "react";

const AddProduct = () => {

  const [ParentCategories, setParentCategories] = useState([]);
  const [ProductCategories, setProductCategories] = useState([]);
  const [Colors, setColors] = useState([]);
  const [Sizes, setSizes] = useState([]);
  const [SelectedSizes, setSelectedSizes] = useState([]);
  const [SelectedColors, setSelectedColors] = useState([]);

  const fetchParenteCategories = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/admin-panel/parent-category/activated-categories`)
      .then((response) => {
        setParentCategories(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const fetchSizes = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/admin-panel/size/activated-sizes`)
      .then((response) => {
        setSizes(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const fetchColors = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/admin-panel/color/activated-colors`)
      .then((response) => {
        setColors(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }


  const ProductCategoriesByParentCategory = (e) => {
    axios.put(`${process.env.REACT_APP_API_URL}/api/admin-panel/product-category/product-categories-by-parent-category/${e.target.value}`)
      .then((response) => {
        setProductCategories(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    fetchParenteCategories();
    fetchColors();
    fetchSizes();
  }, [])



  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="block border-b bg-[#f8f8f9] text-[#303640] text-[20px] font-bold p-[8px_16px] h-[40px] rounded-[10px_10px_0_0]">
        Product Details
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <form>
          <div className="w-full my-[10px]">
            <label htmlFor="product_name" className="block text-[#303640]">
              Product Name
            </label>
            <input
              type="text"
              id="product_name"
              name="product_name"
              placeholder="Name"
              className="w-full input border p-2 rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="product_desc" className="block text-[#303640]">
              Product Description
            </label>
            <textarea
              id="product_desc"
              name="product_desc"
              placeholder="Description"
              rows={3}
              cols={10}
              className="w-full input border p-2 rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label
              htmlFor="product_short_desc"
              className="block text-[#303640]"
            >
              Short Description
            </label>
            <textarea
              id="product_short_desc"
              name="product_short_desc"
              placeholder="Short Description"
              rows={2}
              cols={10}
              className="w-full input border p-2 rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="product_img" className="block text-[#303640]">
              Product Image
            </label>
            <input
              type="file"
              id="product_img"
              name="product_img"
              className="w-full input border rounded-[5px] my-[10px] category"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="image_animation" className="block text-[#303640]">
              Image Animation
            </label>
            <input
              type="file"
              id="image_animation"
              name="image_animation"
              className="w-full input border rounded-[5px] my-[10px] category"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="product_gallery" className="block text-[#303640]">
              Product Gallery
            </label>
            <input
              type="file"
              id="product_gallery"
              name="product_gallery"
              className="w-full input border rounded-[5px] my-[10px] category"
            />
          </div>
          <div className="w-full my-[10px] grid grid-cols-[2fr_2fr] gap-[20px]">
            <div>
              <label htmlFor="product_price" className="block text-[#303640]">
                Price
              </label>
              <input
                type="text"
                id="product_price"
                name="product_price"
                placeholder="Product Price"
                className="w-full input border rounded-[5px] my-[10px] p-2"
              />
            </div>
            <div>
              <label htmlFor="product_mrp" className="block text-[#303640]">
                MRP
              </label>
              <input
                type="text"
                id="product_mrp"
                name="product_mrp"
                placeholder="Product MRP"
                className="w-full input border rounded-[5px] my-[10px] p-2"
              />
            </div>
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="parent_category" className="block text-[#303640]">
              Select Parent Category
            </label>
            <select name="parent_category" onChange={ProductCategoriesByParentCategory} id="parent_category" className="border p-1 w-full rounded-[5px] my-[10px] category input">
              <option value="default" selected>
                --Select Parent Category--
              </option>

              {
                ParentCategories.map((parentCategory) => (
                  <option value={parentCategory._id}>{parentCategory.name}</option>
                ))
              }
            </select>
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="product_category" className="block text-[#303640]">
              Select Product Category
            </label>
            <select
              id="product_category"
              name="product_category"
              className="w-full input border p-2 rounded-[5px] my-[10px] cursor-pointer"
            >
              <option value="default" selected >
                --Select Product Category--
              </option>
              {
                ProductCategories.map((productCategory) => (
                  <option value={productCategory._id}>{`${productCategory.name} (${productCategory.parent_category.name})`}</option>
                ))
              }
            </select>
          </div>
          <div className="w-full grid grid-cols-[2fr_2fr] gap-[20px]">
            <div>
              <label htmlFor="stock" className="block text-[#303640]">
                Manage Stock
              </label>
              <select
                name="stock"
                id="stock"
                className="p-2 input w-full border rounded-[5px] my-[10px]"
              >
                <option value="default" selected disabled hidden>
                  --Select Stock--
                </option>
                <option value={true}>In Stock</option>
                <option value={false}>Out of Stock</option>
              </select>
            </div>
            <div>
              <label htmlFor="brand" className="block text-[#303640]">
                Brand Name
              </label>
              <input
                type="text"
                name="brand"
                id="brand"
                placeholder="Brand"
                className="p-2 input w-full border rounded-[5px] my-[10px]"
              />
            </div>
          </div>
          <div className="w-full grid grid-cols-[2fr_2fr] gap-[20px]">
            <div>
              <label htmlFor="size" className="block text-[#303640]">
                Size
              </label>
              <Multiselect
                name="size"
                id="size"
                options={Sizes} // Options to display in the dropdown
                onSelect={(e) => setSelectedSizes({ ...SelectedSizes, e })} // Function will trigger on select event
                // onRemove={this.onRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
              />
            </div>
            <div>
              <label htmlFor="color" className="block text-[#303640]">
                Color
              </label>
              <Multiselect
                name="color"
                id="color"
                options={Colors} // Options to display in the dropdown
                onSelect={(e) => setSelectedColors({ ...SelectedColors, e })} // Function will trigger on select event
                // onRemove={this.onRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
              />
            </div>
          </div>
          <div className="w-full my-[10px] ">
            <label htmlFor="status" className="text-[#252b36f2] mr-[30px]">
              Status
            </label>
            <input
              type="radio"
              name="status"
              id="status"
              value="0"
              className="my-[10px] mx-[20px] accent-[#5351c9]"
            />
            <span>Display</span>
            <input
              type="radio"
              name="status"
              id="status"
              value="1"
              className="my-[10px] mx-[20px] accent-[#5351c9]"
              checked
            />
            <span>Hide</span>
          </div>
          <div className="w-full p-[8px_16px] my-[30px] ">
            <button className="bg-[#5351c9] rounded-md text-white w-[100px] h-[35px]">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
