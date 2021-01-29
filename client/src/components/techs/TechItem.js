import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteTech } from "../../actions/techActions";
import M from "materialize-css/dist/js/materialize.min.js";

const TechItem = ({ tech: { _id, firstname, lastname, type }, deleteTech }) => {
  const onDelete = () => {
    deleteTech(_id);
    M.toast({ html: `${firstname} ${lastname} is Deleted` });
  };

  return (
    <li className="collection-item">
      <div>
        {firstname} {lastname} - <span>{type}</span>
        <a href="#!" className="secondary-content" onClick={onDelete}>
          <i className="material-icons grey-text">delete</i>
        </a>
      </div>
    </li>
  );
};

TechItem.propTypes = {
  tech: PropTypes.object.isRequired,
};

export default connect(null, { deleteTech })(TechItem);
