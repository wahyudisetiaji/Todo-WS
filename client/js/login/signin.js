var signin = new Vue({
    el :'#signin',
    data :{
        email :'',
        password : ''
    },
    methods : {
        login(){
            event.preventDefault()
            axios.post('http://localhost:3000/users/signIn',{
                email : this.email,
                password : this.password
            })
            .then(dataUser=>{
                localStorage.setItem('token',dataUser.data.data.token)
                console.log(dataUser.data.data.token);
                
                window.location="http://localhost:8080/dashboard.html"
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
})