import { createContext, useState } from "react";

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const allObj = {
    cart,
    setCart,
  };

  return <CartContext.Provider value={allObj}>{children}</CartContext.Provider>;
};

export default CartContext;
