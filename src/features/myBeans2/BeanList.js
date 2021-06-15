import {React, useState} from "react";

import BeanListItem from "./BeanListItem";
// import { selectFilteredBeans } from "./beansSlice";
import {useSelector} from "react-redux";
import {selectFilteredBeanIds} from "./beansSlice";
import {Link} from "react-router-dom";
import Chips from "./Chips";
import {makeStyles} from "@material-ui/core/styles";

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

const BeanList = () => {
    const classes = useStyles();
    const beanIds = useSelector(selectFilteredBeanIds);
    const [editable, setEditable] = useState(false);

    const renderedListItems = beanIds.map((beanId) => {
        return <BeanListItem key={beanId} id={beanId} editable={editable}/>;
    });

    const handleClick = () => {
        setEditable(!editable);
    };

    const loadingStatus = useSelector((state) => state.beans.status);

    const editButtonLabel = !editable ? "Edit" : "Done";

    if (loadingStatus === "loading") {
        return (
            <div>
                <div className="loader"/>
            </div>
        );
    }

    return (
        <div>
            <div className={classes.chips}>
                <Link to="/selection">
                    <Chips name="Register beans" pattern="Create" color="primary"/>
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

export default BeanList;
