import { Modal, Rate } from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  TextClassifier,
  FilesetResolver,
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-text@0.10.0";
import { db } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";

import { Input, InputLabel, Textarea } from "./ui/Input";
import ButtonGroup from "./ui/ButtonGroup";
import Button from "./ui/Button";

const AddReview = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [review, setReview] = useState("");
  const [textClassifier, setTextClassifier] = useState(null);
  const [positiveScore, setPositiveScore] = useState(null);

  const showModal = () => setIsOpen(true);
  const hideModal = () => setIsOpen(false);

  useEffect(() => {
    const initializeTextClassifier = async () => {
      try {
        const text = await FilesetResolver.forTextTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-text@0.10.0/wasm"
        );
        const classifier = await TextClassifier.createFromOptions(text, {
          baseOptions: {
            modelAssetPath: "/src/assets/bert_classifier.tflite",
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
  }, []);

  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleReviewChange = (event) => setReview(event.target.value);

  const handleClassifyClick = async () => {
    if (name === "" || email === "" || review === "") {
      alert("Please fill all the fields");
      return;
    }
    if (!textClassifier) {
      // Handle the case where textClassifier is not initialized yet
      console.error("Text classifier is not initialized");
      return;
    }
    try {
      const result = await textClassifier.classify(review);

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
          name,
          email,
          review,
          rating: roundedScore, // Use the rounded score here
        });

        hideModal();
      } else {
        console.error("Positive category not found");
      }
    } catch (error) {
      console.error("Error during classification:", { error });
    }
  };

  return (
    <>
      <Button
        onClick={showModal}
        className="!w-12 h-12  mb-4"
        title="Add a Review"
      >
        <PlusOutlined />
      </Button>
      <Modal
        open={isOpen}
        onOk={hideModal}
        onCancel={hideModal}
        title="Add a review"
        width={350}
        footer={() => (
          <ButtonGroup className="!mt-6">
            <Button
              outlined
              className="!text-black flex-1 border-gray-600"
              onClick={hideModal}
            >
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleClassifyClick}>
              Submit Review
            </Button>
          </ButtonGroup>
        )}
      >
        <div className="mb-2">
          <InputLabel label="Name" />
          <Input
            placeholder="Full name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="mb-2">
          <InputLabel label="Email" />
          <Input
            type="email"
            placeholder="example@mail.com"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-2">
          <InputLabel label="Write a Review" />
          <Textarea value={review} onChange={handleReviewChange} />
        </div>
        <div>{positiveScore !== null && <Rate value={positiveScore} />}</div>
      </Modal>
    </>
  );
};

export default AddReview;
