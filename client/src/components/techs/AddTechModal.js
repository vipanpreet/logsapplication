import React, { useState } from "react";
import { connect } from "react-redux";
import { addTech } from "../../actions/techActions";
import M from "materialize-css/dist/js/materialize.min.js";

const AddTechModal = ({ addTech }) => {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [type, settype] = useState("development");

  const onSubmit = () => {
    if (firstname === "" || lastname === "") {
      M.toast({ html: "Please enter the first and last name" });
    } else {
      addTech({
        firstname,
        lastname,
        type,
      });
      M.toast({
        html: `${firstname} ${lastname} - ${type} is Added`,
        classes: "blue",
      });

      //   Clear Fields
      setfirstname("");
      setlastname("");
      settype("");
    }
  };

  return (
    <div id="add-tech-modal" className="modal">
      <div className="modal-content">
        <h4>New Member</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="firstname"
              value={firstname}
              onChange={(e) => setfirstname(e.target.value)}
            />
            <label htmlFor="firstname" className="active">
              First Name
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="lastname"
              value={lastname}
              onChange={(e) => setlastname(e.target.value)}
            />
            <label htmlFor="lastname" className="active">
              Last Name
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <label htmlFor="type" className="active">
              Type
            </label>
            <select
              name="type"
              value={type}
              id="type"
              onChange={(e) => settype(e.target.value)}
            >
              <option value="development">development</option>
              <option value="design">design</option>
            </select>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a
          href="#!"
          onClick={onSubmit}
          className="modal-close waves-effect waves-blue btn"
        >
          Enter
        </a>
      </div>
    </div>
  );
};

export default connect(null, { addTech })(AddTechModal);
