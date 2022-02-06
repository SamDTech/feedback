import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
      setIsLoading(true)
    const res = await fetch(
      "http://localhost:5000/feedback?_sort=id&_order=desc"
    );
    const data = await res.json();
    setIsLoading(false)
    setFeedback(data);
  };

  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      edit: true,
      item,
    });
  };

  // Update feedback
  const updateFeedback = (id, updatedItem) => {
    setFeedback(
      feedback.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      )
    );
  };

  // Delete feedback
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
    console.log("delete", id);
  };

  // Add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();

    setFeedback([newFeedback, ...feedback]);
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        isLoading,
        handleDelete,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
