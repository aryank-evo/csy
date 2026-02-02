"use client"
import React, { useRef } from 'react';
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { contactApi } from '@/utils/contactApi';

interface FormData {
   user_name: string;
   user_email: string;
   message: string;
}

const schema = yup
   .object({
      user_name: yup.string().required().label("Name"),
      user_email: yup.string().required().email().label("Email"),
      message: yup.string().required().label("Message"),
   })
   .required();

const ContactForm = () => {

   const { register, handleSubmit, reset, formState: { errors, isSubmitting }, } = useForm<FormData>({ resolver: yupResolver(schema), });

   const sendEmail = async (data: FormData) => {
      try {
         const result = await contactApi.send({
            name: data.user_name,
            email: data.user_email,
            message: data.message,
         });

         if (result.success) {
            toast.success(result.message);
            reset();
         } else {
            toast.error(result.message);
         }
      } catch (error) {
         toast.error(error instanceof Error ? error.message : 'Failed to send message');
      }
   };

   return (
      <form onSubmit={handleSubmit(sendEmail)}>
         <h3>Send Message</h3>
         <div className="messages"></div>
         <div className="row controls">
            <div className="col-12">
               <div className="input-group-meta form-group mb-30">
                  <label htmlFor="">Name*</label>
                  <input type="text" {...register("user_name")} name="user_name" placeholder="Your Name*" />
                  <p className="form_error">{errors.user_name?.message}</p>
               </div>
            </div>
            <div className="col-12">
               <div className="input-group-meta form-group mb-40">
                  <label htmlFor="">Email*</label>
                  <input type="email" {...register("user_email")} placeholder="Email Address*" name="user_email" />
                  <p className="form_error">{errors.user_email?.message}</p>
               </div>
            </div>
            <div className="col-12">
               <div className="input-group-meta form-group mb-35">
                  <textarea {...register("message")} placeholder="Your message*"></textarea>
                  <p className="form_error">{errors.message?.message}</p>
               </div>
            </div>
            <div className="col-12">
               <button type='submit' disabled={isSubmitting} className="btn-nine text-uppercase rounded-3 fw-normal w-100">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
               </button>
            </div>
         </div>
      </form>
   )
}

export default ContactForm
