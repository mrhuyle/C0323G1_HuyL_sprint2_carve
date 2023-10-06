import React from "react";
import Blog from "../components/Blog";
import blog1 from "../assets/img/blog1.jpeg";
import blog2 from "../assets/img/blog2.jpeg";
import blog3 from "../assets/img/blog3.jpeg";

const Blogs = () => {
  const blogs = [
    {
      id: 1,
      imgSrc: blog1,
      imgAlt: "blog1",
      title: "Title1",
      description:
        "Học tập trọn đời là một việc cực kỳ quan trọng, phải gắn nó thường thức, tự nhiên và vui thích",
    },
    {
      id: 1,
      imgSrc: blog2,
      imgAlt: "blog2",
      title: "Title2",
      description:
        "Học tập trọn đời là một việc cực kỳ quan trọng, phải gắn nó thường thức, tự nhiên và vui thích",
    },
    {
      id: 1,
      imgSrc: blog3,
      imgAlt: "blog3",
      title: "Title3",
      description:
        "Học tập trọn đời là một việc cực kỳ quan trọng, phải gắn nó thường thức, tự nhiên và vui thích",
    },
  ];
  return (
    <div className="px-4 py-8 mx-auto bg-gray-100 md:px-14 max-w-screen-2xl">
      <div className="py-2 mx-auto mt-10 mb-5 italic leading-relaxed text-center bg-indigo-100 rounded-2xl md:w-1/2 text-brandPrimary head-title">
        <h2 className="mb-3 text-4xl font-semibold font-extrabold text-brandPrimary head-title">
          CÂU CHUYỆN
        </h2>
        <p>...những nguồn cảm hứng cho học tập không ngừng</p>
      </div>
      <div className="grid grid-cols-1 gap-0 mx-auto lg:grid-cols-3 mt-14 md:grid-cols-2 md:w-11/12 ">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            imgAlt={blog.imgAlt}
            imgSrc={blog.imgSrc}
            description={blog.description}
            title={blog.title}
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
