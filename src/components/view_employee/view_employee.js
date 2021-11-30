import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BootstrapTable from 'react-bootstrap-table-next'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import paginationFactory from "react-bootstrap-table2-paginator"
import "react-bootstrap-table2-paginator"
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Link } from 'react-router-dom'

const ViewEmployee = () => {

    const [delEmployee, setdelEmployee] = useState([])
    //Delete Employees By Id
    const DeleteEmployee = id => {
        axios.delete(`/api/v1/employees/${id}`)
            .then(res => alert(res.data))
        setdelEmployee(employee.filter(elem => elem._id !== id));
    }
    const [employee, setEmployee] = useState([]);
    const [countEmployee, setcountEmployee] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios
            .get('/api/v1/employees')
            .then((res) => {
                setEmployee(res.data.all_employees)
                setcountEmployee(res.data.total_employee)
                setLoading(false)
            })
            .catch(err => err)

    }, [0])

    const columns = [
        { dataField: '_id', text: 'Employee ID', sort: true, filter: textFilter() },
        { dataField: 'firstname', text: 'First Name', sort: true, filter: textFilter() },
        { dataField: 'lastname', text: 'Last Name', sort: true, filter: textFilter() },
        { dataField: 'emailid', text: 'Email', sort: true, filter: textFilter() },

    ]

    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 5,
        lastPageText: ">>",
        firstPageText: "<<",
        nextPageText: ">",
        prePageText: "<",
        showTotal: true,
        alwaysShowAllBtns: true,
        onPageChange: function (page, sizePerPage) {
            console.log("page", page);
            console.log("sizePerPage", sizePerPage)
        },
        onSizePerPageChange: function (page, sizePerPage) {

            console.log("page", page);
            console.log("sizePerPage", sizePerPage)
        }
    })


    //modal
    const useStyles = makeStyles((theme) => ({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '1px solid #fff',
            boxShadow: theme.shadows[1],
            padding: theme.spacing(2, 4, 3),
            width: 500,

        },
    }));
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [modalInfo, setModalInfo] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const rowEvents = {
        onClick: (e, row) => {
            setModalInfo(row)
            setShowModal(handleOpen)
            console.log(row)
        },
    }
    if (loading) return <div style={{height:"63vh"}} className="spinner-grow text-danger d-flex justify-content-center align-items-center" role="status"> </div>
    if (employee == "undefined" || employee == null || employee == '') return <h1 className="Not-Heads">No employee</h1>
    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between mt-2">
                <button type="button" class="btn btn-success">
                    <Link className="text-white font-weight-bold" to={`/add_employee`}>
                        Add Employee
                    </Link>
                </button>
                <h6>Total Employee {countEmployee}</h6>
            </div>
            <div className="d-flex justify-content-center">
                <h4 className='text-dark  font-weight-bold border-bottom border-dark '> EMPLOYEE LIST</h4>
            </div>
            <BootstrapTable
                bootstrap4
                keyField="id"
                columns={columns}
                data={employee}
                pagination={pagination}
                filter={filterFactory()}
                striped
                hover
                rowEvents={rowEvents}

            />
            <div>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <h3 id="transition-modal-title" className="text-dark  font-weight-bold border-bottom border-dark">View Employee </h3>
                            <ul>
                                <li>{`Employee ID:${modalInfo?._id}`}</li>
                                <li>{`First Name : ${modalInfo?.firstname}`}</li>
                                <li>{`Last Name : ${modalInfo?.lastname}`}</li>
                                <li>{`Email : ${modalInfo?.emailid}`}</li>
                                <li>{`Postdate : ${modalInfo?.Postdate}`}</li>
                            </ul>

                            <div className="mt-4">
                                <button type="button" class="btn btn-success ml-2">
                                    <Link className="text-white " to={`/edit_employee/${modalInfo?._id}`}>
                                        Update
                                    </Link>
                                </button>

                                <button className="btn btn-danger  ml-2" onClick={() => DeleteEmployee(modalInfo?._id)}>Delete </button >
                            </div>
                        </div>
                    </Fade>
                </Modal>
            </div>
        </div>
    )
}

export default ViewEmployee

