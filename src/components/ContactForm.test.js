import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

const errReq = "1234";
const errId = "error"

test('renders without errors', ()=>{
    render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>);
    const header = screen.queryByText(/contact form/i);
    expect(header).toBeInTheDocument();
});
 
test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);
    const nameInput = screen.getByLabelText(/first name/i);
    userEvent.type(nameInput, errReq)
    await waitFor(() => {
        const error1 = screen.getByTestId(errId);
        expect(error1).toBeInTheDocument();
    });

});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);
    const button = screen.getByRole("button");
    userEvent.click(button);
    await waitFor(() => {
        const error2 = screen.getAllByTestId(errId);
        expect(error2).toHaveLength(3)
    });

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);
    const  first = screen.getByLabelText(/first name/i);
    const  last = screen.getByLabelText(/last name/i);
    const button = screen.getByRole("button");
    userEvent.type(first, "12345");
    userEvent.type(last, "12345");
    userEvent.click(button);
    await waitFor(() => {
        const error3 = screen.getByTestId(errId);
        expect(error3).toBeInTheDocument();
    });
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);
    const email = screen.getByLabelText(/email/i);
    userEvent.type(email, errReq)
    await waitFor(() => {
        const error4 = screen.getByTestId(errId);
        expect(error4).toBeInTheDocument();
    });
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);
    const  first = screen.getByLabelText(/first name/i);
    const  email = screen.getByLabelText(/email/i);
    const button = screen.getByRole("button");
    userEvent.type(first, "12345");
    userEvent.type(email, "12345@gmail.com");
    userEvent.click(button);
    await waitFor(() => {
        const error5 = screen.getByTestId(errId);
        expect(error5).toBeInTheDocument();
    });
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);
    const  first = screen.getByLabelText(/first name/i);
    const  email = screen.getByLabelText(/email/i);
    const  last = screen.getByLabelText(/last name/i);
    userEvent.type(first, "12345");
    userEvent.type(email, "12345@gmail.com");
    userEvent.type(last, "12345");
    await waitFor(() => {
        const fail = screen.queryByText(/you submitted:/i);
        expect(fail).not.toBeInTheDocument();
        
    });  
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);
    const  first = screen.getByLabelText(/first name/i);
    const  email = screen.getByLabelText(/email/i);
    const  last = screen.getByLabelText(/last name/i);
    const button = screen.getByRole("button");
    userEvent.type(first, "12345");
    userEvent.type(email, "12345@gmail.com");
    userEvent.type(last, "12345");
    userEvent.click(button);
    await waitFor(() => {
        const sucsses = screen.getByText(/you submitted:/i);
        expect(sucsses).toBeInTheDocument();
        console.log(sucsses)
    });
});