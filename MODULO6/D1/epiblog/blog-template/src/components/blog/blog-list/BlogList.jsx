import React from "react";
import { Col, Row } from "react-bootstrap";
import posts from "../../../data/posts.json";
import BlogItem from "../blog-item/BlogItem";
import useFetch from "../../../hooks/useFetch";

const BlogList = () => {
  const { data, loading, error } = useFetch({ url: `http://localhost:3030/authors`, headers: {}});
  console.log(data);
  
  const newPosts = posts.map((post, i) => {
    return {
      ...post,
      author: data[i]
    };
  });

  console.log(newPosts);

  return (
    <Row>
      {!loading && error && (
          <div className="mb-4 rounded-lg bg-danger-100 py-5 px-6 text-base text-danger-700" role="alert">{error}</div>
      )}
      {loading && <h1>Caricamento in corso...</h1>}
      {!loading && newPosts && newPosts.map((post, i) => ( 
        <Col
          key={`item-${i}`}
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem 
            key={post.title} 
            {...post}
          />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;
