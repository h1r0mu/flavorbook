import { React, useState, useEffect } from "react";

import BeanListItem from "./BeanListItem";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Chips from "./Chips";
import { db } from "../../firebase.js";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {},
  cards: {},
  chips: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: 20,
    marginBottom: 20,
  },
}));

const BeanList = ({ keyWords }) => {
  const classes = useStyles();
  const [beans, setBeans] = useState([]);

  useEffect(() => {
    console.log(keyWords);
    if (keyWords != " ") {
      const fetchData = async () => {
        let snapShot_store = "";
        let snapShot_country = "";
        let snapShot_flavor = "";
        let snapShot_roast = "";

        snapShot_roast = await db
          .collection("userBeans")
          .where("process", "in", keyWords)
          .get();
        snapShot_store = await db
          .collection("userBeans")
          .where("store", "in", keyWords)
          .get();
        snapShot_country = await db
          .collection("userBeans")
          .where("country", "in", keyWords)
          .get();
        snapShot_flavor = await db
          .collection("userBeans")
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
    } else {
      const fetchData = async () => {
        let snapShot = "";

        snapShot = await db.collection("userBeans").get();

        const beans = snapShot.docs.map((doc) => {
          const item = doc.data();
          return item;
        });

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
    }
  }, [keyWords]);

  const [editable, setEditable] = useState(false);

  const renderedListItems = beans.map((bean) => {
    return <BeanListItem key={bean.beanId} bean={bean} editable={editable} />;
  });

  const handleClick = () => {
    setEditable(!editable);
  };

  const loadingStatus = useSelector((state) => state.beans.status);

  const editButtonLabel = !editable ? "Edit beans" : "Done";

  if (loadingStatus === "loading") {
    return (
      <div>
        <div className="loader" />
      </div>
    );
  }

  return (
    <div>
      <div className={classes.chips}>
        <Link to="/selection">
          <Chips name="Register beans" pattern="Create" color="primary" />
        </Link>
        <Chips
          name={editButtonLabel}
          pattern="Edit"
          color="secondry"
          onClick={handleClick}
        />
      </div>
      <ul className="bean-list">{renderedListItems}</ul>
    </div>
  );
};

BeanList.propTypes = {
  keyWords: PropTypes.array,
};

export default BeanList;
