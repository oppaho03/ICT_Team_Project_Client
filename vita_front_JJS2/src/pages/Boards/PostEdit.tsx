/**
 * 게시글 수정 페이지
 */
import { useParams } from "react-router-dom";

export default function PostEdit() {
  const { id } = useParams(); // URL에서 게시글 ID 가져오기

  return <h1>게시글 수정 - ID: {id}</h1>;
}
