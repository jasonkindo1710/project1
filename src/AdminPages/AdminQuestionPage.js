import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addNewQuestion, getAllQuestions } from "../redux/apiRequest";
import { Table, Modal, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { loginSuccess } from "../redux/authSlice";
import './admin.css'

function AdminQuestionPage() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [dataSource, setDataSource] = useState([])
  const [totalRecord, setTotalRecord] = useState(10)

  //addQuestion
  const [isAdding, setIsAdding] = useState(false);
  const [question, setQuestion] = useState("")
  const [answer1, setAnswer1] = useState("")
  const [answer2, setAnswer2] = useState("")
  const [answer3, setAnswer3] = useState("")
  const [answer4, setAnswer4] = useState("")
  const [correctanswer, setCorrectanswer] = useState("")


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = useSelector((state) => state.auth.login?.currentUser.tokens.access.token)
  const questionList = useSelector(
    (state) => state.questions.questions.allQuestions.results
  );
  
  
  useEffect(() => {
      setDataSource(questionList)
  }, [questionList])
 

  useEffect(() => {
    if (user?.tokens.access.token) {
      getAllQuestions(user?.tokens.access.token, dispatch, page, limit)
    }
  }, []);

 const addQuestion = () => {
   setIsAdding(true)
 }
 const handleAddQuestion = () => {
   const newQuestion = {
     question: question,
     answer1: answer1,
     answer2: answer2,
     answer3: answer3,
     answer4: answer4,
     correctanswer: correctanswer
   }
   addNewQuestion(accessToken, newQuestion, dispatch)
   setIsAdding(false)
   console.log(newQuestion)
 }
  
  const columns = [
    {
      title: "Question",
      dataIndex: "question",
      key: "1",
    },
    {
      title: "Answer",
      dataIndex: "answer1",
      key: "2",
    },
    {
      title: "Answer",
      dataIndex: "answer2",
      key: "3",
    },
    {
      title: "Answer",
      dataIndex: "answer3",
      key: "4",
    },
    {
      title: "Answer",
      dataIndex: "answer4",
      key: "5",
    },
    {
      title: "Correct Answer",
      dataIndex: "correctanswer",
      key: "6",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "7",
      render: () => {
        return <>
          <EditOutlined />
          <DeleteOutlined 
          onClick={() => {}}
          style={{color: "red", marginLeft: 12}}/>
        </>
      }
    }
  ];
  const handlePageChange = (e) => {
    setPage(e.page)
    setLimit(e.limitAmount)
    getAllQuestions(user?.tokens.access.token, dispatch, e.page, limit)
      .then((res) => setTotalRecord(res.totalResults));

  }
  return (
    <div>
    <Button className="btn_add" onClick={addQuestion}>Add A New Question</Button>
      <Table className="table" dataSource={dataSource} columns={columns} onChange={handlePageChange}
      pagination={{
        total: totalRecord,
        current: page,
        limitAmount: limit,
        showLessItems: true,
        showSizeChanger: true
      }}>
        {" "}
      </Table>
      <Modal
        title="Adding a new question"
        visible = {isAdding}
        onCancel = {() => setIsAdding(false)}
        onOk = {handleAddQuestion}
        okText = "Save"
      >
        <Input placeholder="Question" onChange={(e) => setQuestion(e.target.value)} />
        <Input placeholder="Answer 1" onChange={(e) => setAnswer1(e.target.value)} />
        <Input placeholder="Answer 2" onChange={(e) => setAnswer2(e.target.value)} />
        <Input placeholder="Answer 3" onChange={(e) => setAnswer3(e.target.value)} />
        <Input placeholder="Answer 4" onChange={(e) => setAnswer4(e.target.value)} />
        <Input placeholder="Correct Answer" onChange={(e) => setCorrectanswer(e.target.value)} />

      </Modal>
    </div>
  );
}

export default AdminQuestionPage;
