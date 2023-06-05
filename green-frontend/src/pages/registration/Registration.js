import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import './registration.css';

function Cust_reg() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        address: '',
        gender: '',
        birthday: '',
        nicNumber: '',
        password: '',
        reenterPassword: ''
    });

    const [formErrors, setFormErrors] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        nicNumber: '',
        password : '',
        reenterPassword: ''
    });

    const validateField = (name, value) => {
        let error = '';

        // Check if the field is empty
        if (!value) {
            error = 'This field is required.';
        } else {
            // Perform field-specific validation
            switch (name) {
                case 'email':
                    // Validate email format
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        error = 'Invalid email format.';
                    }
                    break;
                case 'phoneNumber':
                    // Validate phone number (Sri Lankan format: XXXXXXXXXX)
                    const phoneRegex = /^[0-9]{10}$/;
                    if (!phoneRegex.test(value)) {
                        error = 'Invalid phone number format.';
                    }
                    break;
                case 'nicNumber':
                    // Validate NIC number (Sri Lankan format: XXXXXXXXXXV)
                    const nicRegex = /^[0-9]{9}[Vv]$/;
                    if (!nicRegex.test(value)) {
                        error = 'Invalid NIC number format.';
                    }
                    break;
                case 'reenterPassword':
                    if(formData.password == formData.reenterPassword){
                        error = 'Password mismatch.';
                    }
                default:
                    break;
            }
        }

        setFormErrors((prevState) => ({
            ...prevState,
            [name]: error
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));

        // Validate the current field
        validateField(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform overall form validation
        const isValid = Object.values(formErrors).every((error) => !error);

        let error = '';
        if (isValid) {
            // Perform form submission or further processing here
            console.log('Form is valid. Submitting...');
        } else {
            console.log('Form contains errors. Please fix them.');
            error = 'Form contains errors. Please fix them.';
        }
        const { name, value } = e.target;
        setFormErrors((prevState) => ({
            ...prevState,
            [name]: error
        }));
    };

    return (
        <div className="form-container">
            <h2 className="form-heading">Registration Form</h2>

            <form onSubmit={handleSubmit}>
                <Row>
                    <Col xs={12} lg={6}>
                        <label>
                            First Name:
                            <input
                                placeholder='Enter First Name'
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            {formErrors.firstName && <span className="error">{formErrors.firstName}</span>}
                        </label>
                    </Col>

                    <Col xs={12} lg={6}>
                        <label>
                            Last Name:
                            <input
                            placeholder='Enter Last Name'
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            {formErrors.lastName && <span className="error">{formErrors.lastName}</span>}
                        </label>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} lg={12}>
                        <label>
                            Phone Number:
                            <input
                            placeholder='+94XX XXX XXXX'
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
                            {formErrors.phoneNumber && <span className="error">{formErrors.phoneNumber}</span>}
                        </label>
                    </Col>

                    <Col xs={12} lg={12}>
                        <label>
                            E-mail:
                            <input
                            placeholder='example@address.xyz'
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {formErrors.email && <span className="error">{formErrors.email}</span>}
                        </label>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} lg={12}>
                        <label>
                            Address:
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                            {formErrors.address && <span className="error">{formErrors.address}</span>}
                        </label>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} lg={6}>
                        <label>
                            Gender:
                            <br />
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={formData.gender === 'male'}
                                    onChange={handleChange}
                                />
                                Male
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={formData.gender === 'female'}
                                    onChange={handleChange}
                                />
                                Female
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="other"
                                    checked={formData.gender === 'other'}
                                    onChange={handleChange}
                                />
                                Other
                            </label>
                            {formErrors.gender && <span className="error">{formErrors.gender}</span>}
                        </label>
                    </Col>

                    <Col xs={12} lg={6}>
                        <label>
                            Birthday:
                            <br></br>
                            <input
                                type="date"
                                name="birthday"
                                value={formData.birthday}
                                onChange={handleChange}
                            />
                            {formErrors.birthday && <span className="error">{formErrors.birthday}</span>}
                        </label>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} lg={6}>
                        <label>
                            NIC Number:
                            <input
                            placeholder='National Identity Card Number'
                                type="text"
                                name="nicNumber"
                                value={formData.nicNumber}
                                onChange={handleChange}
                            />
                            {formErrors.nicNumber && <span className="error">{formErrors.nicNumber}</span>}
                        </label>
                    </Col>
                </Row>

                <div>

                    <Row>
                        <Col id='pword' xs={12} lg={6}>
                            <label>
                                Password:
                                <br></br>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                {formErrors.password && <span className="error">{formErrors.password}</span>}
                            </label>
                        </Col>
                        <Col id='pword' xs={12} lg={6}>

                            <label>
                                Re-enter Password:
                                <br></br>
                                <input
                                    type="password"
                                    name="reenterPassword"
                                    value={formData.reenterPassword}
                                    onChange={handleChange}
                                />
                                {formErrors.reenterPassword && (
                                    <span className="error">{formErrors.reenterPassword}</span>
                                )}
                            </label>
                        </Col>
                    </Row>

                </div>


                <Button onClick={handleSubmit} style={{marginTop:'10px'}} type="submit">Submit</Button>
                <label>
                {formErrors.reenterPassword && (
                                    <span className="error">{formErrors.reenterPassword}</span>
                                )}
                </label>
                
            </form>
        </div>
    );
}

export default Cust_reg;