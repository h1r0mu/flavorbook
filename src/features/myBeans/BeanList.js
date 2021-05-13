import { React, useState, useEffect } from "react";

import BeanListItem from "./BeanListItem";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Chips from "./Chips";
import { db } from "../../firebase.js";

const BeanList = ({ keyWords }) => {
  const [beans, setBeans] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let snapShot_store = "";
      let snapShot_country = "";
      let snapShot_flavor = "";
      let snapShot_roast = "";

      snapShot_roast = await db
        .collection("beans")
        .where("process", "in", keyWords)
        .get();
      snapShot_store = await db
        .collection("beans")
        .where("store", "in", keyWords)
        .get();
      snapShot_country = await db
        .collection("beans")
        .where("country", "in", keyWords)
        .get();
      snapShot_flavor = await db
        .collection("beans")
        .where("flavorLevel1Descriptors", "array-contains-any", keyWords)
        .get();

      const beans_store = snapShot_store.docs.map((doc) => {
        const item = doc.data();
        return item;
      });
      const beans_country = snapShot_country.docs.map((doc) => {
        const item = doc.data();
        return item;
      });
      const beans_flavor = snapShot_flavor.docs.map((doc) => {
        const item = doc.data();
        return item;
      });
      const beans_roast = snapShot_roast.docs.map((doc) => {
        const item = doc.data();
        return item;
      });

      let beans = beans_store
        .concat(beans_country)
        .concat(beans_flavor)
        .concat(beans_roast);

      const resultbeans = Array.from(
        beans
          .reduce(
            (map, currentitem) => map.set(currentitem.beanId, currentitem),
            new Map()
          )
          .values()
      );

      setBeans(resultbeans);
    };
    fetchData();
  }, [keyWords]);

  // const beanIds = useSelector(selectBeanIds);
  console.log(beans);
  const beanIds = beans.map((bean) => bean.beanId);
  const [editable, setEditable] = useState(false);

  const renderedListItems = beanIds.map((beanId) => {
    return <BeanListItem key={beanId} id={beanId} editable={editable} />;
  });

  const handleClick = () => {
    setEditable(!editable);
  };

  const loadingStatus = useSelector((state) => state.beans.status);

  const editButtonLabel = !editable ? "Edit" : "Done";

  if (loadingStatus === "loading") {
    return (
      <div>
        <div className="loader" />
      </div>
    );
  }

  return (
    <div>
      <Chips
        name={editButtonLabel}
        pattern="Edit"
        color="secondry"
        onClick={handleClick}
      />
      <ul className="bean-list">{renderedListItems}</ul>
    </div>
  );
};

BeanList.propTypes = {
  keyWords: PropTypes.array,
};

export default BeanList;
