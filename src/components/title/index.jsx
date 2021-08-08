import React from "react";
import PropTypes from "prop-types";

const Title = (props) => {
  const { title } = props;
  return <h2 className="mt-4">{title}</h2>;
};

Title.propTypes = {
  title: PropTypes.string,
};

export default Title;
