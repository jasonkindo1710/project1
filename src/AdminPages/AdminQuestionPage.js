import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import { Button, Form, Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import {
  addNewQuestion,
  deleteQuestion,
  getAllQuestions,
  updateQuestion,
  getQuestion,
} from "../redux/apiRequest";
import { Table, Modal, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
import "./admin.css";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #0048ba;
`;
function AdminQuestionPage() {
  

  const [limit, setLimit] = useState(30);
  const [page, setPage] = useState(1);
  const [dataSource, setDataSource] = useState([]);
  const [isEditing, setIsEdting] = useState(false);

  //addQuestion
  const [isAdding, setIsAdding] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [answer4, setAnswer4] = useState("");
  const [correctanswer, setCorrectanswer] = useState("");
  const [questionID, setQuestionID] = useState("");

  //reload
  const [flag, setFlag] = useState(false);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  //form
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = useSelector(
    (state) => state.auth.login?.currentUser.tokens.access.token
  );
  const questionList = useSelector(
    (state) => state.questions.questions.allQuestions.results
  );
  const singleQuestion = useSelector(
    (state) => state.questions.questions.question
  );

  useEffect(() => {
    setDataSource(questionList);
  }, [questionList]);

  useEffect(() => {
    if (user?.tokens.access.token) {
      getAllQuestions(user?.tokens.access.token, dispatch, page, limit);
    }
  }, [flag]);

  useEffect(() => {
    form.setFieldsValue({
      question: singleQuestion.question,
      answer1: singleQuestion.answer1,
      answer2: singleQuestion.answer2,
      answer3: singleQuestion.answer3,
      answer4: singleQuestion.answer4,
      correctanswer: singleQuestion.correctanswer,
    });
  }, [singleQuestion]);

  const addQuestion = () => {
    setIsAdding(true);
  };
  const handleAddQuestion = () => {
    const newQuestion = {
      question: question,
      answer1: answer1,
      answer2: answer2,
      answer3: answer3,
      answer4: answer4,
      correctanswer: correctanswer,
    };
    addNewQuestion(accessToken, newQuestion, dispatch);
    setIsAdding(false);
    setFlag(!flag);
  };

  const handleDelete = async (id) => {
    await deleteQuestion(accessToken, dispatch, id);
    setFlag(!flag);
  };
  const handleEdit = async (id) => {
    await getQuestion(accessToken, dispatch, id);
    setLoading(false)
    setIsEdting(true);
    setQuestionID(id);
  };

  const submitEdit = async (value) => {
    const [
      questionUpdated,
      answer1Updated,
      answer2Updated,
      answer3Updated,
      answer4Updated,
      correctanswerUpdated,
    ] = [
      value.question,
      value.answer1,
      value.answer2,
      value.answer3,
      value.answer4,
      value.correctanswer,
    ];
    const updatedQuestion = {
      question: questionUpdated,
      answer1: answer1Updated,
      answer2: answer2Updated,
      answer3: answer3Updated,
      answer4: answer4Updated,
      correctanswer: correctanswerUpdated,
    };
    console.log(updatedQuestion);
    await updateQuestion(accessToken, updatedQuestion, dispatch, questionID);
    setIsEdting(false);
    setFlag(!flag);
  };
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
      render: (_, record) =>
        questionList.length >= 1 ? (
          <Button
            onClick={() => {
              handleEdit(record.id);
            }}
          >
            Edit{" "}
          </Button>
        ) : null,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "8",
      render: (_, record) =>
        questionList.length >= 1 ? (
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button>Delete</Button>
          </Popconfirm>
        ) : null,
    },
  ];

  return (
    <div>
      <Button className="btn_add" onClick={addQuestion}>
        Add A New Question
      </Button>
      <Table
        className="table"
        dataSource={dataSource}
        columns={columns}
        pagination={true}
      >
        {" "}
      </Table>
      <Modal
        title="Adding a new question"
        visible={isAdding}
        onCancel={() => setIsAdding(false)}
        onOk={handleAddQuestion}
        okText="Save"
      >
        <Input
          placeholder="Question"
          onChange={(e) => setQuestion(e.target.value)}
        />
        <Input
          placeholder="Answer 1"
          onChange={(e) => setAnswer1(e.target.value)}
        />
        <Input
          placeholder="Answer 2"
          onChange={(e) => setAnswer2(e.target.value)}
        />
        <Input
          placeholder="Answer 3"
          onChange={(e) => setAnswer3(e.target.value)}
        />
        <Input
          placeholder="Answer 4"
          onChange={(e) => setAnswer4(e.target.value)}
        />
        <Input
          placeholder="Correct Answer"
          onChange={(e) => setCorrectanswer(e.target.value)}
        />
      </Modal>
      {loading ? <ClipLoader color={color} loading={loading} css={override} size={60} /> : <Modal
        title="Editing this question"
        visible={isEditing}
        onCancel={() => setIsEdting(false)}
        onOk={() => setIsEdting(false)}
      >
        <Form form={form} onFinish={submitEdit}>
          <Form.Item name="question">
            <Input
              placeholder="Question"
              onChange={(e) => setQuestion(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="answer1">
            <Input
              placeholder="Answer 1"
              onChange={(e) => setAnswer1(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="answer2">
            <Input
              placeholder="Answer 2"
              onChange={(e) => setAnswer2(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="answer3">
            <Input
              placeholder="Answer 3"
              onChange={(e) => setAnswer3(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="answer4">
            <Input
              placeholder="Answer 4"
              onChange={(e) => setAnswer4(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="correctanswer">
            <Input
              placeholder="Correct Answer"
              onChange={(e) => setCorrectanswer(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Save</Button>
          </Form.Item>
        </Form>
      </Modal>}
      <Modal
        title="Editing this question"
        visible={isEditing}
        onCancel={() => setIsEdting(false)}
        onOk={() => setIsEdting(false)}
      >
        <Form form={form} onFinish={submitEdit}>
          <Form.Item name="question">
            <Input
              placeholder="Question"
              onChange={(e) => setQuestion(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="answer1">
            <Input
              placeholder="Answer 1"
              onChange={(e) => setAnswer1(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="answer2">
            <Input
              placeholder="Answer 2"
              onChange={(e) => setAnswer2(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="answer3">
            <Input
              placeholder="Answer 3"
              onChange={(e) => setAnswer3(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="answer4">
            <Input
              placeholder="Answer 4"
              onChange={(e) => setAnswer4(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="correctanswer">
            <Input
              placeholder="Correct Answer"
              onChange={(e) => setCorrectanswer(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Save</Button>
          </Form.Item>
        </Form>
      </Modal>
      
    </div>
  );
}

export default AdminQuestionPage;
