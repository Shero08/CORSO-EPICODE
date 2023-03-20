import React from "react";
import { Container, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import useAxios from "../../hooks/useAxios";
import "./styles.css";

const Blog = () => {
  const {_id} = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useAxios({ url: `http://localhost:3030/posts/${_id}`, headers: {}});
  console.log(data);

  return (
    <>
    {loading && <h1>Caricamento in corso</h1>}
    {!loading && error && navigate("/404")}
    {!loading && data &&
    <div className="blog-details-root">
      <Container>
        <Image className="blog-details-cover" src={data.cover} fluid />
        <h1 className="blog-details-title">{data.title}</h1>

        <div className="blog-details-container">
          <div className="blog-details-author">
            <BlogAuthor {...data.author} />
          </div>
          <div className="blog-details-info">
            <div>{data.createdAt}</div>
            <div
              style={{
                marginTop: 20,
              }}
            >
              <BlogLike defaultLikes={["123"]} onChange={console.log} />
            </div>
          </div>
        </div>

        <div
          dangerouslySetInnerHTML={{
            __html: data.content,
          }}
        ></div>
      </Container>
    </div>
    }
    </>
  );
};

export default Blog;
