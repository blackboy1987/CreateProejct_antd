import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { FormattedMessage } from 'umi/locale';
import { Form, Input, Button, Card, message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Link from 'umi/link';

const FormItem = Form.Item;

@connect(({ project, loading }) => ({
  project,
  submitting: loading.effects['project/edit'],
}))
@Form.create()
class Add extends PureComponent {
  componentDidMount() {
    const {
      dispatch,
      match: { params = {} },
    } = this.props;
    if (params) {
      dispatch({
        type: 'project/edit',
        payload: params,
      });
    }
  }

  handleSubmit = e => {
    const root = this;
    const { dispatch, form } = root.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'project/save',
          payload: values,
          callback: response => {
            if (response.type === 'success') {
              message.success(response.content);
              router.push('/project');
            } else {
              message.error(response.content);
            }
          },
        });
      }
    });
  };

  render() {
    const {
      submitting,
      project: { projectInfo = {} },
    } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
            {getFieldDecorator('id', {
              initialValue: projectInfo.id,
            })(<Input style={{ display: 'none' }} />)}
            <FormItem
              {...formItemLayout}
              label="项目名称"
              extra={projectInfo.id ? '项目不能修改' : '一旦填写将不能修改'}
            >
              {getFieldDecorator('name', {
                initialValue: projectInfo.name,
                rules: [
                  {
                    required: true,
                    message: '必填',
                  },
                ],
              })(<Input readOnly={projectInfo.id ? 'readonly' : ''} />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="包名称"
              extra={projectInfo.id ? '包名称不能修改' : '一旦填写将不能修改'}
            >
              {getFieldDecorator('packageName', {
                initialValue: projectInfo.packageName,
                rules: [
                  {
                    required: true,
                    message: '必填',
                  },
                ],
              })(<Input readOnly={projectInfo.id ? 'readonly' : ''} />)}
            </FormItem>

            <FormItem {...formItemLayout} label="项目描述">
              {getFieldDecorator('memo', {
                initialValue: projectInfo.memo,
              })(<Input.TextArea autosize={{ minRows: 8, maxRows: 8 }} />)}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                <FormattedMessage id="form.save" />
              </Button>
              <Button style={{ marginLeft: 8 }}>重置</Button>
              <Link to="/project">
                <Button style={{ marginLeft: 8 }}>返回</Button>
              </Link>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Add;
