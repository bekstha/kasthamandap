import { Carousel } from "antd";

const Slider = ({ children, sliderType }) => {
  let settings;

  if (sliderType === "heroSection") {
    settings = {
      autoplay: true,
      autoplaySpeed: 5000,
      arrows: true,
      slidesToShow: 1,
      swipeToSlide: true,
      className: "max-w-4xl mx-auto rounded-2xl py-10",
    };
  } else {
    settings = {
      autoplay: true,
      autoplaySpeed: 5000,
      arrows: true,
      slidesToShow: 2,
      swipeToSlide: true,
      className: "max-w-4xl mx-auto rounded-2xl bg-gray-200",
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    };
  }

  return <Carousel {...settings}>{children}</Carousel>;
};

export default Slider;
