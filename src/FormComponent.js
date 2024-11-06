import React, { useState } from 'react';
import axios from 'axios';
import './FormComponent.css';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    leadSubType: '',
    leadType: '',
    referredBy: '',
    leadSource: '',
    advisor: '',
    dob: '',
    consultationDate: '',
    anniversaryDate: '',
    officerPhone: '',
    fax: '',
    mobile: '',
    homePhone: '',
    primaryEmail: '',
    secondaryEmail: '',
    emailOptOut: false,
    addressLine1: '',
    addressLine2: '',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      leadSubType: '',
      leadType: '',
      referredBy: '',
      leadSource: '',
      advisor: '',
      dob: '',
      consultationDate: '',
      anniversaryDate: '',
      officerPhone: '',
      fax: '',
      mobile: '',
      homePhone: '',
      primaryEmail: '',
      secondaryEmail: '',
      emailOptOut: false,
      addressLine1: '',
      addressLine2: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/forms/save', formData);
      alert('Form saved successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error saving form:', error);
      alert('Failed to save form. Please try again.');
    }
  };
  

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-header">
        <button type="button" className="button cancel" onClick={handleCancel}>Cancel</button>
        <button type="submit" className="button save">Save</button>
      </div>

      <BasicInfo formData={formData} handleInputChange={handleInputChange} />
      <EssentialDates formData={formData} handleInputChange={handleInputChange} />
      <ContactInfo formData={formData} handleInputChange={handleInputChange} />
      <AddressInfo formData={formData} handleInputChange={handleInputChange} />
    </form>
  );
};

// Component for Basic Information
const BasicInfo = ({ formData, handleInputChange }) => (
  <div>
    <h3>Basic Information</h3>
    <div className="form-row">
      <label>Name: <input type="text" name="name" value={formData.name} onChange={handleInputChange} /></label>
      <label>Lead Sub Type: <input type="text" name="leadSubType" value={formData.leadSubType} onChange={handleInputChange} /></label>
    </div>
    <div className="form-row">
      <label>Lead Type: <input type="text" name="leadType" value={formData.leadType} onChange={handleInputChange} /></label>
      <label>Referred By: <input type="text" name="referredBy" value={formData.referredBy} onChange={handleInputChange} /></label>
    </div>
    <div className="form-row">
      <label>Lead Source: <input type="text" name="leadSource" value={formData.leadSource} onChange={handleInputChange} /></label>
      <label>Advisor: <input type="text" name="advisor" value={formData.advisor} onChange={handleInputChange} /></label>
    </div>
  </div>
);

// Component for Essential Dates
const EssentialDates = ({ formData, handleInputChange }) => (
  <div>
    <h3>Essential Dates</h3>
    <div className="form-row">
      <label>Date of Birth: <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} /></label>
      <label>Date of Consultation: <input type="date" name="consultationDate" value={formData.consultationDate} onChange={handleInputChange} /></label>
    </div>
    <div className="form-row">
      <label>Anniversary Date: <input type="date" name="anniversaryDate" value={formData.anniversaryDate} onChange={handleInputChange} /></label>
    </div>
  </div>
);

// Component for Contact Information
const ContactInfo = ({ formData, handleInputChange }) => (
  <div>
    <h3>Contact Information</h3>
    <div className="form-row">
      <label>Officer Phone: <input type="tel" name="officerPhone" value={formData.officerPhone} onChange={handleInputChange} /></label>
      <label>Fax: <input type="tel" name="fax" value={formData.fax} onChange={handleInputChange} /></label>
    </div>
    <div className="form-row">
      <label>Mobile: <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} /></label>
      <label>Home Phone: <input type="tel" name="homePhone" value={formData.homePhone} onChange={handleInputChange} /></label>
    </div>
    <div className="form-row">
      <label>Primary Email: <input type="email" name="primaryEmail" value={formData.primaryEmail} onChange={handleInputChange} /></label>
      <label>Email Opt Out: <input type="checkbox" name="emailOptOut" checked={formData.emailOptOut} onChange={handleInputChange} /></label>
    </div>
    <div className="form-row">
      <label>Secondary Email: <input type="email" name="secondaryEmail" value={formData.secondaryEmail} onChange={handleInputChange} /></label>
    </div>
  </div>
);

// Component for Address Information
const AddressInfo = ({ formData, handleInputChange }) => (
  <div>
    <h3>Address Information</h3>
    <div className="form-row">
      <label>Address Line 1: <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleInputChange} /></label>
    </div>
    <div className="form-row">
      <label>Address Line 2: <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleInputChange} /></label>
    </div>
  </div>
);

export default FormComponent;
