import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "react-moment";
import { List, Image } from "semantic-ui-react";
import Moment from "react-moment";

export default function NewsList() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get("https://newsapi.org/v2/top-headlines?sources=google-news-fr&apiKey=7485e20aca044c7fbd9d9694f47bbadc").then(res => {
      console.log(res);
      const news = res.data.articles;
      setNews(news);
    });
  }, []);

  return (
    <>
      {news.length === 0 ? (
        <div>loading...</div>
      ) : (
          <div>
            <List divided selection verticalAlign='middle'>
              {news.map(n => (
                <List.Item key={n.url}>
                  <Image src={n.urlToImage} verticalAlign='middle' size='tiny' floated='left'/>
                  <List.Content>
                    <List.Header>{n.title}</List.Header>
                    <List.Description>
                      <b><Moment date={n.dateToPublish}  format="HH:mm:ss DD/MM/YYYY"/></b>
                      <br/>
                      {n.description + '...'}
                    </List.Description>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </div>
        )}
    </>
  )
};
