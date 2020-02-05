import React from "react";
import axios from "axios";
import { Image, Loader, Grid, Header } from "semantic-ui-react";
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
        <Grid.Column key={n.url}>
          <Grid.Row>
            <Header as="h2" inverted>
              <Image src={n.urlToImage} verticalAlign='middle' size='small' floated='left' /> {n.title}
              <Header.Subheader>
                <b><Moment date={n.publishedAt} format="HH:mm DD/MM/YYYY" /></b>
                <p>{n.description}</p>
              </Header.Subheader>
            </Header>
          </Grid.Row>
        </Grid.Column>
      )
    })
  }

  render() {
    if (this.state.news.length === 0) {
      return <Loader active />
    }

    return (
      <div>
        <Grid columns={1} className='news'>
          {this.renderList()}
        </Grid>
      </div>
    )
  }
}

export default News
