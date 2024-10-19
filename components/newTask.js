"use client"

import {   useState } from 'react';


import Modal from './modal.js';


export default function NewTask({ onDone , addTask , id , title , description , priority , updateTask}) {
    const [formData, setFormData] = useState({
        title: title || "",
        description: description || '',
        priority: priority || 'medium',  // Default value
           // Default value
      });
      
      const [errors, setErrors] = useState({});
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name , value)
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const validate = () => {
        const errors = {};
        if (!formData.title) {
          errors.title = 'Title is required';
        }
        if (!formData.description) {
          errors.description = 'Description is required';
        }
        return errors;
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }
    
        if(id){
          updateTask(id ,formData)
        }else{

          addTask(formData);
        }

        onDone();
         
        // Clear form after submission
        setFormData({
          title: '',
          description: '',
          priority: 'medium',
          
        });
        setErrors({});
      };
    
  
  

 


  return (
    <Modal title="New Challenge" onClose={onDone} >
      <form id="new-challenge" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? 'input-error' : ''}
        />
        {errors.title && <span className="red">{errors.title}</span>}
      </div>

      {/* Description Field */}
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={errors.description ? 'input-error' : ''}
        />
        {errors.description && <span className="red">{errors.description}</span>}
      </div>

      {/* Priority Field */}
      <div>
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

     
      

      <button className='button' type="submit">{!id ? "Submit" : "Edit"}</button>
      </form>
    </Modal>
  );
}


