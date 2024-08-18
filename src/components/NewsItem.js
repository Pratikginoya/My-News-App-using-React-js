import React, { Component } from "react";

const NewsItem = (props)=> {
    let { title, description, urlImage, url } = props;
    return (
      <div className="card" style={{ width: "18rem" }}>
        <img src={urlImage} className="card-img-top" alt="..." style={{height: '160px'}} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a href={url} target="_blank" className="btn btn-primary">
            Read More
          </a>
        </div>
      </div>
    )
}

export default NewsItem;
