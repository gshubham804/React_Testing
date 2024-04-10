/* eslint-disable no-undef */
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "../Login";

// Mock the console.log function
global.console = { log: jest.fn() }

describe("test cases for email field testing", () => {
  // Test that the email input field exists.
  test("test that the email input field exists", () => {
    const { getByLabelText } = render(<Login />);
    const inputField = getByLabelText("Email");
    expect(inputField).toBeInTheDocument();
  });

  // Test that the email input field is initially empty.
  test("test that the email input field is initially empty", () => {
    const { getByLabelText } = render(<Login />);
    const inputField = getByLabelText("Email");
    expect(inputField).toHaveValue("");
  });

  // Test that the email input field accepts valid email addresses.
  test("test that the email input field accepts valid email addresses", () => {
    const { getByLabelText } = render(<Login />);
    const inputField = getByLabelText("Email");

    // Simulate typing a valid email address
    fireEvent.change(inputField, { target: { value: "test@example.com" } });

    // Assert that the value of the email input field is the entered email address
    expect(inputField).toHaveValue("test@example.com");
  });

  // Test that the email input field displays an error message for invalid email addresses.
  test("Test that the email input field displays an error message for invalid email addresses.", () => {
    render(<Login />);
    const inputField = screen.getByLabelText("Email");

    // Enter an invalid email address (missing "@" symbol)
    fireEvent.change(inputField, { target: { value: "invalidemail.com" } });

    // Assert that the email input field value is invalid
    expect(inputField).toHaveValue("invalidemail.com");

    // Click the login button to trigger validation
    fireEvent.click(screen.getByText("Login"));

    // Assert that the error message is displayed
    const errorMessage = screen.getByText("Invalid email format");
    expect(errorMessage).toBeInTheDocument();
  });

  // Test that the email input field autofocuses when the page loads (if intended).
  test("Test that the email input field autofocuses when the page loads", () => {
    render(<Login />);

    // Check if the email input field is focused
    const emailInput = document.activeElement;
    const emailInputLabel = emailInput && emailInput.getAttribute("id");

    // Assuming the aria-label of the email input field is set to 'Email'
    expect(emailInputLabel).toBe("email");
  });
});

describe("test cases for password field testing", () => {
  // Test that the password input field exists.
  test("Test that the password input field exists", () => {
    const { getByLabelText } = render(<Login />);
    const passwordField = getByLabelText("Password");
    expect(passwordField).toBeInTheDocument();
  });

  // Test that the password input field is initially empty.
  test("Test that the password input field is initially empty", () => {
    const { getByLabelText } = render(<Login />);
    const passwordField = getByLabelText("Password");
    expect(passwordField).toHaveValue("");
  });

  // Test that the password input field obscures characters as expected (type="password").
  test("Test that the password input field obscures characters as expected", () => {
    const { getByLabelText } = render(<Login />);
    const passwordField = getByLabelText("Password");
    fireEvent.change(passwordField, { tagret: { value: "password123" } });
    // Assert that the password input field value is masked
    expect(passwordField).toHaveAttribute("type", "password");
  });

  // Test that the password input field meets minimum length requirements (if any).
  test("Test that the password input field meets minimum length requirements ", () => {
    const { getByLabelText } = render(<Login />);
    const passwordField = getByLabelText("Password");
    const minimumLength = 6;
    fireEvent.change(passwordField, { target: { value: "password123" } });
    expect(passwordField.value.length).toBeGreaterThanOrEqual(minimumLength);
  });

  // Test that the password input field displays an error message for invalid password length.
  test("Test that the password input field displays an error message for invalid password length", () => {
    render(<Login />);

     const inputField = screen.getByLabelText("Email");

    // Enter an invalid email address (missing "@" symbol)
    fireEvent.change(inputField, { target: { value: "test@example.com" } });

    // Assert that the email input field value is invalid
    expect(inputField).toHaveValue("test@example.com");
  
    const passwordField = screen.getByLabelText("Password");
    
    // Enter a password that doesn't meet the minimum length requirement
    fireEvent.change(passwordField, { target: { value: "pass" } });
    
    // Assert that the password input field value is set correctly
    expect(passwordField).toHaveValue("pass");
    
    // Click the login button to trigger validation
    fireEvent.click(screen.getByText("Login"));
    
    // Assert that the error message is displayed
    const errorMessage = screen.getByText("Password must be at least 6 characters long");
    expect(errorMessage).toBeInTheDocument();
  });
});

describe("test cases for login button",()=>{
// Confirm that it exists
test('Confirm that it exists',()=>{
const {getByText} = render (<Login />)
const loginButton = getByText("Login")
expect(loginButton).toBeInTheDocument();
})

// displays "Login" as its label
test('displays "Login" as its label', () => {
  const { getByText } = render(<Login />);
  const loginButton = getByText("Login");
  expect(loginButton).toHaveTextContent("Login");
});

test('performs the correct action when clicked', () => {
  const { getByText, getByLabelText } = render(<Login />);
  const loginButton = getByText("Login");
  const emailInput = getByLabelText("Email");
  const passwordInput = getByLabelText("Password");

  // Set values for email and password inputs
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });

  // Simulate click on the login button
  fireEvent.click(loginButton);

  // Assert that the correct action is performed 
  // (for example, you can check if a login function is called)
    // Assert that the console.log function is called with the correct arguments
    expect(global.console.log).toHaveBeenCalledWith(
      "Logging in with email:", "test@example.com", "and password:", "password123"
    );
});
})
