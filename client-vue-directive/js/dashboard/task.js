if(!localStorage.token){
  window.location="http://localhost:8080/index.html"
}

var getTask = new Vue({
  el: "#task",
  data: {
    id: "",
    taskName: "",
    date: "",
    priority: "",
    status: "",
    data: [],
    task: [],
    quotes: []
  },
  methods: {
    formatDone(status) {
      if (status) {
        return "Done";
      } else {
        return "Not Done";
      }
    },
    clearTask() {
      this.task = [];
    },
    formatDate(date) {
      var monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];

      let day = date.slice(8, 10);
      let month = date.slice(6, 7);
      let year = date.slice(0, 4);

      if (month > 9) {
        month = `1${month}`;
      }

      return day + " " + monthNames[month - 1] + " " + year;
    },
    myTask() {
      let token = localStorage.token;
      axios({
        method: 'GET',
        url: `http://localhost:3000/task`,
        headers : {
          token
        }
      })
      .then(tasks => {
        this.data.push(tasks.data.tasks);
      })
      .catch(err => {
        swal(err.message)
      });
    },
    addTask() {
      let token = localStorage.token;
      let task = {
        taskName: this.taskName,
        dueDate: this.date,
        priority: this.priority
      };
      axios({
        method: 'POST',
        url: `http://localhost:3000/task`, 
        headers: {
          token
        },
        data: task
      })
        .then(result => {
          swal('task successfully created')
          setInterval(function() {
            window.location = "http://localhost:8080/dashboard.html"
          }, 2000)
        })
        .catch(err => {
          swal(err.message)
        });
    },
    getTask(data) {
      let token = localStorage.token;
      let id = data._id;
      axios({
        method: 'GET',
        url: `http://localhost:3000/task/task/${id}`,
        headers: {
          token
        }
      })
      .then(task => {
        this.id = task.data.task._id;
          this.taskName = task.data.task.taskName;
          this.priority = task.data.task.priority;
        this.status = task.data.task.status;
        this.date = task.data.task.dueDate.slice(0, 10);
      })
      .catch(err => {
        swal(err.message)
      });
    },
    updateTask() {
      let data = {
        taskName: this.taskName,
        dueDate: this.date,
        priority: this.priority,
        status: this.status
      };
      axios.put(`http://localhost:3000/task/${this.id}`, data)
      .then(task => {
        swal('task successfully updated')
        setInterval(function() {
          window.location = "http://localhost:8080/dashboard.html"
        }, 2000)
      })
      .catch(err => {
        swal(err.message)
      });
    },
    taskStatusDone(task) {
      console.log(task._id);

      axios
        .put(`http://localhost:3000/task/status/${task._id}`)
        .then(task => {
          window.location = "http://localhost:8080/dashboard.html";
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteTask(task) {
      let token = localStorage.token
      axios({
        method: 'DELETE',
        url: `http://localhost:3000/task/${task._id}`,
        headers: {
          token
        }
      })
      .then(result => {
        swal('task successfully deleted')
        setInterval(function() {
          window.location = "http://localhost:8080/dashboard.html"
        }, 2000)
      })
      .catch(err => {
        swal(err.message)
      });
    },
    taskPriority() {
      let token = localStorage.token;
      this.data = [];
      axios
        .get(`http://localhost:3000/task/priority/${token}`)
        .then(tasks => {
          this.data.push(tasks.data.tasks);
        })
        .catch(err => {
          console.log(err);
        });
    },
    taskDone() {
      let token = localStorage.token;
      this.data = [];
      axios
        .get(`http://localhost:3000/task/done/${token}`)
        .then(tasks => {
          this.data.push(tasks.data.tasks);
        })
        .catch(err => {
          console.log(err);
        });
    },
    logout() {
      localStorage.clear();
      window.location = "http://localhost:8080/index.html";
    },
    qoutesOfTheDay() {
      axios
        .get(`http://localhost:3000/qoutes`)
        .then(result => {
          this.quotes = result.data.quotes;
          
        })
        .catch(err => {
          swal(err.message)
        });
    }
  }
});
