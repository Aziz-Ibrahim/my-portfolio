import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import {
    Box,
    Text,
    Title,
    TextInput,
    Textarea,
    Button,
    useMantineTheme,
    Stack
} from '@mantine/core';

const ContactForm = () => {
    const theme = useMantineTheme();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm({
        initialValues: {
            user_name: '',
            user_email: '',
            message: '',
        },
        validate: {
            user_name: (value) => (value.trim().length > 0 ? null : 'Name is required'),
            user_email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            message: (value) => (value.trim().length > 0 ? null : 'Message is required'),
        },
    });

    const sendEmail = async (values) => {
        setIsSubmitting(true);

        try {
            await emailjs.send(
                'service_beg1b9f',
                'template_qldaki8',
                values,
                'Yy3Vwy5Kwvgyi2Hvf'
            );

            notifications.show({
                title: 'Success!',
                message: 'Your message has been sent successfully.',
                color: 'green',
            });
            form.reset();
        } catch (error) {
            console.error('EmailJS Error:', error);
            notifications.show({
                title: 'Error',
                message: 'There was an error sending your message. Please try again.',
                color: 'red',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={form.onSubmit(sendEmail)}
            sx={{
                width: '100%',
                backgroundColor: theme.white,
                padding: theme.spacing.xl,
                borderRadius: theme.radius.md,
                boxShadow: theme.shadows.sm,
            }}
        >
            <Title order={3} fw={600} c="dark" mb="md">Send me a message</Title>
            <Text c="dimmed" mb="xl">
                I'm excited to hear about your projects and ideas. Let's build something great together.
            </Text>
            <Stack>
                <TextInput
                    label="Name"
                    name="user_name"
                    placeholder="Your name"
                    {...form.getInputProps('user_name')}
                />
                <TextInput
                    label="Email"
                    type="email"
                    name="user_email"
                    placeholder="Your email"
                    {...form.getInputProps('user_email')}
                />
                <Textarea
                    label="Message"
                    name="message"
                    placeholder="Your message"
                    {...form.getInputProps('message')}
                    minRows={5}
                />
                <Button type="submit" fullWidth loading={isSubmitting} mt="md">
                    Send Message
                </Button>
            </Stack>
        </Box>
    );
};

export default ContactForm;