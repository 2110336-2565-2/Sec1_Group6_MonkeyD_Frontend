import React, {useState, useEffect, useRef} from "react";

const ConfirmModal = ({
  showModalSignal,
  setModalSignal,
  header,
  message,
  onPickLeft,
  onPickRight,
  leftTxt,
  leftColor,
  leftBGColor,
  disableLeft,
  rightTxt,
  rightColor,
  rightBGColor,
  disableRight,
  enableClickOutside,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [leftHover, setLeftHover] = useState(false);
  const [rightHover, setRightHover] = useState(false);
  const modalContainerRef = useRef();

  const defaultLeftStyle = {
    backgroundColor: leftBGColor,
    color: leftColor,
  };

  const hoverLeftStyle = {
    backgroundColor: leftColor,
    color: leftBGColor,
    cursor: disableLeft ? "default" : "pointer",
    borderColor: leftBGColor,
  };

  const defaultRightStyle = {
    backgroundColor: rightBGColor,
    color: rightColor,
  };

  const hoverRightStyle = {
    backgroundColor: rightColor,
    color: rightBGColor,
    cursor: disableRight ? "default" : "pointer",
    borderColor: rightBGColor,
  };

  function handleLeft() {
    onPickLeft();
    setShowModal(false);
  }

  function handleRight() {
    onPickRight();
    setShowModal(false);
  }

  function handleClickOutside(e) {
    if (enableClickOutside && modalContainerRef.current === e.target) {
      setShowModal(false);
      setModalSignal(false);
    }
  }

  useEffect(() => {
    setShowModal(showModalSignal);
    setLeftHover(false);
    setRightHover(false);
  }, [showModalSignal]);

  return (
    <>
      {showModal && (
        <div
          className="confirm-modal-container"
          ref={modalContainerRef}
          onClick={handleClickOutside}
        >
          <div className="confirm-modal">
            <div className="header-modal">
              <h2>{header}</h2>
              <p>{message}</p>
            </div>
            <div className="button-modal">
              <button
                style={leftHover ? hoverLeftStyle : defaultLeftStyle}
                onMouseEnter={() => setLeftHover(true)}
                onMouseLeave={() => setLeftHover(false)}
                onClick={handleLeft}
                disabled={disableLeft}
              >
                {leftTxt}
              </button>
              <button
                style={rightHover ? hoverRightStyle : defaultRightStyle}
                onMouseEnter={() => setRightHover(true)}
                onMouseLeave={() => setRightHover(false)}
                onClick={handleRight}
                disabled={disableRight}
              >
                {rightTxt}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmModal;
