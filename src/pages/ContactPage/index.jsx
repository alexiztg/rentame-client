import React from 'react'
import emailjs from '@emailjs/browser';
import {useNavigate } from "react-router-dom";


const ContactPage = () => {
    const navigate = useNavigate();
    const sendEmail = (event) => {
        event.preventDefault();
    
        emailjs.sendForm('service_lgd0coi','template_fc8boey',event.target,'8VbVJ4bQ-3M7mlUgI')
        .then(response => navigate(0))
        .catch(error => console.log(error))
      }
    
      return (
        <div className='div-form'>
          <h1 className='title-form'>Contact Us</h1>
          <form className='form-mail' onSubmit={sendEmail}>
            <label>Name</label>
            <input type="text" name='name' />
            <hr />
    
            <label>Email</label>
            <input type="email" name='email' />
            <hr />
    
            <label>Message</label>
            <textarea name="message" id="" cols="30" rows="10"></textarea>
            <hr />
            <button>Send</button>
          </form>
        </div>
      )
}

export default ContactPage