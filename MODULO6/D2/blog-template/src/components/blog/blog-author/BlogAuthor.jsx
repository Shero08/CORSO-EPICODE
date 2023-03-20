import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import "./styles.css";

const BlogAuthor = (props) => {
  const { name, surname, avatar } = props;
  console.log(avatar);
  return (
    <Row>
      <Col xs={"auto"} className="pe-0">
        <Image className="blog-author" src={avatar} roundedCircle />
      </Col>
      <Col>
        <h6>di {name} {surname}</h6>
      </Col>
    </Row>
  );
};

export default BlogAuthor;
