import { Rate } from "antd";

import { Section, SectionTitle } from "./ui/Section";
import Slider from "./ui/Slider";
import AddReview from "./AddReview";

import useReviews from "../hooks/useReviews";

const ReviewSection = () => {
  const { reviews } = useReviews();

  return (
    <Section sectionClass="bg-white text-black text-center">
{/*       <span className="uppercase font-semibold text-orange-400">
        Testimonials
      </span> */}
      <SectionTitle label="Our Customer's Review" />
      <AddReview />
      {reviews?.length > 0 ? (
        <Slider>
          {reviews?.map((review, index) => (
            <div key={index} className="h-64 my-10 mb-10 text-center">
              <div className="mx-5 h-full px-3 md:px-8 py-6 flex flex-col gap-2 items-center justify-between rounded-xl shadow-md bg-gray-50">
                <p className="text-lg md:text-xl leading-snug md:leading-normal">
                  {review.review}
                </p>
                <span>
                  <h4 className="my-4 font-semibold">-- {review.name} --</h4>
                  {review?.rating !== undefined && review?.rating !== null && (
                    <Rate allowHalf disabled value={review.rating} />
                  )}
                </span>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        ""
      )}
    </Section>
  );
};

export default ReviewSection;
