var signup = new Vue({
    el : "#signup",
    data :{
        name :'',
        email : '',
        password :''
    },
    methods : {
        signUp(){
            event.preventDefault()
            axios.post('http://localhost:3000/users/signUp',{
                name : this.name,
                email : this.email,
                password : this.password
            })
            .then(result=>{                
                window.location ="http://localhost:8080/index.html"
                localStorage.setItem('token',result.data.token)
            })
            .catch(err=>{
               console.log(err);
            })
        }
    }
    
})