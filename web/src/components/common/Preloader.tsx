import React from "react";
import preloader from "../../assets/images/preloader.gif";

type Props = {
  show?: boolean,
}

const Preloader: React.FC<Props> = ({ show = true,...props }) => {
  return (
    <>
      {
        show
          ? <div><img src={preloader} alt="loading" /></div>
          : <>{props.children}</>
      }
    </>
  );
};

export default Preloader;
