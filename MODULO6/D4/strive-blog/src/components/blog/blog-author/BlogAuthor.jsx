import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import "./styles.css";

const BlogAuthor = (props) => {
  const { name, avatar } = props;
  return (
    <Row>
      <Col xs={2}>
        <Image className="blog-author" src={avatar} roundedCircle />
      </Col>
      <Col>
        <h6>di {name}</h6>
      </Col>
    </Row>
  );
};

export default BlogAuthor;
