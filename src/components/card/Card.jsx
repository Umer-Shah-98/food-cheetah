import React, { useEffect, useRef, useState } from "react";
import "./card.css";
import greenAvocado from "../../assets/green-avocado.jpg";
import { useCart, useDispatchCart } from "../hooks/ContextReducer";
const Card = (props) => {
  const priceRef=useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  let dispatch = useDispatchCart();
  let data = useCart();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = async () => {
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: totalPrice,
      quantity: quantity,
      size: size,
    });
   await console.log(data);
  };
  let totalPrice = quantity * parseInt(options[size]);
  useEffect(()=>{
    setSize(priceRef.current.value);
  },[])
  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem" }}>
        <img
          src={props.foodItem.img}
          className="card-img-top card-image"
          alt="..."
          style={{ height: "200px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <div className="container w-100">
            <select
              name="food-quantity"
              id="food-quantity"
              className="m-2 h-100 bg-success rounded"
              onChange={(event) => setQuantity(event.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              name="food-size"
              id="food-size"
              className="m-2 h-100  rounded"
              ref={priceRef}
              onChange={(event) => setSize(event.target.value)}
            >
              {priceOptions.map((size) => {
                return (
                  <option key={size} value={size}>
                    {size}
                  </option>
                );
              })}
            </select>
            <div className="total-price d-inline fs-5">Rs.{totalPrice}/=</div>
          </div>
          <hr></hr>
          <button
            className="btn btn-success justify-content-center mx-2"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
