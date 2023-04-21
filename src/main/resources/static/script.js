/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */

var app = new Vue({
    el: "#app",
    data() {
        return {
            TODOs: [

            ],
            editForm: {
                id: "",
                task: "",
                isCompleted: "",
            },
            serverStatus: false,
            previousStatus: false,
            filterStatus: "all",
            currentPage: 1,
            todosPerPage: 5,
            isModalVisible: false,
            isSyncing: false,
            numberOfTodo: -1,
            isAuthorized: true,
        };
    },
    mounted: function () {
        this.checkSession();
        this.fetchJson();
        this.checkServerStatus();
        if (this.serverStatus == false) {
            this.previousStatus = true;
        }
        let interval = setInterval(() => {
            this.checkServerStatus();
            if (this.serverStatus) {
                //Connection Returns to Normal, Sync the Database
                if (this.previousStatus == false) {
                    this.checkSession();
                    this.syncDatabase();
                    this.previousStatus = true;
                }
            } else {
                this.saveLocalStorage();
                this.previousStatus = false;
            }
        }, 5000);
    },
    methods: {
        checkSession: async function () { //Checks HTTPsession, if there's no HTTPsession redirect back to /login
            await fetch('/api/checkSession', {
                credentials: 'include'
            })
                    .then(function (response) {
//                        console.log(response)
                        if (response.status === 200) {
                            // Session is valid, do nothing
                        } else {
                            // Session is not valid, redirect to login page
                            window.location.href = '/login';
                        }
                    })
                    .catch(function (error) {
                        // Handle error if any
                        console.error(error);
                    });
        },
        showModal: function () {
            this.isModalVisible = true;
        },
        hideModal: function () {
            this.isModalVisible = false;
        },
        fetchJson: async function () {
            URI = "/api/todo";
            fetch(URI)
                    .then((res) => res.json())
                    .then((data) => (this.TODOs = data))
                    .then(() => {
//                        console.log(this.TODOs);
                        this.saveLocalStorage();
                    });
        },
        addTODO: async function () {
            if (this.editForm.task === "" || this.editForm.isCompleted === "") {
                return;
            }
//            console.log(this.editForm);
            console.log("ADD");
            let maxId = Math.max(...this.TODOs.map(todo => todo.id));
            let newTodo = {id: maxId + 1, task: this.editForm.task, isCompleted: this.editForm.isCompleted};
//            console.log(newTodo);
            if (!this.serverStatus) {
                this.TODOs.push(newTodo);
                this.saveLocalStorage();
                this.pushToPending("add", newTodo);
                this.isModalVisible = false;
                return;
            }
            URI = "/api/todo";
            await fetch((URI), {
                method: "POST", headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTodo)
            }).then(() => {
                this.fetchJson();
                this.isModalVisible = false;
            });
        },
        saveTODO: async function () {
            console.log("Save");
            //Early Return if the data is not complete
            if (this.editForm.id === "" || this.editForm.task === "" || this.editForm.isCompleted === "") {
                return;
            }

            let newTODO = {id: this.editForm.id, task: this.editForm.task, isCompleted: this.editForm.isCompleted};
//            console.log(newTODO)
            this.resetEditForm();
            if (!this.serverStatus) {

                const index = this.TODOs.findIndex((todo) => todo.id === newTODO.id);
                if (index != -1) {
                    this.$set(this.TODOs, index, newTODO);
//                    console.log(this.TODOs[index])
                    this.saveLocalStorage();
                    this.pushToPending("edit", newTODO);
                }

                return;
            }

            try {
                URI = `/api/todo/${this.newTODO.id}`;
                await fetch(URI, {method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    }, body:
                            JSON.stringify(newTODO)
                }).then(response => {
                    if (response.ok) {
                        console.log('TODO Edited successfully')
                        this.fetchJson();
                        this.saveLocalStorage();
                    } else {
                        console.log('Failed to Edit TODO');
                    }
                });
            } catch (error) {
                throw error;
            }
        },
        editTODO: async function (TODO) {
            this.editForm.id = TODO.id;
            this.editForm.task = TODO.task;
            this.editForm.isCompleted = TODO.isCompleted;
        },
        deleteTODO: async function (TODO) {
            console.log("Delete");
            this.resetEditForm();
            if (!this.serverStatus) {
                this.deleteFromLocalStorage(TODO);
                this.pushToPending("delete", TODO)
                return;
            }
            URI = `/api/todo/${TODO.id}`;
            try {
                fetch(URI, {method: "DELETE", headers: {
                        'Content-Type': 'application/json'
                    }}).then(() => {
                    this.fetchJson();
                });
            } catch (e) {
                console.log("FAILED");
                throw e;
            }
            this.fetchJson();
            this.saveLocalStorage();
        },
        saveLocalStorage: function () {
            console.log("Saving Locally")
            localStorage.setItem('todos', JSON.stringify(this.TODOs));
        },
        deleteFromLocalStorage: function (TODO) {
            let localTODOsJSON = localStorage.getItem("todos");
            let todos = []
            if (localTODOsJSON) {
                todos = JSON.parse(localTODOsJSON)
            }
            const index = todos.findIndex((todo) => todo.id === TODO.id)
            if (index != -1) {
                todos.splice(index, 1)
            }
            localStorage.setItem('todos', JSON.stringify(todos));
            this.TODOs = JSON.parse(localStorage.getItem("todos"));
        },
        checkServerStatus: async function () {
            console.log("Checking Status...");
            URI = "/api/todo/check-status"
            await fetch(URI)
                    .then(response => response.json())
                    .then(data => {
                        console.info(data.message);
                        this.serverStatus = true;
                    }).catch((e) => {
                this.serverStatus = false;
                console.warn("LOST CONNECTION")
            });
        },
        pushToPending: function (action, todo) {
            //Store the changes to local storage, for syncing purposes
            const pendingChanges = JSON.parse(localStorage.getItem("pendingChanges")) || {add: [], edit: [], delete: []};
            switch (action) {
                case "add":
                    pendingChanges.add.push(todo);
                    break
                case "edit":
                    pendingChanges.edit.push(todo);
                    break
                case "delete":
                    pendingChanges.delete.push(todo);
                    break
                default:
                    console.error("CONDITION NOT MET")
            }

            if (pendingChanges) {
                localStorage.setItem("pendingChanges", JSON.stringify(pendingChanges));
            }
        },
        resetEditForm: function () {
            this.editForm.id = "";
            this.editForm.task = "";
            this.editForm.isCompleted = "";
        },
        syncAdd: async function (todo) {
            URI = "/api/todo";
            await fetch((URI), {
                method: "POST", headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todo)
            }).then(() => {
                this.isModalVisible = false;
            });
        },
        syncDelete: async function (todo) {
            URI = `/api/todo/${todo.id}`;
            try {
                fetch(URI, {method: "DELETE", headers: {
                        'Content-Type': 'application/json'
                    }});
            } catch (e) {
                console.log("FAILED");
                throw e;
            }
        },
        syncEdit: async function (todo) {
            try {
                URI = `/api/todo/${todo.id}`;
                await fetch(URI, {method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    }, body:
                            JSON.stringify(todo)
                }).then(response => {
                    if (response.ok) {
                        console.log('TODO Edited successfully')
                        this.saveLocalStorage();
                    } else {
                        console.log('Failed to Edit TODO');
                    }
                });
            } catch (error) {
                throw error;
            }
        },
        syncDatabase: async function () {
            //Show Modal and Prevent CRUD function
            this.isSyncing = true;
            //TODO push pending as SQL commands to database one by one
            const pendingChanges = JSON.parse(localStorage.getItem("pendingChanges"));
            if (!pendingChanges) {
                return;
            }

            for (const todo of pendingChanges.delete) {
                console.log("Syncing Delete")
                await this.syncDelete(todo);
            }

            for (const newTodo of pendingChanges.add) {
                console.log("Syncing Add")
                await this.syncAdd(newTodo);
            }

            for (const todo of pendingChanges.edit) {
                console.log("Syncing Edit")
                await this.syncEdit(todo);
            }



            localStorage.removeItem('pendingChanges');
            this.fetchJson();
            //Finished syncing
            this.isSyncing = false;
        },
        filterTODOs: function () {
//            console.log(this.filterStatus)
            switch (this.filterStatus) {
                case "all":
                    return this.TODOs;
                    break;
                case "completed":
                    return this.TODOs.filter((todo) => todo.isCompleted == true)
                    break;
                case "pending":
                    return this.TODOs.filter((todo) => todo.isCompleted == false)
                    break;
            }
        }

    },
    computed: {
        paginatedTodos: function () {
            const filteredTODOs = this.filterTODOs();
//            console.log(filteredTODOs)
            var start = (this.currentPage - 1) * this.todosPerPage;
            var end = start + this.todosPerPage;
            return filteredTODOs.slice(start, end);
        },
        totalPages: function () {
            const filteredTODOs = this.filterTODOs();
            return Math.ceil(filteredTODOs.length / this.todosPerPage);
        },
        pageNumbers: function () {
            var numbers = [];
            for (var i = 1; i <= this.totalPages; i++) {
                numbers.push(i);
            }
            return numbers;
        },
    },
});
