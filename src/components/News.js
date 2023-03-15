import React, { Component } from 'react'
import NewsIteam from './NewsIteam'

export default class News extends Component {
  
  constructor(){
    super();
    console.log("hello i am a constructor from news component");
    this.state={
      articles:[],
    loading: true}
  }
  async componentDidMount(){
    let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=8f7f2588282f4830bb15a704ec5db50f";
    let data= await fetch(url);
    let parsedData =await  data.json();
    console.log(parsedData);
    this.setState({articles: parsedData.articles})
  }

  handleNextClick= async () =>{
    console.log('next');

    let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=8f7f2588282f4830bb15a704ec5db50f&page=${this.state.page+1}&pageSize=20`;
    let data= await fetch(url);
    let parsedData =await  data.json();
    console.log(parsedData);
    this.setState({
      page: this.page+1,
      articles: parsedData.articles
    })
  }
  handlePrevClick= async() =>{
    console.log('previous');

    let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=8f7f2588282f4830bb15a704ec5db50f&page=${this.state.page-1}`;
    let data= await fetch(url);
    let parsedData =await  data.json();
    console.log(parsedData);
    this.setState({
      page: this.page-1,
      articles: parsedData.articles
    })
  }

  render() {
    return (
      <div className="container my-3">

        <h1 className='text-centre' >NewsMonkey - Top Headlines</h1>
        
        <div className="row">
        {this.state.articles.map((element)=>{
          return <div className='col-md-4' key={element.url}>
          <NewsIteam  title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 88):""} imageUrl={element.urlToImage} newsUrl={element.url}></NewsIteam>
        </div>
        })}
          
          {/* <div className='col-md-4 '>
            <NewsIteam title="mytitle" description="mydesc"></NewsIteam>
          </div>
          <div className='col-md-4 '>
            <NewsIteam title="mytitle" description="mydesc"></NewsIteam>
          </div> */}
        </div>
        <div className='container d-flex justify-content-between'>

        
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&laquo; Previous</button>
        <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &raquo;</button>
        </div>
      </div>
    )
  }
}
