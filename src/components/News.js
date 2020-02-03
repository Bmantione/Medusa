import React from "react";
import axios from "axios";
import { List, Image, Loader } from "semantic-ui-react";
import Moment from "react-moment";
import './News.component.css'

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = { news: [] }
  }

  componentDidMount() {
    axios.get(this.props.Source).then(res => {
      const news = res.data.articles;
      this.setState({ news: news });
    });
  };

  renderList() {
    return this.state.news.map(n => {
      return (
        <List.Item key={n.url}>
          <Image src={n.urlToImage} verticalAlign='middle' size='tiny' floated='left' />
          <List.Content>
            <List.Header>{n.title}</List.Header>
            <List.Description>
              <b><Moment date={n.publishedAt} format="HH:mm DD/MM/YYYY" /></b>
              <br />
              {n.description + '...'}
            </List.Description>
          </List.Content>
        </List.Item>
      )
    })
  }

  render() {
    if (this.state.news.length === 0) {
      return <Loader active />
    }

    return (
      <div className='news'>
        <List divided selection verticalAlign='middle'>
          {this.renderList()}
        </List>
      </div>
    )
  }
}

export default News
