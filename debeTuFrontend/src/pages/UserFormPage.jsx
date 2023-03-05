import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
const INITIAL_STATE = {
    name: 'pepe',
    email: '',
    password: ''
}
const UserForm = () => {
    const [user, setUser] = useState(INITIAL_STATE)

    const navigate = useNavigate();
    const [error, setError] = useState(null)

    function handleChange(e){
        setUser({...user, [e.target.name]: e.target.value})
    }

    async function handleSubmit(e){
        e.preventDefault()
        const response = await fetch(import.meta.env.VITE_BACKEND+'/user',
        {
          method:'POST',
          headers: {
            'Content-Type':'application/json',
            // 'Authorization': 'bearer xxxxxxx'
          },
          body: JSON.stringify( user )  
        })
        if(!response.ok){
            console.log('error en la peticion:')
        }else{
            //TODO mostrar un mensaje tipo toast
            navigate('/userList')
        }

    }

    useEffect( () => {
        //TODO no mostrar el error la primera vez
        if(!user.name) {
            setError('El nombre no puede estar vacio')
            return
        }
        if(user.name.length < 3){
            setError('La logitud del nombre tiene que ser mayor de 2')
            return
        }
        setError(null)
    }, [user.name])

    return <>
        <h1>Formulario registro</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" name="name" value={user.name} 
                onChange={handleChange}/>

            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" value={user.email} 
                onChange={handleChange}/>
        
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={user.password} 
                onChange={handleChange}/>

            <button type="submit">Registro</button>
        </form>
        { error && <p style={{color: 'red'}}>{error}</p>}
    </>
}

export default UserForm