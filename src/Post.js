import React from 'react';
import * as Cookies from 'js-cookie';


class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updated_post: '',
      editing: false,
      id: null
    };

    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  dateFormat(date) {
    return date.replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).*/, '$3-$2-$1 $4:$5:$6')
  }

  // show(post_id) {
  //   let token = Cookies.get("acebookSession")
  //   fetch("http://localhost:1234/api/v1/posts/" + post_id, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //       Authorization: token
  //     },
  //     credentials: 'include'
  //   })
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         this.setState({
  //           isLoaded: true,
  //           posts: result.post
  //         });
  //       }
  //     )
  //     .catch(err => console.log(err))
  // }

  // edit(post_id){
  //     let token = Cookies.get("acebookSession");
  //     const response = await fetch("http://localhost:1234/api/v1/posts/" + post_id, {
  //       method: 'POST',
  //       mode: 'cors',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //         Authorization: token
  //       },
  //       credentials: 'include',
  //       body: JSON.stringify(data)
  //     });
  //     return response.json();
  // }

  delete(post_id) {
    let token = Cookies.get("acebookSession")
    fetch("http://localhost:1234/api/v1/posts/" + post_id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: token
      },
      credentials: 'include'
    })
      .then(this.props.loadPosts)
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({
      editing: true
    })
  }

  // handleSubmit(event) {
  //   event.preventDefault();
  //   let data = {
  //     updated_message: this.state.updated_message
  //   }
  //   let post_id = this.state.post_id
  //   // updateMessage(data, post_id)
  //   //   .then(this.setState({ updated_post: '' }))
  //   //   .then(this.props.loadPosts)
  // }

  handleChange(event) {
    this.setState({ updated_post: event.target.value });
  }

  render() {
    let edit_button = '';
    let delete_button = '';
    const post_id = this.props.data.id;
    let edit_link = "#posts/edit/" + post_id
    // this.setState({ post_id: this.props.data.id})

    if (this.props.data.editable && this.props.user.authCompleted) {
      edit_button = <button onClick={this.handleClick} href={edit_link} type="button">Edit</button>
    }
    if (this.props.data.owned_by && this.props.user.authCompleted) {
      delete_button = <button onClick={() => { this.delete(post_id) }}>Delete</button>
    }
    if (this.state.editing === false){
      return (
        <div className="post">
          <div className="post-info">
            <span className="post-username">{this.props.data.user.username}</span>&nbsp;
            <span className="post-created-at">{this.dateFormat(this.props.data.created_at)}</span>
          </div>
          <div className="post-message">
            {this.props.data.message}
          </div>
          <div className="post-actions">
            {edit_button}
            {delete_button}
          </div>
        </div>
      )
    } else {
      return (
        <form onSubmit={this.handleSubmit} id='new-post-form'>
          <textarea id="new-post-form-message" placeholder="Update old message here" name="message" type="text" value={this.state.updated_post} onChange={this.handleChange} />
          <input id="new-post-form-submit" type="submit" value="Update" />
        </form>
      );
    }
  }
}

// async function updateMessage(data, post_id) {
//   let token = Cookies.get("acebookSession");
//   const response = await fetch("http://localhost:1234/api/v1/posts" + post_id, {
//     method: 'PUT',
//     mode: 'cors',
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//       Authorization: token
//     },
//     credentials: 'include',
//     body: JSON.stringify(data)
//   });
//   return response.json();
// }

export default Post;