import React from "react";
import { Col, Row } from "react-bootstrap";
import useAxios from "../../../hooks/useAxios";
import BlogItem from "../blog-item/BlogItem";

const BlogList = (props) => {
  const { data, loading, error } = useAxios({ url: `http://localhost:3030/posts`, method:'POST', headers: {}});
  console.log(data);

  return (
    <Row>
      {!loading && error && (
          <div className="mb-4 rounded-lg bg-danger-100 py-5 px-6 text-base text-danger-700" role="alert">{error}</div>
      )}
      {loading && <h1>Caricamento in corso...</h1>}
      {!loading && data && data.map((post) => (
        <Col
          key={post._id} 
          md={4}
          style={{ marginBottom: 50 }}
        >
          <BlogItem 
          key={post._id} 
          {...post} 
          />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;
