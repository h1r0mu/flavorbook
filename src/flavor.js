function Flavor(props) {

  return (
    <button className="flavor" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Flavor
