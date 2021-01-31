import React from "react";

class StoreInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      store: null,
      country: null,
      region: null,
      processing: null,
      grind: null,
      brewing: null,
      days: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    console.log(this);
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    return (
      <form>
        <h1>豆の情報</h1>
        <h2>購入店</h2>
        <input type="text" name="store" onChange={this.handleChange} />
        <h2>国</h2>
        <input type="text" name="country" onChange={this.handleChange} />
        <h2>地域</h2>
        <input type="text" name="region" onChange={this.handleChange} />
        <h2>精製方法</h2>
        <input type="text" name="processing" onChange={this.handleChange} />
        <h2>挽き方／豆のまま</h2>
        <input type="text" name="grind" onChange={this.handleChange} />
        <h2>抽出方法</h2>
        <input type="text" name="brewing" onChange={this.handleChange} />
        <h2>購入してからの経過日</h2>
        <input type="text" name="days" onChange={this.handleChange} />
      </form>
    );
  }
}

export default StoreInfo;
