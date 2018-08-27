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
                swal('sign in success')
                setInterval(function(){
                    window.location="http://localhost:8080/dashboard.html"
                }, 2000)
                
            })
            .catch(err=>{
                swal(err.message)
            })
        }
    }
})