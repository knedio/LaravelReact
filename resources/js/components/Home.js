import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { getUsers, updateUser, deleteUser } from '../providers/UserApi';
import TableUserRow from './TableUserRow';
import UserUpdateModal from './modals/UserUpdateModal';

const paginationStyleLink = {
  color: 'black',
  float: 'left',
  padding: '4px 10px',
  textDecoration: 'none',
  border: '1px solid #ddd',
  fontSize: '14px',
}
const paginationStyle = {
  listStyleType: 'none',
}

export default class Home extends Component {
    
    state = {
        users: [],
        tempUsers: [],
        isLoading: true,
        show: false,
        modal: {
            show: false,
            data: {
                id: '', 
                name: '', 
                email: '', 
                address: '', 
                gender: '', 
                description: '',
                access_type: '',
                password: ''
            }
        },
        searchQuery: '',
        quickEditBtn: false,
        currentPage: 1,
        perPage: 3,
        errors: {}
    }
    
    componentDidUpdate(prevProps,prevState){
        if (prevState.searchQuery !== this.state.searchQuery) {
            console.log('sear')
            if (this.searchQuery !== '') {
                this.setState( prevState => {
                    let tempUsers = prevState.users.filter((item) => {
                            return Object.keys(item).some((key) => {
                                let string = String(item[key]);
                                return string.toLowerCase().indexOf(this.state.searchQuery.toLowerCase())>-1
                            });
                        });
                    return {
                        tempUsers: tempUsers
                    }
                })
            }else{
            console.log('sear')
                this.setState( prevState => ({
                    tempUsers: prevState.users
                }));
                // this.temp = this.state.tempUsers;
            }
        }
    }

    componentDidMount() {
        getUsers().then( res => {
            console.log(res)
            this.setState( prevState => ({
                    isLoading: false,
                    users: res,
                    tempUsers: res
            }));
        });
    }
    
    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
        console.log('testasdas')
    }

    handleClose = () => {
        this.setState( prevState => ({
            modal: {
                show: false,
                data: {...prevState.modal.data}
            }
        }));
    }

    handleShow = (id) => {
        let user = this.state.tempUsers.filter( user => {
            if (user.id === id) {
                return user
                // let result = Object.keys(user).map(i => user[i])
                // return result;
            }
        })
        this.setState({ 
            modal: {
                show: true,
                data: {
                    id: user[0].id, 
                    name: user[0].name, 
                    email: user[0].email, 
                    address: user[0].address, 
                    gender: user[0].gender, 
                    description: user[0].description,
                    access_type: user[0].access_type,
                    password: ''
                }
            }
        });
    }

    updateUser = (userData) => {
       updateUser(userData).then( res => {
            if (res) {
                this.setState( prevState => {
                    const updateUsers = prevState.users.map(user => {
                        if (user.id === userData.id) {
                            user = {...userData}
                        }
                        return user;
                    })
                    console.log(updateUsers)
                    const updateTempUsers = prevState.tempUsers.map(user => {
                        if (user.id === userData.id) {
                            user = {...userData}
                        }
                        return user;
                    })
                    console.log(updateTempUsers)
                    return {
                        users: updateUsers,
                        tempUsers: updateTempUsers
                    }
                });
            }else{
                this.setState({
                    errors: res
                })
            }
        });
    }
    
    deleteUser = (id) => {
        console.log(id)
        deleteUser(id).then( res => {
            this.setState( prevState => {
                return {
                    users: [ ...prevState.users.filter( user => user.id !== id )],
                    tempUsers: [ ...prevState.tempUsers.filter( user => user.id !== id )]
                }
            });
        })

    }

    addQuickEdit = (user) => {

        this.setState( prevState => {
            const row = {
                id: user.id+0.1, 
                name: user.name, 
                email: user.email, 
                address: user.address, 
                gender: user.gender, 
                description: user.description,
                access_type: user.access_type,
                password: ''
            };
            return { 
                users: [...prevState.users, row],
                tempUsers: [...prevState.tempUsers, row],
                quickEditBtn: true
            };
        });
    }

    removeQuickEdit = (id) => {
        this.setState( prevState => ({
            tempUsers: [...prevState.tempUsers.filter( user => user.id !== id)],
            users: [...prevState.users.filter( user => user.id !== id)],
            quickEditBtn: false
        }))
    }

    // sortAscending = () => {
    //     const test = this.state.tempUsers.sort().reverse()
    //     console.log(test)
    //     this.setState({ 
    //         users: test,
    //         tempUsers: test
    //     })
    // }


    paginate = (e) => {
        this.setState({
            currentPage: Number(e.target.id)
        });
    }    

    render() {
        const { tempUsers, currentPage, perPage } = this.state;
        const lastIndex = currentPage * perPage;
        const firstIndex = lastIndex - perPage;
        tempUsers.sort((a, b) => a.id - b.id);
        const currentTempUsers = tempUsers.slice(firstIndex, lastIndex);
        console.log(currentTempUsers)
        let count = 0;
        let tableUser = currentTempUsers.length > 0 ? currentTempUsers
        .map ( (user) => {
            if (user.id % 1 === 0) count+=1; 
            return (
                <TableUserRow
                    quickEditBtn={this.state.quickEditBtn}
                    key={user.id} 
                    handleShow={this.handleShow} 
                    index={count} 
                    user={user} 
                    addQuickEdit={this.addQuickEdit} 
                    removeQuickEdit={this.removeQuickEdit}
                    updateUser={this.updateUser}
                    deleteUser={this.deleteUser}
                />
            )
        }) : <tr>
                <td className="text-center" colSpan='7'><h2>No user.</h2></td> 
            </tr>;

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(tempUsers.length / perPage); i++) {
            pageNumbers.push(i);
        }
        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                    style={paginationStyleLink}
                    key={number}
                    id={number}
                    onClick={this.paginate}
                >
                  {number}
                </li>
            );
        });
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h1 className="mt-5">List of Users</h1>
                        </div>
                    </div>
                    <div className="row justify-content-center align-items-center mb-5">
                        <div className="col-lg-6 col-md-6 col-xs-6">
                            <input 
                                type="text" 
                                name="searchQuery"
                                className="form-control" 
                                id="" 
                                value={this.state.searchQuery} 
                                placeholder="Search here ..."
                                onChange={this.onChange}
                            />
                            <br/>
                        </div>
                        <div className="col-lg-12 col-md-12 col-xs-12">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className="thead-dark">
                                       <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email Address</th>
                                            <th scope="col">Address</th>
                                            <th scope="col">Gender</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.isLoading ? 
                                            <tr>
                                                <td className="text-center" colSpan='7'><h2>Loading ...</h2></td> 
                                            </tr>
                                            : tableUser
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <hr/>
                        </div>
                        <ul style={paginationStyle}>
                            {renderPageNumbers}
                        </ul>
                    </div>
                </div>
                <UserUpdateModal 
                    updateUser={this.updateUser} 
                    show={this.state.modal.show} 
                    handleShow={this.handleShow} 
                    handleClose={this.handleClose} 
                    user={this.state.modal.data} 
                />
            </div>

        );
    }
}