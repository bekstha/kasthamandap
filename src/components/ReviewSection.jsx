import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useReviews from "../hooks/useReviews";
import { useEffect, useState } from "react";
import {
  TextClassifier,
  FilesetResolver,
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-text@0.10.0";
import StarRating from "./StarRating";
import ReactModal from "react-modal";
import { db } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";

export const ReviewSection = () => {
  const { reviews } = useReviews();

  
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputReview, setInputReview] = useState("");
  const [textClassifier, setTextClassifier] = useState(null);
  const [positiveScore, setPositiveScore] = useState(null);

  useEffect(() => {
    const initializeTextClassifier = async () => {
      try {
        const text = await FilesetResolver.forTextTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-text@0.10.0/wasm"
        );
        const classifier = await TextClassifier.createFromOptions(text, {
          baseOptions: {
            modelAssetPath: "./public/assets/bert_classifier.tflite",
          },
          maxResults: 5,
        });
        setTextClassifier(classifier);
      } catch (error) {
        console.error("Error initializing text classifier:", error);
        // Handle the error appropriately, e.g., set an error state
      }
    };

    initializeTextClassifier();
  }, []); // Run once when the component mounts

  const handleNameChange = (event) => {
    setInputName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setInputEmail(event.target.value);
  };
  const handleReviewChange = (event) => {
    setInputReview(event.target.value);
  };

  const handleClassifyClick = async () => {
    if (inputName === "" || inputEmail === "" || inputReview === "") {
      alert("Please fill all the fields");
      return;
    }
    if (!textClassifier) {
      // Handle the case where textClassifier is not initialized yet
      console.error("Text classifier is not initialized");
      return;
    }
  
    try {
      const result = await textClassifier.classify(inputReview);
  
      // Find the category with the name "positive"
      const positiveCategory = result.classifications[0].categories.find(
        (category) => category.categoryName === "positive"
      );
  
      if (positiveCategory) {
        const rawScore = positiveCategory.score.toFixed(2);
        const outOfFive = (parseFloat(rawScore) * 5) / 1.0; // Convert to a scale out of 5
        const roundedScore = Math.round(outOfFive * 2) / 2; // Round to the nearest 0.5
        setPositiveScore(roundedScore);
  
        // Add the review to Firestore
        const reviewsCollection = collection(db, "Reviews");
        
        // Note: Using 'await' to make sure the review is added before logging
        const reviewRef = await addDoc(reviewsCollection, {
          name: inputName,
          email: inputEmail,
          review: inputReview,
          rating: roundedScore, // Use the rounded score here
        });
  
        closeModal();
  
        //console.log("Review added to Firestore successfully with ID: ", reviewRef.id);
      } else {
        console.error("Positive category not found");
      }
    } catch (error) {
      console.error("Error during classification:", error);
    }
  };
  

  const customStyles = {
    overlay: {
      zIndex: 50,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
  };

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="px-20 py-10 items-center text-gray-600 h-full">
      <h1 className="text-6xl italic font-bold font-dancing text-center underline-offset-4 leading-relaxed text-orange-600">
        Reviews
      </h1>

      {reviews.length > 0 ? (
        <div>
          <Slider {...settings}>
            {reviews.map((review, index) => (
              <div key={index} className="h-fit p-10 bg-slate-100 rounded-xl">
                <p> &quot;{review.review}&quot;</p>
                <div className="flex justify-between mt-5">
                  {" "}
                  <p className="text-bold">- {review.name}</p>
                  {review.rating !== undefined && review.rating !== null && (
                    <StarRating score={review.rating} />
                  )}{" "}
                </div>
              </div>
            ))}
          </Slider>
          
        </div>
      ) : (
        <p> No reviews yet.</p>
      )}

      <div className="flex justify-end mt-5">
        <button className="bg-orange-500 p-5 rounded-full" onClick={openModal}>
          <img src="./assets/icons/write.svg" width={30} height={30}></img>
        </button>
      </div>

      <div className="z-auto">
        <ReactModal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <div className="flex flex-col justify-center items-center gap-3">
            <h1 className="text-2xl font-bold text-center underline-offset-4 leading-relaxed text-orange-600">
              Add a review
            </h1>
            <div className="mdc-text-field">
              {/* Input field */}
              <textarea
                className="border-slate-400 border-2  p-2"
                rows="1"
                cols="50"
                placeholder="Name"
                value={inputName}
                onChange={handleNameChange}
              ></textarea>
            </div>
            <div className="mdc-text-field p-2">
              {/* Input field */}
              <textarea
                className="border-slate-400 border-2  p-2"
                rows="1"
                cols="50"
                placeholder="Email"
                value={inputEmail}
                onChange={handleEmailChange}
              ></textarea>
            </div>
            <div className="mdc-text-field">
              {/* Input field */}
              <textarea
                className="border-slate-400 border-2  p-2"
                rows="4"
                cols="50"
                placeholder="Enter your comments..."
                value={inputReview}
                onChange={handleReviewChange}
              ></textarea>
            </div>

            <button
              onClick={handleClassifyClick}
              className="px-10 py-2 inline-block bg-orange-500 text-white font-bold text-xl hover:bg-orange-700 transition-colors mt-10 rounded"
            >
              Submit
            </button>

            {/* Display the classification result */}
            <div>
              {positiveScore !== null && <StarRating score={positiveScore} />}
            </div>
          </div>
        </ReactModal>
      </div>
    </div>
  );
};
