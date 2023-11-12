import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useReviews from "../hooks/useReviews";

export const ReviewSection = () => {
  const { reviews } = useReviews();

  console.log(reviews);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div className="px-20 py-10 items-center text-gray-600 h-fit">
      <h1 className="text-6xl italic font-bold font-dancing text-center underline-offset-4 leading-relaxed text-orange-600">
        Reviews
      </h1>

      {reviews && (
        <div>
          <Slider {...settings}>
            {reviews.map((review, index) => (
              <div key={index} className="h-fit p-10 bg-slate-100 rounded-xl">
                <p> &quot;{review.review}&quot;</p>
                <div className="flex justify-between mt-5">
                  {" "}
                  <p>{review.name}</p>
                  <p>{review.rating}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}

      <div className="flex justify-end mt-5">
        <button className="bg-orange-500 p-5 rounded-full">
          <img src="../../public/icons/write.svg" width={30} height={30}></img>
        </button>
      </div>
    </div>
  );
};
