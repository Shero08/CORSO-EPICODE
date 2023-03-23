import { convertToHTML } from "draft-convert";
import { EditorState } from "draft-js";
import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";
import usePostAxios from "../../hooks/usePostAxios";


const NewBlogPost = (props) => {
  const navigate = useNavigate();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [formData, setFormData] = useState({})
  console.log(formData)

  const { data, loading, error, post } = usePostAxios({ url: `http://localhost:3030/posts`, headers: {
    "Content-Type": "application/json"
  }});
  console.log(data);

  const [html, setHTML] = useState(null);

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setHTML(html);
  }, [editorState]);

  const handlePost = (e) => {
    console.log('func.handlePost -> start')
    e.preventDefault()

    post(formData);

    setTimeout(() => {
      navigate('/')
    }, 2000)

    if(error){
      console.log('Errore invio dati...');
    }
  }
  
  return (
    <Container className="new-blog-container">
      <Form className="mt-5" onSubmit={handlePost}>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Title</Form.Label>
          <Form.Control 
            size="lg" 
            name="title"
            placeholder="Title" 
            onChange={(e) =>
              setFormData({
                  ...formData,
                  title: e.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group controlId="blog-cover" className="mt-3">
          <Form.Label>Cover</Form.Label>
          <Form.Control 
            size="lg" 
            name="cover"
            placeholder="http://example.com" 
            onChange={(e) =>
              setFormData({
                  ...formData,
                  cover: e.target.value,
              })
            }
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="blog-readTime-value" className="mt-3">
            <Form.Label>Read time - Value</Form.Label>
            <Form.Control 
              size="lg" 
              name="readTime.value"
              placeholder="1" 
              onChange={(e) =>
                setFormData({
                    ...formData,
                    readTime: {
                      ...formData.readTime,
                      value: Number(e.target.value),
                    }
                })
              }
            />
          </Form.Group>
          <Form.Group as={Col} controlId="blog-readTime-unit" className="mt-3">
          <Form.Label>Read time - Unit</Form.Label>
            <Form.Control
              size="lg" 
              name="readTime.unit"
              as="select"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  readTime: {
                    ...formData.readTime,
                    unit: e.target.value,
                  }
                })
              }
            >
              <option defaultValue="">Scegli opzione</option>
              <option>second</option>
              <option>minute</option>
              <option>hour</option>
            </Form.Control>
          </Form.Group>
        </Row>
        
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control 
            size="lg" 
            name="category"
            as="select"
            onChange={(e) =>
              setFormData({
                  ...formData,
                  category: e.target.value,
              })
            }
          >
            <option defaultValue="">Scegli opzione</option>
            <option>Category1</option>
            <option>Category2</option>
            <option>Category3</option>
            <option>Category4</option>
          </Form.Control>
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="blog-author-name" className="mt-3">
            <Form.Label>Author</Form.Label>
            <Form.Control 
              size="lg" 
              name="author.name"
              placeholder="Mario Rossi" 
              onChange={(e) =>
                setFormData({
                    ...formData,
                    author: {
                      ...formData.author,
                      name: e.target.value,
                    }
                })
              }
            />
          </Form.Group>
          <Form.Group as={Col} controlId="blog-author-avatar" className="mt-3">
            <Form.Label>Avatar</Form.Label>
            <Form.Control
              size="lg" 
              name="author.avatar"
              placeholder="http://example.com" 
              onChange={(e) =>
                setFormData({
                    ...formData,
                    author: {
                      ...formData.author,
                      avatar: e.target.value,
                    }
                })
              }
            />
          </Form.Group>
        </Row>

        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Blog Content</Form.Label>
          <Editor
            editorState={editorState}
            name="content"
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={setEditorState}
            onChange={(e) =>
              setFormData({
                  ...formData,
                  content: html,
              })
            }
          />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
