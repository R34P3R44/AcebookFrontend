import React from 'react';
import * as Cookies from 'js-cookie';


class Post extends React.Component {
  dateFormat(date) {
    return date.replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).*/, '$3-$2-$1 $4:$5:$6')
  }

  edit(){
    
  }

  delete(post_id){
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
  }

  render() {
    let edit_button = '';
    let delete_button = '';
    const post_id = this.props.data.id;

    if (this.props.data.editable && this.props.user.authCompleted) {
      edit_button = <button onClick={this.edit}>Edit</button>
    }
    if (this.props.data.owned_by && this.props.user.authCompleted) {
      delete_button = <button onClick={() => { this.delete(post_id) }}>Delete</button>
    }
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
  }
}

export default Post;