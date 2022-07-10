import React from "react";
import "./TeamModal.css";
import { useState } from "react";
import { Modal } from "react-bootstrap";

function TeamModal(props) {
    const [teamModalShow, teamModalSetShow] = useState(false);
    const teamModalHandleClose = () => teamModalSetShow(false);
    const teamModalHandleShow = () => teamModalSetShow(true);

    /*
      function download(filename, text) {
          var element = document.createElement('a');
          element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
          element.setAttribute('download', filename);
      
          element.style.display = 'none';
          document.body.appendChild(element);
      
          element.click();
      
          document.body.removeChild(element);
      }*/

    const handleDownloadTeam = () => {
        teamModalHandleShow();
        /*
            if(spentBudget > budget) {
          alert("You have exceeded your budget! Please adjust your team or change budget.");
        }
            */
    };

    return (
        <div>
            <Modal show={teamModalShow} onHide={teamModalHandleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Set Budget</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span>Choose New Budget: </span>
                </Modal.Body>
            </Modal>

            <button onClick={handleDownloadTeam} className="btn btn-primary">
                Download Team
            </button>
        </div>
    );
}
export default TeamModal;
