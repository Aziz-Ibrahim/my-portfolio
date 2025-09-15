// src/ContactForm.js
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import {
  Box,
  Text,
  Title,
  TextInput,
  Textarea,
  Button,
  useMantineTheme
} from '@mantine/core';

const ContactForm = () => {
  const theme = useMantineTheme();
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <Box
      component="form"
      ref={form}
      onSubmit={sendEmail}
      sx={{
        backgroundColor: theme.white,
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        boxShadow: theme.shadows.sm
      }}
    >
      <Title order={3} fw={600} c="dark" mb="md">Send me a message</Title>
      <Text c="dimmed" mb="xl">
        I'm excited to hear about your projects and ideas. Let's build something great together.
      </Text>
      <TextInput
        label="Name"
        name="user_name"
        placeholder="Your name"
        required
        mb="md"
      />
      <TextInput
        label="Email"
        type="email"
        name="user_email"
        placeholder="Your email"
        required
        mb="md"
      />
      <Textarea
        label="Message"
        name="message"
        placeholder="Your message"
        required
        minRows={5}
        mb="xl"
      />
      <Button type="submit" fullWidth>
        Send Message
      </Button>
    </Box>
  );
};

export default ContactForm;