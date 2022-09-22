import { Col, Row, Input, Button, Select, Tag } from 'antd';
import Todo from '../Todo';
import {useDispatch, useSelector} from 'react-redux'
import {addTodo} from '../../redux/actions'
import {v4 as uuidV4} from 'uuid'
import { useState } from 'react';
import { todoListSelector } from '../../redux/selectors';

export default function TodoList() {
  const dispatch = useDispatch()
  const [todoName, setTodoName] = useState('')
  const [priority, setPriority] = useState('Medium')

  const todoList = useSelector(todoListSelector)
  // console.log(todoList)
  const handleAddButtonClick = () => {
    // dispatch() là function để bắn đi action
    dispatch(addTodo({
      id: uuidV4(),
      name: todoName,
      priority: priority,
      completed: false
    }))
  }

  return (
    <Row style={{ height: 'calc(100% - 40px)' }}>
      <Col span={24} style={{ height: 'calc(100% - 40px)', overflowY: 'auto' }}>
        {
          todoList.map((todo) => <Todo key={todo.id} name={todo.name} prioriry={todo.priority} />)
        }
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: 'flex' }} compact>
          <Input value={todoName} onChange={(e) => setTodoName(e.target.value)} />
          <Select defaultValue="Medium" value={priority} onChange={(value) => setPriority(value)}>
            <Select.Option value='High' label='High'>
              <Tag color='red'>High</Tag>
            </Select.Option>
            <Select.Option value='Medium' label='Medium'>
              <Tag color='blue'>Medium</Tag>
            </Select.Option>
            <Select.Option value='Low' label='Low'>
              <Tag color='gray'>Low</Tag>
            </Select.Option>
          </Select>
          <Button type='primary' onClick={handleAddButtonClick}>
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}
