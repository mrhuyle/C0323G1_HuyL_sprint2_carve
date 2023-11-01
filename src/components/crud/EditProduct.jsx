import React, { useState, useEffect } from "react";
import Tag from "./Tag";
import UploadWidget from "../UploadWidget";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { BiEditAlt, BiArrowBack } from "react-icons/bi";
import { AiOutlinePlusSquare } from "react-icons/ai";
import * as deckServices from "../../services/deckServices";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const { auth } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const defaultImg = "/src/assets/img/product_sample.png";
  const [deck, setDeck] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [promoPercent, setPromoPercent] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState(defaultImg);
  const [tags, setTags] = useState([]);

  const getDeckById = async () => {
    try {
      const response = await deckServices.getDeckById(auth?.accessToken, id);
      console.log(response.data);
      const recentDeck = response.data;
      setDeck(recentDeck);
      setName(recentDeck.name);
      setDescription(recentDeck.description);
      setPrice(recentDeck.price);
      setPromoPercent(recentDeck.promoPercent);
      recentDeck.tagName != "[null]"
        ? setTags(JSON.parse(recentDeck.tagName))
        : setTags([]);
      setUploadedImageUrl(recentDeck.img);
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageUpload = async (secureUrl) => {
    setUploadedImageUrl(secureUrl);
  };

  const addTag = () => {
    if (tags.length < 3) {
      setTags([...tags, document.getElementById("tag").value]);
      document.getElementById("tag").value = "";
    } else {
      Swal.fire("Số lượng tag vượt quá 3", "", "error");
      document.getElementById("tag").value = "";
    }
  };

  const handleBtnXClick = (tagName) => {
    console.log(tagName);
    setTags(tags.filter((item) => item !== tagName));
  };

  const handleEditDeck = async () => {
    const data = {
      name: name,
      description: description,
      price: price,
      promoPercent: promoPercent,
      img: uploadedImageUrl,
      tagName: tags,
    };
    try {
      const response = await deckServices.editDeck(auth?.accessToken, data, id);
      if (response?.status == 200) {
        Swal.fire("Đã sửa thông tin thành công", "", "success");
      }
    } catch (err) {
      if (err?.response.status == 409) {
        Swal.fire("Đã có lỗi trong quá trình sửa thông tin", "", "error");
      }
    }
  };

  useEffect(() => {
    getDeckById();
  }, []);

  return (
    <section className="relative w-full p-5 shadow-md sm:rounded-lg">
      <h1 className="text-center capitalize">SỬA BỘ THẺ</h1>
      <hr className="my-4 h-0.5 border-t-0 bg-neutral-200 opacity-100" />
      <div className="flex">
        <div className="w-1/2 px-6">
          <div className="mb-6">
            <label
              htmlFor="image"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ảnh
            </label>
            <div className="mb-6 w-auto h-[320px]">
              <img
                className="object-fill w-full h-full shadow-sm shadow-gray-500"
                src={uploadedImageUrl || defaultImg}
                alt=""
              />
            </div>
          </div>
          <UploadWidget tag={"Tải ảnh"} onImageUpload={handleImageUpload} />
        </div>

        <div className="w-1/2 px-6">
          <form action="#">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tên
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Tên bộ thẻ"
                  required
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Giá
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={price}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="đ"
                  required
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="promotion"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Khuyến mãi
                </label>
                <input
                  type="number"
                  name="promotion"
                  id="promotion"
                  value={promoPercent}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="10%"
                  required
                  onChange={(e) => {
                    setPromoPercent(e.target.value);
                  }}
                />
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="tag"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tag(s)
                </label>
                <div className="flex w-full border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600">
                  <input
                    type="text"
                    name="tag"
                    id="tag"
                    className="bg-gray-50 outline-none text-gray-900 text-sm rounded-lg p-2.5 w-11/12"
                    placeholder={"Nhập để thêm tag (tối đa 3 tag)"}
                  />
                  <button
                    onClick={addTag}
                    type="button"
                    className="w-1/12 p-2.5 flex items-center justify-center text-lg font-medium text-blue-700 bg-transparent border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white hover:border-transparent"
                  >
                    <AiOutlinePlusSquare />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-start w-full col-span-2 gap-1">
                <div className="flex flex-wrap">
                  {tags?.map((tag, index) => (
                    <Tag
                      key={index}
                      name={tag}
                      onBtnXClick={handleBtnXClick}
                      showX={true}
                    />
                  ))}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mô tả
                </label>
                <div className="bg-gray-100">
                  <ReactQuill
                    theme="snow"
                    value={description}
                    onChange={setDescription}
                    className="h-[100px]"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleEditDeck}
                className="flex items-center justify-between gap-1 px-5 py-1 mt-20 text-sm font-medium text-blue-700 bg-transparent border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white hover:border-transparent"
              >
                <BiEditAlt />
                Sửa
              </button>
              <button
                onClick={() => {
                  navigate("/admin/dashboard/product");
                }}
                className="flex items-center justify-between gap-1 px-5 py-1 mt-20 text-sm font-medium text-green-800 bg-transparent border border-green-800 rounded-lg hover:bg-green-400 hover:text-white hover:border-transparent"
              >
                <BiArrowBack />
                Trở về
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditProduct;
