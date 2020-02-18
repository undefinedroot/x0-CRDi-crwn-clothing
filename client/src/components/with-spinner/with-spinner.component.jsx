import React from 'react';

import Spinner from '../spinner/spinner.component';

// creating HOC (higher order component)
const WithSpinner = WrappedComponent => {
  // destructure WrappedComponent's props
  return ({ isLoading, ...otherProps }) => {
    return isLoading ? <Spinner /> : <WrappedComponent {...otherProps} />;
  };
};

export default WithSpinner;

/**

  // ---------- HOC -----------
  // using a class based HOC, example we have a component with similar
  // function in which we can just use HOC to minimize repeating code
  // the HOC retrieves the data, WrappedComponent still gets all the props
  // from the use that uses withData HOC

  const withData = (WrappedComponent) => {
    class WithData extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          data: []
        }
      }
      componentDidMount() {
        fetch(this.props.dataSource)
          .then(res => res.json())
          .then(data => this.setState({data: data.slice(0,3)}))
      }
      render() {
        const { dataSource, ...otherProps } = this.props;
        return (
          this.state.data.length < 1
            ? <h1>LOADING</h1>
            : <WrappedComponent data={this.state.data} {...otherProps} />
          );
      }
    }
    return WithData; // enhanced component with some functionality
  }

  export default withData;
  // ---------- HOC -----------

  // ---------- consuming -----------
  import withData from ...

  // props retrieved from withData(...)
  const UserProfile({data, name, email, dataSource}) => (
    <div>
      Posts:
      {data.map(post => (
        <div key={post.id}>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );

  export default withData(UserProfile);
  // ---------- consuming -----------

  // from parent component;

  import UserProfile from ...
  <UserProfile dataSource={`..url..`} />
*/
