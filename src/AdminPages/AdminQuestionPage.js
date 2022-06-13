import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import { Button, Form, Popconfirm, Select, Tooltip } from "antd";
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
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "./admin.css";

const override = css`
  position: fixed;
  left: 50%;
  top: 35%;
  height: 50px;
  width: 50px;
  z-index: 9999;
  border-color: #0048ba;
`;
function AdminQuestionPage() {
  const [limit, setLimit] = useState(50);
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
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  //form
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser?.tokens?.access.token
  );
  const questionList = useSelector(
    (state) => state.questions.questions?.allQuestions?.results
  );
  const singleQuestion = useSelector(
    (state) => state.questions.questions?.question
  );

  useEffect(() => {
    setDataSource(questionList);
  }, [questionList]);

  useEffect(() => {
    if (user?.tokens.access.token) {
      setLoading(true)
      getAllQuestions(user?.tokens.access.token, dispatch, page, limit);
    }
   setLoading(false)
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
  const handleAddQuestion = async () => {
    const newQuestion = {
      question: question,
      answer1: answer1,
      answer2: answer2,
      answer3: answer3,
      answer4: answer4,
      correctanswer: correctanswer,
    };
    setLoading(true);
    await addNewQuestion(accessToken, newQuestion, dispatch);
    // setIsAdding(false);
    form.resetFields()
    setFlag(!flag);
  };

  const handleDelete = async (id) => {
    await deleteQuestion(accessToken, dispatch, id);
    setFlag(!flag);
  };
  const handleEdit = async (id) => {
    setLoading(true)
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
    setLoading(true);
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
      title: "Answer 1",
      dataIndex: "answer1",
      key: "2",
    },
    {
      title: "Answer 2",
      dataIndex: "answer2",
      key: "3",
    },
    {
      title: "Answer 3",
      dataIndex: "answer3",
      key: "4",
    },
    {
      title: "Answer 4",
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
          <>
            <Tooltip title="Edit">
              <EditOutlined
                onClick={() => {
                  handleEdit(record.id);
                }}
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Popconfirm
                title="Are you sure to delete?"
                onConfirm={() => handleDelete(record.id)}
              >
                <DeleteOutlined
                  onClick={() => handleDelete(user.id)}
                  style={{ color: "red", marginLeft: 20 }}
                />
              </Popconfirm>
            </Tooltip>
          </>
        ) : null,
    },
  ];

  return (
    <div>
    <ClipLoader color={color} loading={loading}  css={override} />
      <Button className="btn_add" onClick={addQuestion} type="primary">
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
        closable={false}
        footer={null}
 
      >
        <Form form={form} onFinish={handleAddQuestion}>
          <Form.Item 
          label="Question" name="question"
          rules={[
          {
            required: true,
            message: 'Please input your question!',
          },
        ]}>
            <Input
              placeholder="Question"
              onChange={(e) => setQuestion(e.target.value)}
            />
          </Form.Item>
          <Form.Item 
          label="Answer 1" name="answer1"
          rules={[
          {
            required: true,
            message: 'Please input your answer!',
          },
        ]}>
            <Input
              placeholder="Answer 1"
              onChange={(e) => setAnswer1(e.target.value)}
            />
          </Form.Item>
          <Form.Item 
          label="Answer 2" name="answer2"
          rules={[
          {
            required: true,
            message: 'Please input your answer!',
          },
        ]}>
            <Input
              placeholder="Answer 2"
              onChange={(e) => setAnswer2(e.target.value)}
            />
          </Form.Item>
          <Form.Item 
          label="Answer 3" name="answer3"
          rules={[
          {
            required: true,
            message: 'Please input your answer!',
          },
        ]}>
            <Input
              placeholder="Answer 3"
              onChange={(e) => setAnswer3(e.target.value)}
            />
          </Form.Item>
          <Form.Item 
          label="Answer 4" name="answer4"
          rules={[
          {
            required: true,
            message: 'Please input your answer!',
          },
        ]}>
            <Input
              placeholder="Answer 4"
              onChange={(e) => setAnswer4(e.target.value)}
            />
          </Form.Item>
          <Form.Item 
          label="Correct Answer" name="correctanswer"
          rules={[
          {
            required: true,
            message: 'Please input your correct answer!',
          },
        ]}>
            <Input
              placeholder="Correct Answer"
              onChange={(e) => setCorrectanswer(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button onClick={() => setIsAdding(false)}>Cancel</Button>
            <Button htmlType="submit" >Save</Button>
            <Button onClick={() => {console.log(form.resetFields())}}>Clear</Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
          title="Editing this question"
          visible={isEditing}
          footer={null}
          closable={false}
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
              <Select
                placeholder="Choose correct answer"
                onChange={(e) => setCorrectanswer(e)}
              >
                <Select.Option value={singleQuestion.answer1}>{singleQuestion.answer1}</Select.Option>
                <Select.Option value={singleQuestion.answer2}>{singleQuestion.answer2}</Select.Option>
                <Select.Option value={singleQuestion.answer3}>{singleQuestion.answer3}</Select.Option>
                <Select.Option value={singleQuestion.answer4}>{singleQuestion.answer4}</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button 
              onClick={() => setIsEdting(false)}
              >Cancel</Button>
              <Button htmlType="submit">Save</Button>
            </Form.Item>
          </Form>
      </Modal>
      
    </div>
  );
}

export default AdminQuestionPage;
