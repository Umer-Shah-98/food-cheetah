import React, { useEffect, useRef, useState } from "react";
import "./card.css";
import { useCart, useDispatchCart } from "../hooks/ContextReducer";
const Card = (props) => {
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  let dispatch = useDispatchCart();
  let data = useCart();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
    if (food.length !== 0) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          // name: props.foodItem.name,
          price: totalPrice,
          quantity: quantity,
          // size: size,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: totalPrice,
          quantity: quantity,
          size: size,
        });
        return
      }
      return
    }
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: totalPrice,
      quantity: quantity,
      size: size,
    });
    // await console.log(data);
  };
  let totalPrice = quantity * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);
  return (
    <div style={{ width:'18rem'  }}>
      <div className="card border-0 " style={{ width: "18rem", marginTop:"3rem" }}>
        <img
          src={props.foodItem.img}
          className="card-img-top card-image"
          alt="..."
          style={{ height: "200px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <div className="container-fluid w-100 border-0" style={{ display:"flex", paddingLeft:0}}>
            
            
            
            <select
              name="food-quantity"
              id="food-quantity"
              className="m-1 h-100 rounded border-0 bg-danger px-2 py-1"
              style={{backgroundColor:'#ef3123', color:'white'}}
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
              className="m-1 h-100  rounded border-0 bg-danger px-2 py-1"
              style={{backgroundColor:'#ef3123', color:'white'}}
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
            <div className="total-price d-inline fs-5" style={{textAlign:"end", color:'red', paddingTop:'2px'}} >Rs.{totalPrice}/-</div>
          </div>
          <hr></hr>
          <button
            className="btn  justify-content-center mx-2 bg-danger"
            style={{backgroundColor:'#ef3123', color:'white'}}
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
