import React, { useState, useEffect } from "react";
import TechSelectOptions from "../techs/TechSelectOptions";

import { connect } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";
import { updateLog } from "../../actions/logActions";

const EditLogModal = ({ current, updateLog }) => {
  const [message, setMessage] = useState("");
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (current) {
      setMessage(current.message);
      setAttention(current.attention);
      setTech(current.tech);
      setCompleted(current.completed);
    }
  }, [current]);

  const onSubmit = () => {
    if (message === "" || tech === "") {
      M.toast({ html: "Please enter a message and tech" });
    } else {
      // Updating log with filled form with current
      const updLog = {
        _id: current._id,
        message,
        attention,
        tech,
        completed,
        date: new Date(),
      };

      updateLog(updLog);
      M.toast({ html: `Log updated by ${tech}`, classes: "blue" });

      //   Clear Fields
      setMessage("");
      setTech("");
      setAttention(false);
      setCompleted(false);
    }
  };

  return (
    <div id="edit-log-modal" className="modal " style={modalStyle}>
      <div className="modal-content">
        <h4>Edit System Log</h4>

        <div className="row">
          <textarea
            id="textarea1"
            className="materialize-textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <label htmlFor="message" className="active">
            Log Message
          </label>
        </div>

        <div className="row">
          <div className="input-field">
            <select
              name="tech"
              value={tech}
              className="browser-default"
              onChange={(e) => setTech(e.target.value)}
            >
              <option value="" disabled>
                Select Member
              </option>
              <TechSelectOptions />
            </select>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <p>
              <label>
                <input
                  type="checkbox"
                  className="filled-in"
                  checked={attention}
                  value={attention}
                  onChange={(e) => setAttention(!attention)}
                />
                <span>Needs Attention ?</span>
              </label>
            </p>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <p>
              <label>
                <input
                  type="checkbox"
                  className="filled-in"
                  checked={completed}
                  value={completed}
                  onChange={(e) => setCompleted(!completed)}
                />
                <span>SET COMPLETED</span>
              </label>
            </p>
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
const modalStyle = {
  width: "auto",
  maxWidth: "75%",
  height: "auto",
  maxHeight: "75%",
};

// Getting current set log
const mapStateToProps = (state) => ({
  current: state.log.current,
});

export default connect(mapStateToProps, { updateLog })(EditLogModal);
