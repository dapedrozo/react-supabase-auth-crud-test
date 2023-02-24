import React, { useState, useEffect } from "react";
import { supabase } from "../supabase/client";
import {useNavigate} from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await supabase.auth.signIn({
        email: email,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (supabase.auth.user()) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="row pt-4">
      <div className="col-md-4 offset-md-4">
      <form onSubmit={handleSubmit} className="card card-body">
        <input
          type="email"
          name="email"
          placeholder="ingresa tu correo electronico"
          onChange={(e) => setEmail(e.target.value)}
          className="form-control mb-2"
        />
        <button className="btn btn-primary">Enviar</button>
      </form>
      </div>
    </div>
  );
}

export default Login;
