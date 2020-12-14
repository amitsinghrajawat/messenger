import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, Box} from '../../theme';

/** Actions */
import {uniqueUserChat} from '../../../store/actions/chatActions';

export class Message extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      txtMsg: '',
      activeRoomFound: false,
      activeRoom: '',
      myMsgs: [],
    };
    this.routeParams = props.route.params;
  }

  componentDidMount() {
    const {_id, email, name} = this.routeParams;
    // console.log(_id, email, name);

    new Promise((res) => {
      this.props.uniqueUserChat({_id, name, email});
      setTimeout(res, 2000);
    }).then(() => {
      // this.props.LoadRoomMsgs();
    });
  }

  render() {
    return (
      <Text variant="title" color="primary">
        Message
      </Text>
    );
  }
}

const mapStateToProps = (state) => ({
  chat: state.chat,
});
export default connect(mapStateToProps, {uniqueUserChat})(Message);
