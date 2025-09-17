import React, { useState, useEffect } from 'react';
import {
    Github, ExternalLink,
    Mail, Linkedin, ChevronDown,
    Menu, X, Download, Code,
    Server, Globe, Send
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
    Grid,
    Anchor,
    Paper,
    Badge,
    useMantineTheme,
    Burger
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';

import {
    personalInfo, heroContent, aboutContent, projects, contactInfo
} from './content';
import ContactForm from './ContactForm';
import SocialLink from './SocialLink';

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
    const mantineTheme = useMantineTheme(); // Renamed to avoid conflict
    const isDesktop = useMediaQuery(`(min-width: ${mantineTheme.breakpoints.sm})`);

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
                bg="mocha-mousse.7"
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 100,
                }}
            >
                <Container size="xl" py="md">
                    <Flex justify="space-between" align="center">
                        <Title order={4} c="white">Aziz Ibrahim's Portfolio</Title>

                        {/* Conditionally render desktop navigation */}
                        {isDesktop ? (
                            <Group spacing="xl">
                                {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                                    <Button
                                        key={item}
                                        variant="subtle"
                                        onClick={() => scrollToSection(item.toLowerCase())}
                                        color={activeSection === item.toLowerCase() ? 'cream-accent' : 'gray.4'}
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
                                color="white"
                            />
                        )}
                    </Flex>
                </Container>

                {/* Mobile Navigation */}
                {isMenuOpen && !isDesktop && (
                    <Box
                        sx={{
                            borderTop: `1px solid ${mantineTheme.colors.gray[2]}`,
                            boxShadow: mantineTheme.shadows.sm,
                            padding: mantineTheme.spacing.md,
                            backgroundColor: mantineTheme.colors['mocha-mousse'][9],
                        }}
                    >
                        <Stack spacing="xs">
                            {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                                <Button
                                    key={item}
                                    variant={activeSection === item.toLowerCase() ? 'light' : 'subtle'}
                                    color={activeSection === item.toLowerCase() ? 'cream-accent' : 'gray.4'}
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
            <Box id="home" pt={120} pb={80} sx={{ background: mantineTheme.colors['mocha-mousse'][0] }}>
                <Container size="xl" ta="center">
                    <Box sx={{
                        width: 128,
                        height: 128,
                        margin: 'auto',
                        marginBottom: mantineTheme.spacing.xl,
                        background: `linear-gradient(45deg, ${mantineTheme.colors['mocha-mousse'][6]}, ${mantineTheme.colors['mocha-mousse'][9]})`,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: mantineTheme.shadows.xl
                    }}>
                        {React.createElement(iconMap[heroContent.icon], { size: 64, color: 'white' })}
                    </Box>
                    <Title order={1} size="h1" fw={700} c="dark" mb="xs">{personalInfo.name}</Title>
                    <Title order={2} size="h3" fw={500} c="dimmed" mb="md">{personalInfo.title}</Title>
                    <Text fz="lg" c="dimmed" maw={600} mx="auto" mb="xl">{personalInfo.tagline}</Text>
                    <Flex gap="xl" justify="center" align="center" mb="xl">
                        {heroContent.socialLinks.map((link, index) => (
                            <SocialLink key={index} link={link} iconMap={iconMap} color="mocha-mousse" />
                        ))}
                    </Flex>
                    <Button
                        onClick={() => scrollToSection(heroContent.cta.link)}
                        size="lg"
                        color="mocha-mousse"
                    >
                        <Group spacing="xs">
                            <Text>{heroContent.cta.text}</Text>
                            {React.createElement(iconMap[heroContent.cta.icon])}
                        </Group>
                    </Button>
                </Container>
            </Box>

            {/* About Section */}
            <Box id="about" py={80} sx={{ background: mantineTheme.colors['cream-accent'][0] }}>
                <Container size="xl">
                    <Title order={2} size="h2" fw={700} ta="center" c="dark" mb="xl">About Me</Title>
                    <Grid>
                        <Grid.Col sm={12} md={6}>
                            <Box>
                                {aboutContent.aboutText.map((paragraph, index) => (
                                    <Text key={index} fz="lg" c="dimmed" mb="md" sx={{ lineHeight: 1.6 }}>{paragraph}</Text>
                                ))}
                            </Box>
                        </Grid.Col>
                        <Grid.Col sm={12} md={6}>
                            <Stack spacing="xl">
                                {Object.values(aboutContent.skills).map((skillSet, index) => (
                                    <Box key={index}>
                                        <Title order={4} fw={600} c="dark" mb="sm" sx={{ display: 'flex', alignItems: 'center' }}>
                                            {React.createElement(iconMap[skillSet.icon], { size: 20 })}
                                            <Box component="span" ml="xs">{skillSet.title}</Box>
                                        </Title>
                                        <Group spacing="xs">
                                            {skillSet.list.map((skill) => (
                                                <Badge key={skill} size="md" radius="xl" color="mocha-mousse" variant="light">{skill}</Badge>
                                            ))}
                                        </Group>
                                    </Box>
                                ))}
                            </Stack>
                        </Grid.Col>
                    </Grid>
                </Container>
            </Box>

            {/* Projects Section */}
            <Box id="projects" py={80} sx={{ background: mantineTheme.colors['mocha-mousse'][1] }}>
                <Container size="xl">
                    <Title order={2} size="h2" fw={700} ta="center" c="dark" mb="xl">Featured Projects</Title>
                    <Carousel
                        withIndicators
                        withControls
                        height={400}
                        slideSize={{ base: '100%', sm: '50%', md: '33.333%' }}
                        slideGap="xl"
                        loop
                        styles={{
                            controls: {
                                top: '90%' // Adjust the vertical position of the arrows
                            },
                            indicator: {
                                bottom: 'unset' // Move indicators
                            }
                        }}
                    >
                        {projects.map((project) => (
                            <Carousel.Slide key={project.id}>
                                <Paper p="md" shadow="md" radius="md" withBorder h="100%">
                                    <Stack spacing="sm" h="100%">
                                        <Title order={4} fw={700} c="dark">{project.title}</Title>
                                        <Text c="dimmed" fz="sm" sx={{ flexGrow: 1 }}>{project.description}</Text>
                                        <Group spacing="xs">
                                            {project.technologies.map((tech) => (
                                                <Badge key={tech} size="sm" color="mocha-mousse" variant="filled">{tech}</Badge>
                                            ))}
                                        </Group>
                                        <Group spacing="sm">
                                            <Anchor
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                c="mocha-mousse"
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
                            </Carousel.Slide>
                        ))}
                    </Carousel>
                </Container>
            </Box>

            {/* Contact Section */}
            <Box id="contact" py={80} sx={{ background: mantineTheme.colors['cream-accent'][1] }}>
                <Container size="lg">
                    <Grid>
                        {/* Contact Info Column */}
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Title order={3} fw={600} c="dark" mb="md">Let's Connect</Title>
                            <Text fz="lg" c="dimmed" mb="xl" sx={{ lineHeight: 1.6 }}>{contactInfo.intro}</Text>
                            <Stack spacing="md">
                                {contactInfo.links.map((link, index) => (
                                    <Button
                                        key={index}
                                        component="a"
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variant={link.text.includes('Email') ? 'filled' : 'outline'}
                                        color="mocha-mousse"
                                    >
                                        <Flex justify="center" align="center" gap="xs" wrap="nowrap">
                                            {React.createElement(iconMap[link.icon])}
                                            <Text>{link.text}</Text>
                                        </Flex>
                                    </Button>
                                ))}
                            </Stack>
                        </Grid.Col>

                        {/* Contact Form Column */}
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <ContactForm />
                        </Grid.Col>
                    </Grid>
                </Container>
            </Box>

            {/* Footer */}
            <Box sx={{ background: mantineTheme.colors['mocha-mousse'][9] }} py="xl">
                <Container size="xl" ta="center">
                    <Text c="white">&copy; 2025 {personalInfo.name}. Built with React and Mantine.</Text>
                </Container>
            </Box>
        </Box>
    );
};

export default Portfolio;