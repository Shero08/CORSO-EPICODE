import React from 'react'
import Badge from 'react-bootstrap/Badge';

const MyBadge = (props) => {
  return (
    <Badge bg={props.color}>{props.badge}</Badge>
  )
}

export default MyBadge