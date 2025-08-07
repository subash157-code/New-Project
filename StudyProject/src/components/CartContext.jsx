// cartContext.js
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [immediateCourses, setImmediateCourses] = useState([]);

  const addCourseToCart = (course) => {
    if (!immediateCourses.find((c) => c.id === course.id)) {
      setImmediateCourses([...immediateCourses, course]);
    }
  };

  const removeCourse = (id) => {
    setImmediateCourses(immediateCourses.filter((c) => c.id !== id));
  };

  return (
    <CartContext.Provider value={{ immediateCourses, addCourseToCart, removeCourse }}>
      {children}
    </CartContext.Provider>
  );
};
