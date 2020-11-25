import React from 'react';

class Post extends React.Component {
  dateFormat(date) {
    return date.replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).*/, '$3-$2-$1 $4:$5:$6')
  }

  render() {
    return (
      <div className="post">
        <div className="post-info">
          <span className="post-username">{this.props.data.user.username}</span>&nbsp;
          <span className="post-created-at">{this.dateFormat(this.props.data.created_at)}</span>
        </div>
        <div className="post-message">
          {this.props.data.message}
        </div>
      </div>
    )
  }
}

export default Post;