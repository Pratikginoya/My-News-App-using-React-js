import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props)=> {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const updateData = async ()=>{
    props.setProgress(10);
    let url = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${props.apiKey}&page=${page}&pageSize=${props.newsPerPage}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(40);
    let parsedData = await data.json();
    props.setProgress(60);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(()=>{
    updateData();
  },[])

  // preButtonClick = async ()=>{
  //   let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=c79a42dcedc947f488b7135679739f64&page=${this.state.page - 1}&pageSize=${this.props.newsPerPage}`
  //   this.setState({loading: true,})
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   console.log(parsedData);
  //   this.setState({
  //     articles: parsedData.articles,
  //     page: this.state.page - 1,
  //     loading: false,
  //   })
  // }

  // nextButtonClick = async ()=>{
  //   let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=79355cdfebd041dabe3dd7848a4667d9&page=${this.state.page + 1}&pageSize=${this.props.newsPerPage}`
  //   this.setState({loading: true,})
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   console.log(parsedData);
  //   this.setState({
  //     articles: parsedData.articles,
  //     page: this.state.page + 1,
  //     loading: false,
  //   })
  // }

  const fetchMoreData = async () => {
    if (articles.length >= totalResults) {
        return;
    }

    props.setProgress(10);
    const nextPage = page + 1;
    setPage(nextPage);
    let url = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.newsPerPage}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(50);
    let parsedData = await data.json();
    props.setProgress(60);
    if (parsedData.articles && parsedData.articles.length > 0) {
      setArticles(articles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
      setPage(nextPage);
    }
    setLoading(false);
    props.setProgress(100);
  };

    return (
      <>
        <h2 className="mx-3 mb-3 text-center" style={{marginTop:'70px'}}>News Headlines</h2>
        <InfiniteScroll
          dataLength={articles.length} //This is important field to render the next data
          hasMore={articles.length <= totalResults}
          loader={<Spinner/>}
          next={fetchMoreData}
        >
          <div className="container">
            <div className="row gy-3">
                {articles.map((element, index) => {
                    return <div className="col-md-4" key={element.url + index}>
                      <NewsItem
                        title={element.title ? (element.title.length > 45 ? element.title.slice(0, 45) + '...' : element.title) : ""}
                        description={element.description ? (element.description.length > 45 ? element.description.slice(0, 88) + '...' : element.description) : ""}
                        urlImage={element.urlToImage}
                        url={element.url}
                      />
                    </div>
                })}
                {/* <div className="d-flex justify-content-between my-4">
                      <button disabled={this.state.page <= 1} type="button" className="btn btn-primary" onClick={this.preButtonClick}>&laquo; Previous</button>
                      <button disabled={Math.ceil(this.state.totalResults/this.state.dataPerPage) == this.state.page} type="button" className="btn btn-primary" onClick={this.nextButtonClick}>Next &raquo;</button>
                    </div> */}
            </div>
          </div>
        </InfiniteScroll>
      </>
    )
}

export default News;
