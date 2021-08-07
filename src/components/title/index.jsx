import React from "react";
import PropTypes from "prop-types";

const Title = (props) => {
  const { title } = props;
  return <h4 className="mt-4">{title}</h4>;
};

Title.propTypes = {
  title: PropTypes.string,
};

export default Title;
