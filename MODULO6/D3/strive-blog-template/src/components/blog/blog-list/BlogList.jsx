import React, { useState, useEffect } from 'react';
import { Col, Row } from "react-bootstrap";
import useAxios from "../../../hooks/useAxios";
import BlogItem from "../blog-item/BlogItem";
import Pagination from 'react-bootstrap/Pagination';

const BlogList = (props) => {
  const [totPages, setTotPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;

  const { data, loading, error} = useAxios({ url: `http://localhost:3030/pagination?page=${currentPage}&limit=${limit}`, headers: {}});

  useEffect(() => {
      if(data){
        setTotPages(data.totalPages)
      }
  }, [data]);

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  console.log(totPages)
  return (
    <>
    <Row>
      {!loading && error && (
          <div className="mb-4 rounded-lg bg-danger-100 py-5 px-6 text-base text-danger-700" role="alert">{error}</div>
      )}
      {loading && <h1>Caricamento in corso...</h1>}
      {!loading && data && data.posts && data.posts.map((post) => (
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

    {(totPages === 1) ? '' :
    <Pagination className='justify-content-center'>
        <Pagination.Prev 
          onClick={handlePrevClick} 
          disabled={currentPage === 1}
        />

        <Pagination.Item>{`${currentPage} of ${totPages}`}</Pagination.Item>

        <Pagination.Next 
          onClick={handleNextClick} 
          disabled={currentPage === totPages}
        />
    </Pagination>
    }
    </>
  );
};

export default BlogList;
