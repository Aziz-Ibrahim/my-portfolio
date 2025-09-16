// src/App.js
import React, { useState, useEffect } from 'react';
import {
  Github, ExternalLink, Mail, Linkedin, ChevronDown, Menu, X, Download, Code, Server, Globe, Send
} from 'lucide-react';
import {
  Container,
  Box,
  Flex,
  Title,
  Button,
  Group,
  Stack,
  Text,
  Anchor,
  Paper,
  Badge,
  Grid,
  SimpleGrid,
  useMantineTheme,
  Burger
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { personalInfo, heroContent, aboutContent, projects, contactInfo } from './content';
import ContactForm from './ContactForm';
import SocialLink from './SocialLink'; // <--- Import the new component here

// A mapping object for Lucide icons to be used with Mantine components
const iconMap = {
  Code: Code,
  Github: Github,
  Linkedin: Linkedin,
  Mail: Mail,
  ChevronDown: ChevronDown,
  ExternalLink: ExternalLink,
  Server: Server,
  Globe: Globe,
  Download: Download,
  Menu: Menu,
  X: X,
  Send: Send
};

const Portfolio = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const theme = useMantineTheme();
    const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'about', 'projects', 'contact'];
            const scrollPosition = window.scrollY + 100;

            sections.forEach(section => {
                const element = document.getElementById(section);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const height = element.offsetHeight;
                    
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
                        setActiveSection(section);
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId).scrollIntoView({
            behavior: 'smooth'
        });
        setIsMenuOpen(false);
    };

    return (
        <Box>
            {/* Navigation */}
            <Paper
                shadow="sm"
                radius={0}
                withBorder={false}
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    backgroundColor: theme.colors.gray[0],
                }}
            >
                <Container size="xl" py="md">
                    <Flex justify="space-between" align="center">
                        <Title order={4}>Aziz Ibrahim's Portfolio</Title>
                        
                        {/* Conditionally render desktop navigation */}
                        {isDesktop ? (
                            <Group spacing="xl">
                                {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                                    <Button
                                        key={item}
                                        variant="subtle"
                                        onClick={() => scrollToSection(item.toLowerCase())}
                                        color={activeSection === item.toLowerCase() ? 'blue' : 'dark'}
                                    >
                                        {item}
                                    </Button>
                                ))}
                            </Group>
                        ) : (
                            // Conditionally render mobile menu button
                            <Burger
                                opened={isMenuOpen}
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                size="sm"
                            />
                        )}
                    </Flex>
                </Container>

                {/* Mobile Navigation */}
                {isMenuOpen && !isDesktop && (
                    <Box
                        sx={{
                            borderTop: `1px solid ${theme.colors.gray[2]}`,
                            boxShadow: theme.shadows.sm,
                            padding: theme.spacing.md,
                        }}
                    >
                        <Stack spacing="xs">
                            {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                                <Button
                                    key={item}
                                    variant={activeSection === item.toLowerCase() ? 'light' : 'subtle'}
                                    color={activeSection === item.toLowerCase() ? 'blue' : 'dark'}
                                    onClick={() => scrollToSection(item.toLowerCase())}
                                >
                                    {item}
                                </Button>
                            ))}
                        </Stack>
                    </Box>
                )}
            </Paper>

            {/* Hero Section */}
            <Box id="home" pt={120} pb={80} sx={{ background: theme.colors.blue[0] }}>
                <Container size="xl" ta="center">
                    <Box sx={{
                        width: 128,
                        height: 128,
                        margin: 'auto',
                        marginBottom: theme.spacing.xl,
                        background: `linear-gradient(45deg, ${theme.colors.blue[6]}, ${theme.colors.indigo[7]})`,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: theme.shadows.xl
                    }}>
                        {React.createElement(iconMap[heroContent.icon], { size: 64, color: 'white' })}
                    </Box>
                    <Title order={1} size="h1" fw={700} c="dark" mb="xs">{personalInfo.name}</Title>
                    <Title order={2} size="h3" fw={500} c="dimmed" mb="md">{personalInfo.title}</Title>
                    <Text fz="lg" c="dimmed" maw={600} mx="auto" mb="xl">{personalInfo.tagline}</Text>
                    <Flex gap="xl" justify="center" align="center" mb="xl">
                        {heroContent.socialLinks.map((link, index) => (
                            <SocialLink key={index} link={link} iconMap={iconMap} />
                        ))}
                    </Flex>
                    <Button
                        onClick={() => scrollToSection(heroContent.cta.link)}
                        size="lg"
                        color="blue"
                    >
                        <Group spacing="xs">
                            <Text>{heroContent.cta.text}</Text>
                            {React.createElement(iconMap[heroContent.cta.icon])}
                        </Group>
                    </Button>
                </Container>
            </Box>

            {/* About Section */}
            <Box id="about" py={80} sx={{ background: theme.white }}>
                <Container size="xl">
                    <Title order={2} size="h2" fw={700} ta="center" mb="xl">About Me</Title>
                    <SimpleGrid
                        cols={1} // Default for mobile
                        spacing="xl"
                        breakpoints={[
                            { minWidth: 'sm', cols: 2 }, // On screens at or above 'sm', use 2 columns.
                        ]}
                    >
                        <Box>
                            {aboutContent.aboutText.map((paragraph, index) => (
                                <Text key={index} fz="lg" c="dimmed" mb="md" sx={{ lineHeight: 1.6 }}>{paragraph}</Text>
                            ))}
                        </Box>
                        <Stack spacing="xl">
                            {Object.values(aboutContent.skills).map((skillSet, index) => (
                                <Box key={index}>
                                    <Title order={4} fw={600} c="dark" mb="sm" sx={{ display: 'flex', alignItems: 'center' }}>
                                        {React.createElement(iconMap[skillSet.icon], { size: 20 })}
                                        <Box component="span" ml="xs">{skillSet.title}</Box>
                                    </Title>
                                    <Group spacing="xs">
                                        {skillSet.list.map((skill) => (
                                            <Badge key={skill} size="md" radius="xl" color="blue" variant="light">{skill}</Badge>
                                        ))}
                                    </Group>
                                </Box>
                            ))}
                        </Stack>
                    </SimpleGrid>
                </Container>
            </Box>

            {/* Projects Section */}
            <Box id="projects" py={80} sx={{ background: theme.colors.gray[1] }}>
                <Container size="xl">
                    <Title order={2} size="h2" fw={700} ta="center" mb="xl">Featured Projects</Title>
                    <SimpleGrid
                        cols={1} // Default for mobile
                        spacing="xl"
                        breakpoints={[
                            { minWidth: 'sm', cols: 2, spacing: 'md' }, // On screens at or above 'sm', use 2 columns.
                            { minWidth: 'md', cols: 3, spacing: 'xl' }, // On screens at or above 'md', use 3 columns.
                        ]}
                    >
                        {projects.map((project) => (
                            <Paper key={project.id} p="md" shadow="md" radius="md" withBorder>
                                <Stack spacing="sm">
                                    <Title order={4} fw={700} c="dark">{project.title}</Title>
                                    <Text c="dimmed" fz="sm">{project.description}</Text>
                                    <Group spacing="xs">
                                        {project.technologies.map((tech) => (
                                            <Badge key={tech} size="sm" color="gray" variant="filled">{tech}</Badge>
                                        ))}
                                    </Group>
                                    <Group spacing="sm">
                                        <Anchor
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            c="blue"
                                            sx={{ display: 'flex', alignItems: 'center' }}
                                        >
                                            <ExternalLink size={16} />
                                            <Text ml="xs">Live Demo</Text>
                                        </Anchor>
                                        <Anchor
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            c="dimmed"
                                            sx={{ display: 'flex', alignItems: 'center' }}
                                        >
                                            <Github size={16} />
                                            <Text ml="xs">Code</Text>
                                        </Anchor>
                                    </Group>
                                </Stack>
                            </Paper>
                        ))}
                    </SimpleGrid>
                </Container>
            </Box>

            {/* Contact Section */}
            <Box id="contact" py={80} sx={{ background: theme.white }}>
                <Container size="xl">
                    <Title order={2} size="h2" fw={700} ta="center" mb="xl">Get In Touch</Title>
                    <Grid gutter="xl">
                        <Grid.Col sm={12} md={6}>
                            <Title order={3} fw={600} c="dark" mb="md">Let's Connect</Title>
                            <Text fz="lg" c="dimmed" mb="xl" sx={{ lineHeight: 1.6 }}>{contactInfo.intro}</Text>
                            <Stack spacing="md">
                                {contactInfo.links.map((link, index) => (
                                    <Button
                                        key={index}
                                        component="a"
                                        href={link.href === '/my-cv.pdf' ? '/my-cv.pdf' : link.href}
                                        target={link.text === 'Download My CV' ? '_self' : '_blank'}
                                        rel="noopener noreferrer"
                                        fullWidth
                                        variant={link.text === 'Email Me' ? 'filled' : link.text === 'LinkedIn' ? 'outline' : 'filled'}
                                        color={link.text === 'Email Me' ? 'blue' : link.text === 'LinkedIn' ? 'blue' : 'green'}
                                    >
                                        <Flex justify="center" align="center" gap="xs" wrap="nowrap">
                                            {React.createElement(iconMap[link.icon])}
                                            <Text>{link.text}</Text>
                                        </Flex>
                                    </Button>
                                ))}
                            </Stack>
                        </Grid.Col>
                        <Grid.Col sm={12} md={6}>
                            <ContactForm />
                        </Grid.Col>
                    </Grid>
                </Container>
            </Box>

            {/* Footer */}
            <Box sx={{ background: theme.colors.dark[8] }} py="xl">
                <Container size="xl" ta="center">
                    <Text c="dimmed">&copy; 2025 {personalInfo.name}. Built with React and Mantine.</Text>
                </Container>
            </Box>
        </Box>
    );
};

export default Portfolio;