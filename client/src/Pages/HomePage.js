import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout'
import { BsFillPlusCircleFill } from "react-icons/bs";
import { Modal, List } from 'antd';
import axios from 'axios';
import moment from "moment"
import toast from 'react-hot-toast';
import { Select } from "antd"
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
const { Option } = Select

const HomePage = () => {

    const [isvisible, setIsvisible] = useState(false)
    const [task, setTask] = useState('')
    const [selected, setSelected] = useState(null)
    const [status, setStatus] = useState(["Not Yet", "In Progress", "Completed"])
    const [name, setName] = useState('')
    const [updatedName, setUpdatedName] = useState("")
    const [updateTask, setUpdateTask] = useState("")
    const [list, setList] = useState([])
    const [updateIsvisible, setUpdateIsvisible] = useState(false)


    const handlerSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/task/addtask`, { task, name })
            if (data?.success) {
                toast.success('Task is Created Successfully...')
                getAllTasks()
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error('Somthing Went wrong....')
        }
    }


    const getAllTasks = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/task/getalltasks`)
            if (data && data.success) {
                setList(data)
            }
        } catch (error) {
            toast.error('Error in While fetching Tasks')
        }
    }

    useEffect(() => {
        getAllTasks()
    }, [])

    // handle Update

    const handleUpdateForm = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/task/updatetask/${selected._id}`, { task: updateTask, name: updatedName })
            if (data && data.success) {
                getAllTasks()
            }
        } catch (error) {
            toast.error('Error in Upadating Tasks')
        }
    }


    //handle Delete

    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/task/deletetask/${id}`)
            if (data && data.success) {
                toast.success('Deleted Successfully')
                getAllTasks()
            }
        } catch (error) {
            toast.error('Error in Deleting Tasks')
        }
    }

    // Status

    const handleChange = async (id, value) => {
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/task/status/${id}`, { status: value })
            getAllTasks()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout>
            <div className="card text-center layoutBg " >
                <div className='p-2' style={{ backgroundColor: '#e6f7ff', border: 'none', cursor: 'pointer' }}>
                    <h1 style={{ color: '#4d94ff', fontSize: "30px" }} >
                        <img src='https://w7.pngwing.com/pngs/268/27/png-transparent-action-item-computer-icons-task-others-miscellaneous-angle-text-thumbnail.png'
                            style={{ width: '40px', height: '40px' }} /> Task List
                    </h1>
                </div>
                <div className="card-body cardBody"  >
                    <div className="list-group">
                        {list.task?.map(c => (
                            <li key={c._id}  >
                                <a
                                    className="list-group-item list-group-item-action "
                                >
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{c.task}</h5>
                                        <small className='' style={{ fontSize: '10px', color: '#ac39ac' }} > <MdOutlineDeleteOutline size={20} className=' text-danger' onClick={() => handleDelete(c._id)} /> <CiEdit size={20} onClick={() => { setUpdateIsvisible(true); setUpdatedName(c.name); setUpdateTask(c.task); setSelected(c) }} className='me-1 text-primary' /> {moment(c?.createAt).fromNow()}</small>
                                    </div>
                                    <div className='d-flex justify-content-between '  >
                                        <p className="mb-1" style={{ fontSize: '15px', fontFamily: 'Roboto', marginTop: '10px' }} >Assigned to : {c?.name}</p>
                                        <Select variant={false} onChange={(value) => handleChange(c._id, value)} defaultValue={c?.status} >
                                            {status.map((s, i) => (
                                                <Option key={i} value={s} > <h6 style={{ fontSize: "12px" }} className='text-warning-emphasis'  >{s} </h6> </Option>
                                            ))}
                                        </Select>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </div>
                </div>
                <div className="card-footer text-body-secondary" style={{ backgroundColor: 'transparent', border: 'none' }}  >
                    <BsFillPlusCircleFill className='addBtn' size={60} onClick={() => setIsvisible(true)} style={{ color: "#ff4d94", backgroundColor: 'ffcc66', borderRadius: '50%', border: 'none' }} />
                </div>
            </div>
            <Modal open={isvisible} footer={null} onCancel={() => setIsvisible(false)}>
                <form onSubmit={handlerSubmit} className='formBox text-center p-3'   >
                    <div className="mb-3 w-100 d-flex flex-column justify-content-center align-items-center  ">
                        <input type="text" value={task} onChange={e => setTask(e.target.value)} className="form-control w-60 mb-2 " placeholder='Enter new task' />
                        <input type="text" value={name} onChange={e => setName(e.target.value)} className="form-control w-60 " placeholder='Enter new Name' />
                    </div>
                    <button type="submit" onClick={() => setIsvisible(false)} className="btn btn-primary  ">Submit</button>
                </form>
            </Modal>
            <Modal open={updateIsvisible} footer={null} onCancel={() => setUpdateIsvisible(false)} >
                <form onSubmit={handleUpdateForm} className='formBox text-center p-3' >
                    <div className="mb-3 w-100 d-flex flex-column justify-content-center align-items-center "    >
                        <input type="text" value={updateTask} onChange={e => setUpdateTask(e.target.value)} className="form-control w-60 mb-2 " placeholder='Enter new task' />
                        <input type="text" value={updatedName} onChange={e => setUpdatedName(e.target.value)} className="form-control w-60 " placeholder='Enter new Name' />
                    </div>
                    <button type="submit" onClick={() => setUpdateIsvisible(false)} className="btn btn-primary">Submit</button>
                </form>
            </Modal>
        </Layout >
    )
}

export default HomePage

