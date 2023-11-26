import { createContext, useEffect, useState } from "react";
import { FilesetResolver, LanguageDetector, TextClassifier } from "@mediapipe/tasks-text";

const MainContext = createContext();

const MainProvider = ({ children }) => {
  const [textClassifier, setTextClassifier] = useState(null);
  const [languageDetector, setLanguageDetector] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeLanguageDetection = async () => {
      try {
        const text = await FilesetResolver.forTextTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-text@0.10.0/wasm"
        );
        const detector = await LanguageDetector.createFromOptions(text, {
          baseOptions: {
            modelAssetPath: "/src/assets/language_detector.tflite",
          },
        });
        setLanguageDetector(detector);
      } catch (error) {
        console.error("Error initializing language detector:", error);
      }
    };

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
      }
    };

    const initializeTasks = async () => {
      await initializeLanguageDetection();
      await initializeTextClassifier();
      setLoading(false);
    };

    initializeTasks();
  }, []);

  if (loading) {
    // You might want to render a loading spinner or message here
    return <div>Loading...</div>;
  }

  return (
    <MainContext.Provider
      value={{
        textClassifier,
        languageDetector,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, MainProvider };
