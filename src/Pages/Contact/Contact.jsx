import { useRef } from "react";
import { Button, TextField } from "@mui/material";
import React from "react";
import "./contact.scss";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

function Contact() {
  const form = useRef();
  // Send Email to admin form contact from
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        process.env.REACT_APP_MY_EMAILJS_SERVICE_ID,
        "template_4gm4qw9",
        form.current,
        "PrknSKVZ6AzczCFri"
      )
      .then(
        (result) => {
          toast.success("Message Sent");
          e.target.reset();
        },
        (error) => {
          toast.error(error.text);
          e.target.reset();
        }
      );
  };

  return (
    <div className="conatct">
      <div className="contact-form">
        <form ref={form} onSubmit={sendEmail}>
          <h1>Contact Us</h1>
          <TextField
            id="outlined-basic"
            label="Enter your name"
            fullWidth={true}
            variant="outlined"
            name="user_name"
            required
          />
          <TextField
            id="outlined-basic"
            label="Enter your email"
            fullWidth={true}
            variant="outlined"
            name="user_email"
            required
          />
          <TextField
            id="outlined-basic"
            label="Enter your subject"
            fullWidth={true}
            variant="outlined"
            name="subject"
            required
          />

          <TextField
            id="outlined-multiline-static"
            label="Enter a message"
            multiline
            rows={4}
            fullWidth={true}
            name="message"
            required
          />
          <Button type="submit" variant="contained">
            {" "}
            Send
          </Button>
        </form>
      </div>
      <div className="contact-map">
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117057.1183653181!2d87.23013263935447!3d23.531245373546923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f7710b47a89171%3A0x429e1bdb57e009dd!2sDurgapur%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1679771402670!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

export default Contact;
