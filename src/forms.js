import PropTypes from "prop-types";
import React from "react";

const StoreInfo = (props) => {
  return (
    <form>
      <h1>豆の情報</h1>
      <h2>購入店</h2>
      <input type="text" name="store" onChange={props.handleChange} />
      <h2>国</h2>
      <input type="text" name="country" onChange={props.handleChange} />
      <h2>地域</h2>
      <input type="text" name="region" onChange={props.handleChange} />
      <h2>精製方法</h2>
      <input type="text" name="processing" onChange={props.handleChange} />
      <h2>挽き方／豆のまま</h2>
      <input type="text" name="grind" onChange={props.handleChange} />
      <h2>抽出方法</h2>
      <input type="text" name="brewing" onChange={props.handleChange} />
      <h2>購入してからの経過日</h2>
      <input type="text" name="days" onChange={props.handleChange} />
    </form>
  );
};
StoreInfo.propTypes = {
  handleChange: PropTypes.func,
};

export default StoreInfo;
