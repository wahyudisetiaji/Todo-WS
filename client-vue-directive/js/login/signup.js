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
                swal('sign up success')
                setInterval(function(){
                    window.location="http://localhost:8080/index.html"
                }, 2000)             
                window.location ="http://localhost:8080/index.html"  
            })
            .catch(err=>{
               swal(err.message)
            })
        }
    }
    
})