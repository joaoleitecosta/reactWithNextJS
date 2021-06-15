import { Component } from 'react';
import './styles.css';
import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TestInput';


 class App extends Component {
    state = {
      posts: [],
      allPosts: [],
      page: 0,
      postsPerPage: 2,
      searchValue: ''
    }
    timeoutUpdate = null

  handleTimeout = () => {
    const { posts, counter } = this.state;
    posts[0].title = `Mudou ${counter}x`
    this.timeoutUpdate = setTimeout(() => {
      this.setState({
        posts, counter: counter + 1
      })
    }, 1000)
  }

  loadMorePosts = () => {
    const {page, postsPerPage, allPosts, posts } = this.state
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts)
    this.setState({
      posts, 
      page: nextPage
    })

  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value })
    console.log(value)
  }

  loadingPosts = async () => {
    const { page, postsPerPage } = this.state;
   
   const postAndPhotos = await loadPosts();
   
   this.setState({
     posts: postAndPhotos.slice(page, postsPerPage), 
     allPosts: postAndPhotos
    })
  }


  componentWillUnmount() {
    clearTimeout(this.timeoutUpdate);
  }

  componentDidUpdate() {
  //  this.handleTimeout()
  }
  
  async componentDidMount() {
    await this.loadingPosts();
  }

  render() {
    const { posts, allPosts, searchValue } = this.state;
    const noMorePosts = posts.length === allPosts.length

    const filterPosts = !!searchValue ? allPosts.filter(post => post.title.toLowerCase().includes(searchValue))
    : posts

    return (
      <section className="container">
        
        <div className="search-container">
          <TextInput value={searchValue} onChange={this.handleChange} />
        </div>
        {!!filterPosts.length && <Posts  posts={filterPosts}  /> }

        {!filterPosts.length && <p>Not exist post</p>}
        
        {!searchValue && 
          <Button 
            loadMorePosts={this.loadMorePosts} 
            text="Load more posts" 
            disabled={noMorePosts}
          />
      }
      </section>
  );
  }
}

export default App;
