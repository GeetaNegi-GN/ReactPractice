import React, { Component } from 'react'

export class NewsItem extends Component {
 
  render() {
    let {title , description,imageUrl,newsUrl ,author,date} = this.props;
    return (
      <div className="my-3">
        <div className="card" >
        <img src={!imageUrl ?"https://img-cdn.tnwcdn.com/image/tnw-blurple?filter_last=1&fit=1280%2C640&url=https%3A%2F%2Fcdn0.tnwcdn.com%2Fwp-content%2Fblogs.dir%2F1%2Ffiles%2F2023%2F05%2FUntitled-design-1-2.jpg&signature=383254bb08cd826c1458b6497282f104":imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small className="text-muted">By {!author?"unknown":author} on {new Date(date).toGMTString()}</small></p>
    <a  href={newsUrl} target = "_blank"className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem
