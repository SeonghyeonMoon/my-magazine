import axios from "axios";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { deletePostDB } from "../store/modules/post";


const Post = (props) => {
  const dispatch = useDispatch()
  const likeUp = () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `http://xpecter.shop/api/post/${props.id}/like`,
        {},
        {
          headers: { token },
        }
      )
      .then((res) => {
        console.log("좋아요 결과", res);
      });
  };

  const likeDown = () => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://xpecter.shop/api/post/${props.id}/like`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("좋아요 취소 결과", res);
      });
  };

  const deletePost = () => {
    dispatch(deletePostDB(props.id))
  }


  return (
    <Card>
      <h1>내가 썼니? {props.byMe ? (<><button>수정</button><button onClick={deletePost}>삭제</button></>) : ''}</h1>
      <h1>ID = {props.id}</h1>
      <h1>USER_ID = {props.user_id}</h1>
      <h1>Content = {props.content}</h1>
      <h1>IMG_URL = {props.img_url}</h1>
      <h1>Like_check = {props.like_check ? '좋아요 함' : '좋아요 안 함'}</h1>
      <h1>Like_count = {props.like_count}</h1>
      <h1>Profile_img_url ={props.profile_img_url}</h1>
      <button onClick={likeUp}>좋아요</button>
      <button onClick={likeDown}>좋아요취소</button>
    </Card>
  );
};

export default Post;

const Card = styled.div`
  border: 1px solid #999;
  width: 500px;
  margin: 0 auto;
`;
