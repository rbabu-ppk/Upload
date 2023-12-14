import React from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Upload,
  message,
  Typography,
  Col,
  Row,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

const Job: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const { file, email, selectedOption } = values;

    if (!file || !email || !selectedOption) {
      console.error("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("file", file[0].originFileObj);
    formData.append("email", email);
    formData.append("selectedOption", selectedOption);

    try {
      await axios.post("http://localhost:3001/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      message.success("Data uploaded successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Row justify="center">
      {/* <Col xs={24} sm={20} md={16} lg={24} xl={24}> */}
      <Col xs={24} sm={24} md={20} lg={20} xl={20}>
        <div
          style={{
            background: "#ffffff",
            padding: "80px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography.Title level={3}>File Upload</Typography.Title>

          <Form
            form={form}
            name="upload"
            onFinish={onFinish}
            initialValues={{ selectedOption: "Select Type" }}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Form.Item label="Email" name="email" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Type"
              name="selectedOption"
              rules={[{ required: true }]}
            >
              <Select>
                <Option value="Select Type">Select Type</Option>
                <Option value="Department">Department</Option>
                <Option value="Site">Site</Option>
                <Option value="Employee">Employee</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="File"
              name="file"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: "Please upload a file" }]}
            >
              <Upload beforeUpload={() => false} maxCount={1}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Upload
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Job;
